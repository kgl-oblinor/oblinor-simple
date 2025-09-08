import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

let pool: Pool | null = null;

// Check if DATABASE_URL is provided
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is required');
  console.log('💡 Add PostgreSQL plugin to Railway service or set DATABASE_URL');
  console.log('🚀 App will start anyway - database features disabled');
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  // Test the connection
  pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL database');
  });

  pool.on('error', (err) => {
    console.error('❌ Database connection error:', err);
    console.log('💡 Check that DATABASE_URL is correct');
  });
}

export { pool };

// Helper functions for queries
export const query = async (text: string, params?: any[]): Promise<any> => {
  if (!pool) {
    throw new Error('Database not connected. Add PostgreSQL plugin to Railway service.');
  }
  return pool.query(text, params);
};

export const queryOne = async (text: string, params?: any[]): Promise<any> => {
  if (!pool) {
    throw new Error('Database not connected. Add PostgreSQL plugin to Railway service.');
  }
  const result = await pool.query(text, params);
  return result.rows[0] || null;
};