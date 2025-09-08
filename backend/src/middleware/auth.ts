import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload, AccessControl } from '../types';
import { queryOne } from '../services/database';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    name: string;
    role: 'USER' | 'ADMIN';
    level: number;
  };
}

// JWT authentication middleware
export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-for-railway') as JWTPayload;
    
    // Get fresh user data from database
    const user = await queryOne('SELECT id, email, name, role, level FROM users WHERE id = $1', [decoded.id]);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid token: user not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Authorization middleware factory
export const authorize = (options: AccessControl = {}) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { minLevel, role, adminOnly } = options;

    // Check admin-only access
    if (adminOnly || role === 'ADMIN') {
      if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Admin access required' });
      }
    }

    // Check specific role
    if (role && req.user.role !== role) {
      return res.status(403).json({ error: `${role} role required` });
    }

    // Check minimum level
    if (minLevel && req.user.level < minLevel) {
      return res.status(403).json({ 
        error: `Access level ${minLevel} required. Your level: ${req.user.level}` 
      });
    }

    next();
  };
};

// Combined auth middleware for convenience
export const auth = (options: AccessControl = {}) => {
  return [authenticateToken, authorize(options)];
};

// Generate JWT token
export const generateToken = (user: any): string => {
  const payload: JWTPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    level: user.level
  };

  return jwt.sign(payload, process.env.JWT_SECRET || 'fallback-secret-for-railway', { expiresIn: '24h' });
};