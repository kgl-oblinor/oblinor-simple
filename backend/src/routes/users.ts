import { Router, Response } from 'express';
import { query, queryOne } from '../db';
import { auth, AuthRequest } from '../auth';
import { User } from '../types';

const router = Router();

// GET /users - List all users (Admin only)
router.get('/', auth({ adminOnly: true }), async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      'SELECT id, email, name, role, level, created_at, updated_at FROM users ORDER BY created_at DESC'
    );
    
    res.json({ users: result.rows });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /users/:id/level - Change user level (Admin only)
router.patch('/:id/level', auth({ adminOnly: true }), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { level } = req.body;

    if (typeof level !== 'number') {
      return res.status(400).json({ error: 'Level must be a number' });
    }

    // Get current user to validate level constraints
    const user = await queryOne('SELECT role, level FROM users WHERE id = $1', [id]);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate level based on role constraints
    if (user.role === 'USER' && ![1, 2, 3].includes(level)) {
      return res.status(400).json({ error: 'USER level must be 1, 2, or 3' });
    }
    
    if (user.role === 'ADMIN' && ![1, 2].includes(level)) {
      return res.status(400).json({ error: 'ADMIN level must be 1 or 2' });
    }

    // Update user level
    const updatedUser = await queryOne(
      `UPDATE users 
       SET level = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 
       RETURNING id, email, name, role, level, updated_at`,
      [level, id]
    );

    res.json({ 
      message: 'User level updated successfully',
      user: updatedUser 
    });
  } catch (error) {
    console.error('Update user level error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /users/:id - Get specific user (Admin only)
router.get('/:id', auth({ adminOnly: true }), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const user = await queryOne(
      'SELECT id, email, name, role, level, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;