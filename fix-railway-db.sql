-- Drop existing tables and start fresh
DROP TABLE IF EXISTS emission_subscriptions CASCADE;
DROP TABLE IF EXISTS emissions CASCADE;
DROP TABLE IF EXISTS shareholders CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS update_shareholder_shares() CASCADE;

-- Now run the full init script
\i database/init.sql