# Oblinor Simple - Norwegian Share Emission Platform

**🌐 Production:** https://oblinor-simple.up.railway.app  
**🏗️ Architecture:** Monorepo with Express.js backend + React frontend  
**🚀 Deployment:** Railway with Nixpacks

## Quick Start

This is a monorepo deployment where the backend serves the frontend in production.

### Structure
```
oblinor-simple/
├── backend/          # Express.js API + serves frontend in production
├── frontend/         # React SPA (built to backend/dist in production)
├── railway.json      # Railway deployment config
└── package.json      # Root monorepo scripts
```

### Deployment
The Railway deployment process:
1. Install backend dependencies
2. Build backend TypeScript
3. Install frontend dependencies  
4. Build frontend with empty API URL (for relative paths)
5. Copy frontend dist to backend directory
6. Start backend server (which serves both API and frontend)

### Health Check
The backend provides a health check endpoint at `/health` for Railway monitoring.

## Development

**Admin Access:**
```
Email: admin@oblinor.no
Password: Admin123!
```

**Test Users:**
```
user2@oblinor.no / Pass123! (Level 2 - view only)
user3@oblinor.no / Pass123! (Level 3 - can subscribe)
```

## Technologies
- **Backend:** Express.js, TypeScript, PostgreSQL, JWT auth
- **Frontend:** React 18, Vite, TypeScript, Axios
- **Database:** PostgreSQL on Railway
- **Deployment:** Railway with Nixpacks