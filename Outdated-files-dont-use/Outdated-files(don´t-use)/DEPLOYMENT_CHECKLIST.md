# 🚨 LIVE-ONLY SYSTEM - NO LOCAL DEPLOYMENT

**📍 SINGLE SOURCE OF TRUTH FOR LIVE SYSTEM**

**⚠️ CRITICAL:** This is a LIVE-ONLY production system. No local development environment exists!

---

## ⚠️ CRITICAL: CORRECT PRODUCTION URL

**✅ CURRENT PRODUCTION URL:**
```bash
https://oblinor-simple.up.railway.app
```

**❌ OLD URLs (NO LONGER USED):**
```bash
https://oblinoremisjonrailway-production.up.railway.app  # Old URL
https://oblinor-simple-production.up.railway.app        # Old URL
```

---

## 🚨 LIVE-ONLY SYSTEM - NO LOCAL DEVELOPMENT

### ⚠️ NO LOCAL DEVELOPMENT ENVIRONMENT

**🚨 CRITICAL:** This system operates LIVE-ONLY mode:

```bash
# ONLY way to make changes:
git add .
git commit -m "Your changes"
git push

# Railway automatically deploys to LIVE system  
# Real users see changes immediately!
open https://oblinor-simple.up.railway.app/
```

### 🗄️ Database Access (Live Data Only)

```bash
# Connect to live database for inspection
node check_db.js           # Live database overview
node debug_tables.js        # Detailed schema
```

### ⚠️ Live System Verification
- ✅ Production: https://oblinor-simple.up.railway.app/ 
- ✅ Database: 30 real shareholders, 127,640 shares
- ✅ Login: admin@oblinor.no / Admin123!

---

## 🌐 PRODUCTION DEPLOYMENT

### 1. Pre-Deployment Checklist
- [ ] All tests pass locally
- [ ] Frontend builds without errors: `cd frontend && npm run build`
- [ ] Backend compiles without errors: `cd backend && npm run build`
- [ ] No TypeScript errors
- [ ] Environment variables are secure

### 2. Railway Deployment Process

**🚀 NEW: CACHE-SAFE DEPLOYMENT (RECOMMENDED):**
```bash
# Automatic cache-busting deployment with verification
npm run deploy "Your descriptive commit message"

# Quick deploy with automatic message
npm run deploy:quick

# Manual verification (if needed)
npm run verify:deployment
```

**📋 MANUAL DEPLOYMENT (OLD METHOD):**
```bash
# 1. Commit changes
git add .
git commit -m "Your descriptive commit message"

# 2. Push to GitHub (triggers Railway auto-deploy)
git push

# 3. Wait 2-3 minutes then verify deployment
npm run verify:deployment

# 4. If cache issues, clear browser cache:
npm run clear:cache
```

### 3. Post-Deployment Verification
- [ ] Production URL loads: https://oblinor-simple.up.railway.app
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
- ❌ **OLD URLs** (no longer used): `oblinoremisjonrailway-production.up.railway.app`, `oblinor-simple-production.up.railway.app`
- ✅ **ALWAYS** use `oblinor-simple.up.railway.app`
- 📝 When in doubt, check CLAUDE.md or README.md

### 2. Environment Variable Mistakes
- ❌ Don't use production DATABASE_URL in .env (it's already there)
- ❌ Don't change JWT_SECRET in development
- ✅ Keep VITE_API_URL as localhost:4001 for development

### 3. Build Failures
- 🔍 Always run `npm run build` locally before pushing
- 🔍 Check TypeScript errors with `tsc --noEmit`
- 🔍 Monitor Railway logs for deployment status

### 4. Cache Issues (SOLVED)
- 🚨 **Problem:** Changes visible locally but not live
- ✅ **Solution:** Use `npm run deploy` for automatic cache-busting
- 🧹 **Manual fix:** Hard refresh (Cmd+Shift+R) or incognito mode
- 🔍 **Verification:** `npm run verify:deployment` checks if changes are live

### 5. Database Issues
- ⚠️ Development and production share same database
- 📊 Don't run destructive queries in development
- 🔄 Use admin@oblinor.no / Admin123! for testing

---

## 🧪 TESTING CHECKLIST

### Desktop Testing (>1024px)
- [ ] Sidebar opens by default (250px width)
- [ ] Toggle button (‹/›) visible in top right of sidebar  
- [ ] Click ‹ → Sidebar collapses to 60px width
- [ ] Content shifts smoothly to accommodate width change
- [ ] Click › → Sidebar expands back to 250px
- [ ] All content (user info, navigation) shows when expanded

### Mobile Testing (<768px)  
- [ ] Clean header with hamburger menu (☰) on right side
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
https://oblinor-simple.up.railway.app
```

---

**🎯 Remember:** When in doubt, ALWAYS refer to this checklist and use the correct production URL!