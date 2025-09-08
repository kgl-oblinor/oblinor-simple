# 🚀 DEPLOYMENT CHECKLIST - Oblinor Simple

**📍 SINGLE SOURCE OF TRUTH FOR DEPLOYMENT**

This checklist prevents common deployment mistakes and URL confusion.

---

## ⚠️ CRITICAL: CORRECT PRODUCTION URL

**✅ WORKING PRODUCTION URL:**
```bash
https://oblinoremisjonrailway-production.up.railway.app
```

**❌ BROKEN URLs (DO NOT USE):**
```bash
https://oblinor-simple-production.up.railway.app  # Returns 502 Bad Gateway
```

---

## 🔧 LOCAL DEVELOPMENT SETUP

### 1. Environment Files Setup

**Backend Environment (`backend/.env`):**
```bash
# Copy from .env.example and verify these settings:
DATABASE_URL=postgresql://postgres:iuzakIAZhFviojhSMiTFfbgdnIAFRWGJ@hopper.proxy.rlwy.net:42209/railway
JWT_SECRET=oblinor-local-dev-jwt-secret-change-in-production
NODE_ENV=development
PORT=4001
```

**Frontend Environment (`frontend/.env`):**
```bash
# For local development:
VITE_API_URL=http://localhost:4001
```

### 2. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Should show: 🚀 Oblinor Simple Backend running on port 4001
```

**Terminal 2 - Frontend:**
```bash
cd frontend  
npm run dev
# Should show: ➜ Local: http://localhost:5174/
```

### 3. Verify Local Setup
- ✅ Backend: http://localhost:4001/health should return "OK"
- ✅ Frontend: http://localhost:5174/ should load Oblinor app
- ✅ Login works with: admin@oblinor.no / Admin123!

---

## 🌐 PRODUCTION DEPLOYMENT

### 1. Pre-Deployment Checklist
- [ ] All tests pass locally
- [ ] Frontend builds without errors: `cd frontend && npm run build`
- [ ] Backend compiles without errors: `cd backend && npm run build`
- [ ] No TypeScript errors
- [ ] Environment variables are secure

### 2. Railway Deployment Process
```bash
# 1. Commit changes
git add .
git commit -m "Your descriptive commit message"

# 2. Push to GitHub (triggers Railway auto-deploy)
git push

# 3. Monitor Railway logs for successful deployment
# Railway automatically:
# - Detects the push
# - Runs npm run install:all && npm run build
# - Starts the production server
# - Makes it available on the production URL
```

### 3. Post-Deployment Verification
- [ ] Production URL loads: https://oblinoremisjonrailway-production.up.railway.app
- [ ] Login works with admin credentials
- [ ] Database connection is working
- [ ] Claude-style sidebar toggles correctly on desktop
- [ ] Mobile responsiveness works

---

## 🗃️ DATABASE CONFIGURATION

**Production Database (Railway):**
- **Host:** hopper.proxy.rlwy.net:42209
- **Database:** railway
- **Connection:** Automatically managed by Railway
- **Environment Variables:** Set in Railway dashboard

**Important Notes:**
- ✅ Both local development AND production use the SAME Railway database
- ✅ This is intentional for this project
- ⚠️ Be careful with database operations in development
- 📊 Database contains live data (30+ shareholders, real emission)

---

## 🚨 COMMON PITFALLS TO AVOID

### 1. URL Confusion
- ❌ **NEVER** use `oblinor-simple-production.up.railway.app`
- ✅ **ALWAYS** use `oblinoremisjonrailway-production.up.railway.app`
- 📝 When in doubt, check CLAUDE.md or README.md

### 2. Environment Variable Mistakes
- ❌ Don't use production DATABASE_URL in .env (it's already there)
- ❌ Don't change JWT_SECRET in development
- ✅ Keep VITE_API_URL as localhost:4001 for development

### 3. Build Failures
- 🔍 Always run `npm run build` locally before pushing
- 🔍 Check TypeScript errors with `tsc --noEmit`
- 🔍 Monitor Railway logs for deployment status

### 4. Database Issues
- ⚠️ Development and production share same database
- 📊 Don't run destructive queries in development
- 🔄 Use admin@oblinor.no / Admin123! for testing

---

## 🧪 TESTING CHECKLIST

### Desktop Testing (>1024px)
- [ ] Sidebar opens by default (250px width)
- [ ] Toggle button (‹/›) visible in sidebar header  
- [ ] Click ‹ → Sidebar collapses to 60px width
- [ ] Content shifts smoothly to accommodate width change
- [ ] Click › → Sidebar expands back to 250px
- [ ] All content (title, user info, navigation) shows when expanded

### Mobile Testing (<768px)  
- [ ] Hamburger menu (☰) visible in header
- [ ] Sidebar closed by default
- [ ] Click ☰ → Sidebar slides in from left with backdrop
- [ ] Click ✕ or backdrop → Sidebar slides out
- [ ] Content doesn't shift (overlay behavior)

### Tablet Testing (768-1024px)
- [ ] Similar to desktop but with 220px/60px widths
- [ ] Smooth width transitions
- [ ] Content margin adjusts properly

---

## 📞 SUPPORT & REFERENCES

**Documentation:**
- 📋 CLAUDE.md - Complete technical documentation
- 📖 README.md - User-facing documentation  
- 🗂️ Agent-b-fullstack.md - System analysis report

**Admin Credentials:**
```
Email: admin@oblinor.no
Password: Admin123!
Role: Admin Level 2 (full control)
```

**Production URL (bookmark this):**
```
https://oblinoremisjonrailway-production.up.railway.app
```

---

**🎯 Remember:** When in doubt, ALWAYS refer to this checklist and use the correct production URL!