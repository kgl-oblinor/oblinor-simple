# 🚀 Deploy to Railway - Step by Step

## Step 1: Push to GitHub (Manual)

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `oblinor-simple`
   - Description: `Simplified emission platform for Oblinor`
   - Public repository
   - DON'T initialize with README (we already have one)
   - Click "Create repository"

2. **Push your code:**
```bash
# Add remote and push (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/oblinor-simple.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Railway

### Quick Method (One-Click Deploy)

1. **Go to Railway:** https://railway.app/new
2. **Click "Deploy from GitHub repo"**
3. **Authorize Railway** to access your GitHub
4. **Select `oblinor-simple` repository**

### Setup Services

Railway will create a project. Now add services:

#### 1. PostgreSQL Database
```
1. Click "New" → "Database" → "PostgreSQL"
2. Wait for it to provision
3. Click on PostgreSQL → "Variables" tab
4. Copy the DATABASE_URL (you'll need this)
```

#### 2. Backend Service
```
1. Click "New" → "GitHub Repo"
2. Select "oblinor-simple"
3. Configure:
   - Root Directory: /backend
   - Click "Add Variables" and add:
     DATABASE_URL = [paste from PostgreSQL]
     JWT_SECRET = your-super-secret-jwt-key-min-32-chars
     NODE_ENV = production
4. Click "Deploy"
5. Go to Settings → Networking → Generate Domain
6. Copy the backend URL (like: oblinor-backend.up.railway.app)
```

#### 3. Frontend Service
```
1. Click "New" → "GitHub Repo"
2. Select "oblinor-simple" again
3. Configure:
   - Root Directory: /frontend
   - Click "Add Variables" and add:
     VITE_API_URL = https://[your-backend-url].up.railway.app
4. Click "Deploy"
5. Go to Settings → Networking → Generate Domain
```

## Step 3: Initialize Database

### Option A: Using Railway Shell
```
1. Click on PostgreSQL service
2. Go to "Shell" tab
3. Paste the contents of database/init.sql
```

### Option B: Using psql locally
```bash
# Get DATABASE_URL from Railway PostgreSQL Variables
psql "postgresql://postgres:xxxxx@xxxxx.railway.app:5432/railway" < database/init.sql
```

## Step 4: Test Your Deployment

1. **Check Backend Health:**
   ```
   https://[your-backend].up.railway.app/health
   ```

2. **Open Frontend:**
   ```
   https://[your-frontend].up.railway.app
   ```

3. **Login with:**
   - Admin: `admin@oblinor.no` / `Admin123!`
   - User: `user1@example.com` / `Pass123!`

## 🎯 Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] PostgreSQL added and DATABASE_URL copied
- [ ] Backend deployed with env variables
- [ ] Backend domain generated
- [ ] Frontend deployed with VITE_API_URL
- [ ] Frontend domain generated
- [ ] Database initialized with init.sql
- [ ] Health check working
- [ ] Login working

## 🆘 Troubleshooting

### "Build failed"
- Check build logs in Railway
- Backend needs: DATABASE_URL, JWT_SECRET
- Frontend needs: VITE_API_URL

### "Cannot connect to backend"
- Check VITE_API_URL has https:// prefix
- Check backend domain is public
- Check /health endpoint

### "Login not working"
- Check database was initialized
- Check JWT_SECRET is set
- Check passwords: Admin123! and Pass123!

## 📱 Support

- Railway Discord: https://discord.gg/railway
- Railway Docs: https://docs.railway.app

---

**Your app is 100% ready! Just follow these steps and you'll be live in 10 minutes!** 🎉