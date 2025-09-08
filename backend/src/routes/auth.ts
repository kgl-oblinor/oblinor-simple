import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { query, queryOne } from '../services/database';
import { generateToken, auth, AuthRequest } from '../middleware/auth';
import { LoginRequest, User } from '../types';

const router = Router();

// POST /auth/login - Login with email/password
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user by email
    const user = await queryOne(
      'SELECT id, email, password_hash, name, role, level FROM users WHERE email = $1',
      [email]
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user);

    // Return user without password hash
    const userResponse: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      level: user.level
    };

    res.json({
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /auth/register - Register new user (always level 1)
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name required' });
    }

    // Check if user already exists
    const existingUser = await queryOne('SELECT id FROM users WHERE email = $1', [email]);
    
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Create new user (always level 1 USER)
    const newUser = await queryOne(
      `INSERT INTO users (email, password_hash, name, role, level) 
       VALUES ($1, $2, $3, 'USER', 1) 
       RETURNING id, email, name, role, level`,
      [email, password_hash, name]
    );

    // Generate token
    const token = generateToken(newUser);

    // Return user data
    const userResponse: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      level: newUser.level
    };

    res.status(201).json({
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /auth/me - Get current user
router.get('/me', auth(), (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
});

export default router;