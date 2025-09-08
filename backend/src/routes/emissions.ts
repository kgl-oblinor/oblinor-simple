import { Router, Response } from 'express';
import { query, queryOne } from '../db';
import { auth, AuthRequest } from '../auth';
import { Emission, EmissionSubscription } from '../types';

const router = Router();

// GET /emissions - List emissions (All users can see basic info)
router.get('/', auth(), async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(`
      SELECT e.*, u.name as created_by_name
      FROM emissions e
      LEFT JOIN users u ON e.created_by = u.id
      ORDER BY e.created_at DESC
    `);
    
    res.json({ emissions: result.rows });
  } catch (error) {
    console.error('Get emissions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /emissions/:id - Get emission details (Level 3 for full details, others get limited)
router.get('/:id', auth(), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const emission = await queryOne(`
      SELECT e.*, u.name as created_by_name
      FROM emissions e
      LEFT JOIN users u ON e.created_by = u.id
      WHERE e.id = $1
    `, [id]);
    
    if (!emission) {
      return res.status(404).json({ error: 'Emission not found' });
    }

    // Level 3 users get full details, others get limited info
    if (req.user!.level < 3 && req.user!.role !== 'ADMIN') {
      const limitedEmission = {
        id: emission.id,
        title: emission.title,
        description: emission.description,
        status: emission.status,
        start_date: emission.start_date,
        end_date: emission.end_date
      };
      return res.json({ emission: limitedEmission });
    }
    
    res.json({ emission });
  } catch (error) {
    console.error('Get emission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /emissions - Create emission (Admin only)
router.post('/', auth({ adminOnly: true }), async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      description,
      presentation_material,
      shares_before,
      new_shares_offered,
      price_per_share,
      start_date,
      end_date,
      status = 'DRAFT'
    } = req.body;

    if (!title || !shares_before || !new_shares_offered || !price_per_share || !start_date || !end_date) {
      return res.status(400).json({ 
        error: 'Title, shares_before, new_shares_offered, price_per_share, start_date, and end_date required' 
      });
    }

    if (shares_before < 0 || new_shares_offered <= 0 || price_per_share <= 0) {
      return res.status(400).json({ error: 'Invalid numeric values' });
    }

    if (new Date(end_date) < new Date(start_date)) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }

    const newEmission = await queryOne(`
      INSERT INTO emissions (
        title, description, presentation_material, shares_before, 
        new_shares_offered, price_per_share, start_date, end_date, 
        status, created_by
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [
      title, description, presentation_material, shares_before,
      new_shares_offered, price_per_share, start_date, end_date,
      status, req.user!.id
    ]);

    res.status(201).json({ 
      message: 'Emission created successfully',
      emission: newEmission 
    });
  } catch (error) {
    console.error('Create emission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /emissions/:id - Edit emission (Admin only)
router.put('/:id', auth({ adminOnly: true }), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      presentation_material,
      shares_before,
      new_shares_offered,
      price_per_share,
      start_date,
      end_date,
      status
    } = req.body;

    if (!title || typeof shares_before !== 'number' || typeof new_shares_offered !== 'number' || 
        typeof price_per_share !== 'number' || !start_date || !end_date) {
      return res.status(400).json({ 
        error: 'All fields required with correct types' 
      });
    }

    if (shares_before < 0 || new_shares_offered <= 0 || price_per_share <= 0) {
      return res.status(400).json({ error: 'Invalid numeric values' });
    }

    if (new Date(end_date) < new Date(start_date)) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }

    const updatedEmission = await queryOne(`
      UPDATE emissions 
      SET title = $1, description = $2, presentation_material = $3, 
          shares_before = $4, new_shares_offered = $5, price_per_share = $6,
          start_date = $7, end_date = $8, status = $9, updated_at = CURRENT_TIMESTAMP
      WHERE id = $10
      RETURNING *
    `, [
      title, description, presentation_material, shares_before,
      new_shares_offered, price_per_share, start_date, end_date,
      status, id
    ]);

    if (!updatedEmission) {
      return res.status(404).json({ error: 'Emission not found' });
    }

    res.json({ 
      message: 'Emission updated successfully',
      emission: updatedEmission 
    });
  } catch (error) {
    console.error('Update emission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /emissions/:id - Delete emission (Admin only)
router.delete('/:id', auth({ adminOnly: true }), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const deletedEmission = await queryOne(
      'DELETE FROM emissions WHERE id = $1 RETURNING *',
      [id]
    );

    if (!deletedEmission) {
      return res.status(404).json({ error: 'Emission not found' });
    }

    res.json({ 
      message: 'Emission deleted successfully',
      emission: deletedEmission 
    });
  } catch (error) {
    console.error('Delete emission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /emissions/:id/subscribe - Subscribe to emission (Level 3 only)
router.post('/:id/subscribe', auth({ minLevel: 3 }), async (req: AuthRequest, res: Response) => {
  try {
    const { id: emission_id } = req.params;
    const { shares_requested } = req.body;
    const user_id = req.user!.id;

    if (!shares_requested || shares_requested <= 0) {
      return res.status(400).json({ error: 'Valid shares_requested required' });
    }

    // Check if emission exists and is active
    const emission = await queryOne(
      'SELECT id, status, new_shares_offered FROM emissions WHERE id = $1',
      [emission_id]
    );

    if (!emission) {
      return res.status(404).json({ error: 'Emission not found' });
    }

    if (emission.status !== 'ACTIVE') {
      return res.status(400).json({ error: 'Emission is not active for subscriptions' });
    }

    // Check if user already has a subscription for this emission
    const existingSubscription = await queryOne(
      'SELECT id FROM emission_subscriptions WHERE emission_id = $1 AND user_id = $2',
      [emission_id, user_id]
    );

    if (existingSubscription) {
      return res.status(409).json({ error: 'You already have a subscription for this emission' });
    }

    const newSubscription = await queryOne(`
      INSERT INTO emission_subscriptions (emission_id, user_id, shares_requested)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [emission_id, user_id, shares_requested]);

    res.status(201).json({ 
      message: 'Subscription created successfully',
      subscription: newSubscription 
    });
  } catch (error) {
    console.error('Create subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /emissions/:id/my-subscription - Check if current user has subscribed
router.get('/:id/my-subscription', auth(), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const subscription = await queryOne(`
      SELECT * FROM emission_subscriptions
      WHERE emission_id = $1 AND user_id = $2
    `, [id, req.user!.id]);
    
    if (!subscription) {
      return res.status(404).json({ error: 'No subscription found' });
    }
    
    res.json(subscription);
  } catch (error) {
    console.error('Get my subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /emissions/:id/subscriptions - List subscriptions (Admin only)
router.get('/:id/subscriptions', auth({ adminOnly: true }), async (req: AuthRequest, res: Response) => {
  try {
    const { id: emission_id } = req.params;
    
    const subscriptions = await query(`
      SELECT es.*, 
        json_build_object(
          'id', u.id,
          'name', u.name,
          'email', u.email,
          'role', u.role,
          'level', u.level
        ) as user,
        approver.name as approved_by_name
      FROM emission_subscriptions es
      JOIN users u ON es.user_id = u.id
      LEFT JOIN users approver ON es.approved_by = approver.id
      WHERE es.emission_id = $1
      ORDER BY es.created_at ASC
    `, [emission_id]);
    
    res.json({ subscriptions: subscriptions.rows });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /emissions/:id/subscriptions/:subId - Approve/reject subscription (Admin only)
router.patch('/:id/subscriptions/:subId', auth({ adminOnly: true }), async (req: AuthRequest, res: Response) => {
  try {
    const { subId } = req.params;
    const { status, shares_allocated } = req.body;

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Status must be APPROVED or REJECTED' });
    }

    if (status === 'APPROVED' && (!shares_allocated || shares_allocated <= 0)) {
      return res.status(400).json({ error: 'shares_allocated required for approval' });
    }

    const updatedSubscription = await queryOne(`
      UPDATE emission_subscriptions 
      SET status = $1, shares_allocated = $2, approved_by = $3
      WHERE id = $4
      RETURNING *
    `, [status, shares_allocated || 0, req.user!.id, subId]);

    if (!updatedSubscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // CRITICAL: Update shareholder shares when approved
    if (status === 'APPROVED' && shares_allocated > 0) {
      await query(`
        UPDATE shareholders 
        SET shares_owned = shares_owned + $1, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $2
      `, [shares_allocated, updatedSubscription.user_id]);

      // Record historical entry for the allocation
      await query(`
        INSERT INTO shareholder_history 
        (shareholder_id, emission_id, shares_owned, change_type, change_reason)
        SELECT s.id, $1, s.shares_owned, 'EMISSION', 
               'Shares allocated: ' || $2 || ' from emission approval'
        FROM shareholders s
        WHERE s.user_id = $3
      `, [updatedSubscription.emission_id, shares_allocated, updatedSubscription.user_id]);
    }

    res.json({ 
      message: `Subscription ${status.toLowerCase()} successfully`,
      subscription: updatedSubscription 
    });
  } catch (error) {
    console.error('Update subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;