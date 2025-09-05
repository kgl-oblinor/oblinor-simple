# 🚂 Railway Deployment Guide - Oblinor Simple

## 🎯 Production URL
https://oblinor-simple-production.up.railway.app

## 🚀 Quick Deploy Steps

### 1. Backend Service
- Root Directory: `/backend`
- Build: `npm run build`
- Start: `npm run start`
- Env vars:
  - DATABASE_URL (from Railway PostgreSQL)
  - JWT_SECRET (min 32 chars)
  - NODE_ENV=production
  - PORT=4001

### 2. Frontend Service  
- Root Directory: `/frontend`
- Build: `npm run build`
- Start: `npm run start`
- Env vars:
  - VITE_API_URL=https://[backend-url]
  - PORT=$PORT

### 3. PostgreSQL Database
- Add PostgreSQL service
- Run init.sql then update_shareholders.sql
- 30 Norwegian shareholders ready!

## 🧪 Test Accounts
- admin@oblinor.no / Admin123! (Level 2)
- admin1@oblinor.no / Admin123! (Level 1)
- user3@oblinor.no / Pass123! (Level 3)
- user2@oblinor.no / Pass123! (Level 2)

Ready for production! 🚀
