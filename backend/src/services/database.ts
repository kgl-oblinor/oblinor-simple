import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

// Check if DATABASE_URL is provided
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is required');
  console.log('💡 Set DATABASE_URL in Railway dashboard to connect to your database service');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test the connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
  console.log('💡 Check that DATABASE_URL points to your oblinor-simple-database service');
  // Don't exit immediately on connection errors, let the app try to reconnect
});

export { pool };

// Helper functions for queries
export const query = (text: string, params?: any[]): Promise<any> => {
  return pool.query(text, params);
};

export const queryOne = async (text: string, params?: any[]): Promise<any> => {
  const result = await pool.query(text, params);
  return result.rows[0] || null;
};