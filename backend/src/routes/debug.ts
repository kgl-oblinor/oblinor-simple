import { Router, Request, Response } from 'express';
import { query } from '../db';
import { auth } from '../auth';

const router = Router();

// GET /debug/tables - Show all database tables (Admin only)
router.get('/tables', auth({ adminOnly: true }), async (req: Request, res: Response) => {
  try {
    const result = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    res.json({ tables: result.rows });
  } catch (error) {
    console.error('Get tables error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /debug/schema/:table - Show table schema (Admin only)
router.get('/schema/:table', auth({ adminOnly: true }), async (req: Request, res: Response) => {
  try {
    const { table } = req.params;
    
    const result = await query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = $1
      ORDER BY ordinal_position
    `, [table]);
    
    res.json({ table, schema: result.rows });
  } catch (error) {
    console.error('Get schema error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;