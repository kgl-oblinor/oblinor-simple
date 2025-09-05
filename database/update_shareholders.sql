-- Update Oblinor Simple with real shareholder data
-- Date: 2025-09-05

BEGIN;

-- Step 1: Delete existing test shareholders and users (keep admin)
DELETE FROM emission_subscriptions WHERE user_id IN (SELECT id FROM users WHERE email LIKE 'user%@example.com');
DELETE FROM shareholders WHERE email LIKE 'user%@example.com';
DELETE FROM users WHERE email LIKE 'user%@example.com';

-- Step 2: Create test users with different levels
-- Generate password hash for Pass123!: $2b$10$JyuHyIiLTMOlBnDY3JDBbu06YKHr5uxqaNuT4ss6VTaoEdLcQG1p6

-- Admin Level 1
INSERT INTO users (email, password_hash, name, role, level) VALUES
('admin1@oblinor.no', '$2b$10$B0o7balsAd7fUZ6NlAaNrOpiWOEyspLNcdta94WoMjSO4tgSvvP5W', 'Admin Level 1', 'ADMIN', 1);

-- User Level 2 (can see shareholders)
INSERT INTO users (email, password_hash, name, role, level) VALUES
('user2@oblinor.no', '$2b$10$JyuHyIiLTMOlBnDY3JDBbu06YKHr5uxqaNuT4ss6VTaoEdLcQG1p6', 'Test User Level 2', 'USER', 2);

-- User Level 3 (can subscribe to emissions)
INSERT INTO users (email, password_hash, name, role, level) VALUES
('user3@oblinor.no', '$2b$10$JyuHyIiLTMOlBnDY3JDBbu06YKHr5uxqaNuT4ss6VTaoEdLcQG1p6', 'Test User Level 3', 'USER', 3);

-- Step 3: Insert real shareholders (30 total)
INSERT INTO shareholders (name, email, shares_owned) VALUES
('Kristian Gjerde Løkken', 'kristianlokken@me.com', 90000),
('Cream Holding AS', 'kristianlokken@icloud.com', 11676),
('Hewa Mohammed Rasull', 'hewamohammed522@gmail.com', 10000),
('Thom & Co AS', 'ronnthom@online.no', 2500),
('Karl Steinar Nord', 'steinar@eptec.no', 2000),
('Funis AS', 'norasrm@gmail.com', 1000),
('Anders Morten Brosveet', 'anders@brosveet.com', 1000),
('Driven By Analytics AS', 'freek@drivenbyanalytics.no', 1000),
('Rajo AS', 'oddvar.bergsholm@lyse.net', 1000),
('North Sea Group AS', 'k-oddva@online.no', 1000),
('Vest Invest AS', 'erik@vestinvest.no', 667),
('Nils Steinar Dyvik Melbø', 'ns-planter@online.no', 533),
('Sanitek AS', 'post@sanitek.no', 500),
('Aleksander Sætre Holding AS', 'aleksander.saetre@gmail.com', 400),
('Concorde Invest AS', 'berheim@gmail.com', 333),
('Johannes Skjæveland', 'johannes@skjaeveland.no', 333),
('Inge Mandt Utbøen', 'inge@utboen.no', 333),
('Arne Hagen', 'arne@ito.no', 333),
('Cett AS', 'tbp@abpeiendom.no', 333),
('RM Consultants AS', 'rolfml@lyse.net', 333),
('Trifolium AS', 'erling.overland@trifolium.no', 333),
('Frogner Regnskapskontor AS', 'post@frogner-regnskap.no', 333),
('Trygve Kierulf', 'trygve@kierulf.com', 300),
('Erik Mannseth', 'erik.mannseth@gmail.com', 200),
('Isabelle Kerspern Graasvoll', 'isabelle.graasvoll@storebrand.no', 200),
('Case Aces AS', 'claushaagensen@hotmail.com', 200),
('Hostad Consulting AS', 'stian@hostad-consulting.no', 200),
('Anders Relling', 'anders.relling@gmail.com', 200),
('Vext AS', 'john@vext24.no', 200),
('Stian Alexander Petersen', 'stian@maldives.f9.co.uk', 200);

-- Step 4: Link test users to small shareholders (for testing)
-- Get IDs of the last two shareholders (200 shares each)
UPDATE shareholders SET user_id = (SELECT id FROM users WHERE email = 'user2@oblinor.no') 
WHERE email = 'john@vext24.no';

UPDATE shareholders SET user_id = (SELECT id FROM users WHERE email = 'user3@oblinor.no') 
WHERE email = 'stian@maldives.f9.co.uk';

-- Step 5: Verify totals
-- Expected: 127,666 total shares
-- Expected: 30 shareholders
-- Expected: 4 users (admin, admin1, user2, user3)

COMMIT;

-- Verification queries
SELECT 'Total shares:' as info, SUM(shares_owned) as value FROM shareholders
UNION ALL
SELECT 'Total shareholders:', COUNT(*) FROM shareholders
UNION ALL
SELECT 'Total users:', COUNT(*) FROM users
UNION ALL
SELECT 'Admin users:', COUNT(*) FROM users WHERE role = 'ADMIN'
UNION ALL
SELECT 'Test users:', COUNT(*) FROM users WHERE email LIKE '%@oblinor.no';