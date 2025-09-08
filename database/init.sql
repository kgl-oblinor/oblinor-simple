-- Initialize Oblinor Simple Database

-- Table 1: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL CHECK (role IN ('USER', 'ADMIN')),
    level INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_level CHECK (
        (role = 'USER' AND level IN (1, 2, 3)) OR 
        (role = 'ADMIN' AND level IN (1, 2))
    )
);

-- Table 2: shareholders
CREATE TABLE shareholders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    shares_owned INTEGER NOT NULL DEFAULT 0 CHECK (shares_owned >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 3: emissions
CREATE TABLE emissions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    presentation_material TEXT,
    shares_before INTEGER NOT NULL CHECK (shares_before >= 0),
    new_shares_offered INTEGER NOT NULL CHECK (new_shares_offered > 0),
    shares_after INTEGER GENERATED ALWAYS AS (shares_before + new_shares_offered) STORED,
    price_per_share DECIMAL(10,2) NOT NULL CHECK (price_per_share > 0),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL CHECK (end_date >= start_date),
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'ACTIVE', 'COMPLETED')),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 4: emission_subscriptions
CREATE TABLE emission_subscriptions (
    id SERIAL PRIMARY KEY,
    emission_id INTEGER REFERENCES emissions(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    shares_requested INTEGER NOT NULL CHECK (shares_requested > 0),
    shares_allocated INTEGER DEFAULT 0 CHECK (shares_allocated >= 0),
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    approved_by INTEGER REFERENCES users(id),
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(emission_id, user_id)
);

-- Trigger to auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shareholders_updated_at BEFORE UPDATE ON shareholders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_emissions_updated_at BEFORE UPDATE ON emissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-update shares_owned when subscription is approved
CREATE OR REPLACE FUNCTION update_shareholder_shares()
RETURNS TRIGGER AS $$
BEGIN
    -- Only proceed if status changed from non-APPROVED to APPROVED
    IF (OLD.status != 'APPROVED' AND NEW.status = 'APPROVED') THEN
        -- Update the shareholder's shares_owned
        UPDATE shareholders 
        SET shares_owned = shares_owned + NEW.shares_allocated
        WHERE user_id = NEW.user_id;
        
        -- Set approved_at timestamp
        NEW.approved_at = CURRENT_TIMESTAMP;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_shares_on_approval 
    BEFORE UPDATE ON emission_subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_shareholder_shares();

-- SEED DATA

-- Admin user (password: Admin123!)
INSERT INTO users (email, password_hash, name, role, level) VALUES 
('admin@oblinor.no', '$2b$10$9As/EbEP8RNw3f6zvgVUue8zZ3WVff905gD6nhJ0WIKGTA/vIJYvS', 'Admin User', 'ADMIN', 2);

-- 30 regular users (all level 1, password: Pass123!)
INSERT INTO users (email, password_hash, name, role, level) VALUES 
('user1@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User One', 'USER', 1),
('user2@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Two', 'USER', 1),
('user3@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Three', 'USER', 1),
('user4@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Four', 'USER', 1),
('user5@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Five', 'USER', 1),
('user6@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Six', 'USER', 1),
('user7@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Seven', 'USER', 1),
('user8@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Eight', 'USER', 1),
('user9@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Nine', 'USER', 1),
('user10@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Ten', 'USER', 1),
('user11@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Eleven', 'USER', 1),
('user12@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Twelve', 'USER', 1),
('user13@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Thirteen', 'USER', 1),
('user14@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Fourteen', 'USER', 1),
('user15@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Fifteen', 'USER', 1),
('user16@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Sixteen', 'USER', 1),
('user17@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Seventeen', 'USER', 1),
('user18@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Eighteen', 'USER', 1),
('user19@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Nineteen', 'USER', 1),
('user20@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Twenty', 'USER', 1),
('user21@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User TwentyOne', 'USER', 1),
('user22@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User TwentyTwo', 'USER', 1),
('user23@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User TwentyThree', 'USER', 1),
('user24@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User TwentyFour', 'USER', 1),
('user25@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User TwentyFive', 'USER', 1),
('user26@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User TwentySix', 'USER', 1),
('user27@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User TwentySeven', 'USER', 1),
('user28@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User TwentyEight', 'USER', 1),
('user29@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User TwentyNine', 'USER', 1),
('user30@example.com', '$2b$10$2eu4cSR0cxNooe7n6Ovuhej29y5KvcaLMre1Q1qDnwIvQvA8f/fkW', 'User Thirty', 'USER', 1);

-- 30 shareholders corresponding to the users
INSERT INTO shareholders (user_id, name, email, shares_owned) VALUES 
(2, 'User One', 'user1@example.com', 1000),
(3, 'User Two', 'user2@example.com', 850),
(4, 'User Three', 'user3@example.com', 1200),
(5, 'User Four', 'user4@example.com', 950),
(6, 'User Five', 'user5@example.com', 750),
(7, 'User Six', 'user6@example.com', 1100),
(8, 'User Seven', 'user7@example.com', 800),
(9, 'User Eight', 'user8@example.com', 1300),
(10, 'User Nine', 'user9@example.com', 900),
(11, 'User Ten', 'user10@example.com', 1050),
(12, 'User Eleven', 'user11@example.com', 750),
(13, 'User Twelve', 'user12@example.com', 1250),
(14, 'User Thirteen', 'user13@example.com', 600),
(15, 'User Fourteen', 'user14@example.com', 1400),
(16, 'User Fifteen', 'user15@example.com', 500),
(17, 'User Sixteen', 'user16@example.com', 1150),
(18, 'User Seventeen', 'user17@example.com', 700),
(19, 'User Eighteen', 'user18@example.com', 1350),
(20, 'User Nineteen', 'user19@example.com', 550),
(21, 'User Twenty', 'user20@example.com', 1450),
(22, 'User TwentyOne', 'user21@example.com', 650),
(23, 'User TwentyTwo', 'user22@example.com', 1000),
(24, 'User TwentyThree', 'user23@example.com', 850),
(25, 'User TwentyFour', 'user24@example.com', 1200),
(26, 'User TwentyFive', 'user25@example.com', 950),
(27, 'User TwentySix', 'user26@example.com', 750),
(28, 'User TwentySeven', 'user27@example.com', 1100),
(29, 'User TwentyEight', 'user28@example.com', 800),
(30, 'User TwentyNine', 'user29@example.com', 1300),
(31, 'User Thirty', 'user30@example.com', 900);

-- Sample emission
INSERT INTO emissions (title, description, presentation_material, shares_before, new_shares_offered, price_per_share, start_date, end_date, status, created_by) VALUES 
('Series A Funding Round', 'Raising capital for expansion into new markets', 'https://example.com/presentation.pdf', 50000, 10000, 25.50, '2025-01-15', '2025-02-15', 'ACTIVE', 1);

COMMIT;