# Railway Deployment Guide

## Prerequisites
- Railway account (https://railway.app)
- GitHub repository (optional but recommended)

## Step 1: Create Railway Project

1. Log in to Railway Dashboard
2. Click "New Project"
3. Choose "Empty Project"

## Step 2: Add PostgreSQL Database

1. In your Railway project, click "New Service"
2. Choose "Database" → "PostgreSQL"
3. Wait for provisioning to complete
4. Click on the PostgreSQL service
5. Go to "Variables" tab
6. Copy the `DATABASE_URL`

## Step 3: Initialize Database

Run the init script with your Railway PostgreSQL URL:

```bash
# From the project root
psql "YOUR_RAILWAY_DATABASE_URL" < database/init.sql
```

This creates:
- 4 tables (users, shareholders, emissions, emission_subscriptions)
- 31 users (admin@oblinor.no with password: Admin123!)
- 30 shareholders
- 1 sample emission

## Step 4: Deploy Backend

### Option A: From GitHub (Recommended)
1. Push code to GitHub
2. In Railway, click "New Service" → "GitHub Repo"
3. Select your repository
4. Set root directory to `/backend`
5. Add environment variables:
   - `DATABASE_URL` (copy from PostgreSQL service)
   - `JWT_SECRET` = `your-super-secret-jwt-key-min-32-chars`
   - `NODE_ENV` = `production`

### Option B: Using Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link [project-id]

# Deploy backend
cd backend
railway up
```

## Step 5: Deploy Frontend

1. In Railway, click "New Service"
2. Choose same GitHub repo (or use CLI)
3. Set root directory to `/frontend`
4. Add environment variable:
   - `VITE_API_URL` = `https://[your-backend-service].railway.app`
5. Railway will automatically:
   - Install dependencies
   - Run `npm run build`
   - Start with `npm run start`

## Step 6: Configure Service URLs

### Backend Service:
1. Go to Settings → Networking
2. Click "Generate Domain"
3. Copy the URL (e.g., `oblinor-backend.railway.app`)

### Frontend Service:
1. Go to Settings → Networking
2. Click "Generate Domain"
3. Copy the URL (e.g., `oblinor-frontend.railway.app`)

### Update Frontend Environment:
1. Go to frontend service Variables
2. Update `VITE_API_URL` to your backend URL
3. Redeploy frontend

## Environment Variables Summary

### Backend Service:
```env
DATABASE_URL=[from PostgreSQL service]
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
NODE_ENV=production
```

### Frontend Service:
```env
VITE_API_URL=https://[your-backend].railway.app
```

## Testing Deployment

1. Open your frontend URL
2. Login with:
   - Email: `admin@oblinor.no`
   - Password: `Admin123!`
3. Test all functionality:
   - User management (Admin Level 2)
   - Shareholder management (Admin)
   - Emissions (Admin creates, Level 3 users subscribe)
   - Subscriptions (Admin approves)

## Monitoring

- View logs: Click service → "Logs" tab
- Check metrics: Click service → "Metrics" tab
- Health check: `https://[backend-url]/health`

## Common Issues

### Frontend can't reach backend:
- Check VITE_API_URL is correct
- Ensure backend service has public domain
- Check CORS settings in backend

### Database connection issues:
- Verify DATABASE_URL in backend service
- Check PostgreSQL service is running
- Run migrations if needed

### Build failures:
- Check build logs for errors
- Ensure all dependencies in package.json
- Verify Node version compatibility

## Local Testing Before Deployment

```bash
# Test backend build
cd backend
npm install
npm run build
npm start

# Test frontend build
cd frontend
npm install
npm run build
npm run preview

# If both work locally, they'll work on Railway
```

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Project Issues: Create issue in GitHub repo