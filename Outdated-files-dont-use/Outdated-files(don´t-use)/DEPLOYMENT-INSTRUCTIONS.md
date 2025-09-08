# 🚀 OBLINOR DEPLOYMENT INSTRUCTIONS

**🚨 CRITICAL: CACHE-SAFE DEPLOYMENT ONLY**

## ⛔ NEVER USE THESE COMMANDS:
```bash
git add .
git commit -m "message"
git push                    # ← CAUSES CACHE ISSUES!
```

## ✅ ALWAYS USE THESE COMMANDS:
```bash
# Cache-safe deployment with automatic verification
npm run deploy "Your commit message"

# Quick deployment  
npm run deploy:quick

# Manual verification if needed
npm run verify:deployment
```

---

## 🛡️ WHY THIS PREVENTS CACHE ISSUES

### The Problem We Solved:
- Changes visible locally but not live
- Users see old cached versions
- Railway deployment vs browser cache mismatch

### Our Solution:
1. **Unique timestamps** on every deploy
2. **Automatic verification** that changes are live
3. **Cache-busting** in package.json
4. **Detection of specific UI changes** (sidebar icons)

---

## 🎯 LIVE SYSTEM DETAILS

**Production URL:** https://oblinor-simple.up.railway.app

**Admin Login:**
- Email: admin@oblinor.no  
- Password: Admin123!

**System Status:**
- Live users: 30 Norwegian shareholders
- Live data: 127,640 shares  
- Active emission: Serie B (20,000 shares)

---

## 📋 DEPLOYMENT PROCESS

### 1. Make Your Changes
Edit files as normal in your IDE

### 2. Deploy with Cache-Busting
```bash
npm run deploy "Describe your changes"
```

### 3. Automatic Verification
The script will:
- ✅ Add unique timestamp to package.json
- ✅ Commit and push to GitHub  
- ✅ Wait for Railway deployment
- ✅ Verify your changes are live
- ✅ Check for specific UI elements (sidebar icons)

### 4. Success!
Your changes are live and verified on:
https://oblinor-simple.up.railway.app

---

## 🚨 EMERGENCY PROCEDURES

### If Deployment Verification Fails:
```bash
# Check Railway health
npm run verify:deployment

# Clear your browser cache
npm run clear:cache

# Force manual refresh
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + F5
```

### If Changes Still Not Visible:
1. Use incognito/private browsing mode
2. Wait 5-10 minutes (Railway can be slow)
3. Check Railway dashboard for deployment status

---

## 📞 SUPPORT

- **Full Documentation:** CACHE-PREVENTION.md
- **Deployment Guide:** DEPLOYMENT_CHECKLIST.md  
- **Technical Details:** CLAUDE.md

**REMEMBER:** NEVER use `git push` directly - ALWAYS use `npm run deploy`!

This system GUARANTEES no more cache issues! 🛡️