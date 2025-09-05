-- Clean up and create shareholder users

BEGIN TRANSACTION;

-- 1. Delete all non-admin users (keep only admin@oblinor.no)
DELETE FROM users WHERE role = 'USER';

-- 2. Reset user ID sequence
ALTER SEQUENCE users_id_seq RESTART WITH 2;

-- 3. Keep test admin and create test users
INSERT INTO users (email, password_hash, name, role, level) VALUES
-- Test users with different levels (password: Pass123!)
('user2@oblinor.no', '$2b$10$YcbJP3FqmCCmOFZGxPa7TuI.l/yvCzmDWZl7Jy0r7bv7Wnq.LiL1u', 'Test User Level 2', 'USER', 2),
('user3@oblinor.no', '$2b$10$YcbJP3FqmCCmOFZGxPa7TuI.l/yvCzmDWZl7Jy0r7bv7Wnq.LiL1u', 'Test User Level 3', 'USER', 3);

-- 4. Create user accounts for all shareholders (level 1, password: Oblinor2025!)
-- Using a secure default password hash for all shareholders
INSERT INTO users (email, password_hash, name, role, level) 
SELECT 
    email,
    '$2b$10$ZhQX5wB3FVmXqZR9H.eFMu8wT3DcAh4hy9ZN2TnBpFYCTPxIQh2Ay', -- Password: Oblinor2025!
    name,
    'USER',
    1
FROM shareholders
ON CONFLICT (email) DO NOTHING;  -- Skip if email already exists

-- 5. Link shareholders to their user accounts
UPDATE shareholders s
SET user_id = u.id
FROM users u
WHERE s.email = u.email
AND s.user_id IS NULL;

-- 6. Verify the results
SELECT 'Total Users:' as metric, COUNT(*) as count FROM users
UNION ALL
SELECT 'Admin Users:', COUNT(*) FROM users WHERE role = 'ADMIN'
UNION ALL
SELECT 'Test Users (Level 2-3):', COUNT(*) FROM users WHERE role = 'USER' AND level > 1
UNION ALL
SELECT 'Shareholder Users (Level 1):', COUNT(*) FROM users WHERE role = 'USER' AND level = 1
UNION ALL
SELECT 'Shareholders with user accounts:', COUNT(*) FROM shareholders WHERE user_id IS NOT NULL
UNION ALL
SELECT 'Shareholders without user accounts:', COUNT(*) FROM shareholders WHERE user_id IS NULL;

COMMIT;