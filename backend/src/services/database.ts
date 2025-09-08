import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

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
  process.exit(1);
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