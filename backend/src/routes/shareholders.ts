import { Router, Response } from 'express';
import { query, queryOne } from '../db';
import { auth, AuthRequest } from '../auth';
import { Shareholder } from '../types';

const router = Router();

// GET /shareholders - List shareholders (Level 2+ required)
router.get('/', auth({ minLevel: 2 }), async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(`
      SELECT s.*, u.name as user_name, u.email as user_email
      FROM shareholders s
      LEFT JOIN users u ON s.user_id = u.id
      ORDER BY s.shares_owned DESC, s.created_at ASC
    `);
    
    res.json({ shareholders: result.rows });
  } catch (error) {
    console.error('Get shareholders error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /shareholders - Add shareholder (Admin only)
router.post('/', auth({ adminOnly: true }), async (req: AuthRequest, res: Response) => {
  try {
    const { user_id, name, email, shares_owned = 0 } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email required' });
    }

    if (shares_owned < 0) {
      return res.status(400).json({ error: 'Shares owned cannot be negative' });
    }

    // If user_id provided, validate it exists
    if (user_id) {
      const user = await queryOne('SELECT id FROM users WHERE id = $1', [user_id]);
      if (!user) {
        return res.status(400).json({ error: 'Invalid user_id' });
      }
    }

    const newShareholder = await queryOne(`
      INSERT INTO shareholders (user_id, name, email, shares_owned)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [user_id || null, name, email, shares_owned]);

    res.status(201).json({ 
      message: 'Shareholder created successfully',
      shareholder: newShareholder 
    });
  } catch (error) {
    console.error('Create shareholder error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /shareholders/:id - Edit shareholder (Admin only)
router.put('/:id', auth({ adminOnly: true }), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { user_id, name, email, shares_owned } = req.body;

    if (!name || !email || typeof shares_owned !== 'number') {
      return res.status(400).json({ error: 'Name, email, and shares_owned required' });
    }

    if (shares_owned < 0) {
      return res.status(400).json({ error: 'Shares owned cannot be negative' });
    }

    // If user_id provided, validate it exists
    if (user_id) {
      const user = await queryOne('SELECT id FROM users WHERE id = $1', [user_id]);
      if (!user) {
        return res.status(400).json({ error: 'Invalid user_id' });
      }
    }

    const updatedShareholder = await queryOne(`
      UPDATE shareholders 
      SET user_id = $1, name = $2, email = $3, shares_owned = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `, [user_id || null, name, email, shares_owned, id]);

    if (!updatedShareholder) {
      return res.status(404).json({ error: 'Shareholder not found' });
    }

    res.json({ 
      message: 'Shareholder updated successfully',
      shareholder: updatedShareholder 
    });
  } catch (error) {
    console.error('Update shareholder error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /shareholders/:id - Delete shareholder (Admin only)
router.delete('/:id', auth({ adminOnly: true }), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const deletedShareholder = await queryOne(
      'DELETE FROM shareholders WHERE id = $1 RETURNING *',
      [id]
    );

    if (!deletedShareholder) {
      return res.status(404).json({ error: 'Shareholder not found' });
    }

    res.json({ 
      message: 'Shareholder deleted successfully',
      shareholder: deletedShareholder 
    });
  } catch (error) {
    console.error('Delete shareholder error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /shareholders/:id - Get specific shareholder (Level 2+ required)
router.get('/:id', auth({ minLevel: 2 }), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const shareholder = await queryOne(`
      SELECT s.*, u.name as user_name, u.email as user_email
      FROM shareholders s
      LEFT JOIN users u ON s.user_id = u.id
      WHERE s.id = $1
    `, [id]);
    
    if (!shareholder) {
      return res.status(404).json({ error: 'Shareholder not found' });
    }
    
    res.json({ shareholder });
  } catch (error) {
    console.error('Get shareholder error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;