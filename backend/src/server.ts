import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';
import { pool } from './services/database';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import shareholderRoutes from './routes/shareholders';
import emissionRoutes from './routes/emissions';
import debugRoutes from './routes/debug';

// Load environment variables
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '4001', 10);

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV 
  });
});

// API routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/shareholders', shareholderRoutes);
app.use('/emissions', emissionRoutes);
app.use('/debug', debugRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../dist');
  console.log('Serving frontend from:', frontendPath);
  console.log('__dirname is:', __dirname);
  console.log('NODE_ENV is:', process.env.NODE_ENV);
  app.use(express.static(frontendPath));
  
  // Handle React routing - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    const indexPath = path.join(frontendPath, 'index.html');
    console.log('Serving index.html from:', indexPath);
    console.log('Request URL:', req.url);
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('Error serving index.html:', err);
        res.status(500).json({ error: 'Failed to serve frontend' });
      }
    });
  });
} else {
  // 404 handler for development
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });
}

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  if (pool) {
    await pool.end();
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  if (pool) {
    await pool.end();
  }
  process.exit(0);
});

// Start server with error handling
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Oblinor Simple Backend running on port ${PORT} (v2)`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`🗄️ Database: ${pool ? 'Connected' : 'Disabled'}`);
  console.log(`🔗 DATABASE_URL: ${process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 50) + '...' : 'Not set'}`);
}).on('error', (err: any) => {
  console.error('❌ Server failed to start:', err);
  console.error('💡 Check if port is available or environment variables are set');
  process.exit(1);
});

export default app;