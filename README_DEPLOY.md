# 🚀 ONE-CLICK DEPLOY TO RAILWAY

## Raskeste metode (2 minutter):

### Option 1: Deploy Button (Enklest!)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/deploy?repo=https://github.com/kgl-oblinor/oblinor-simple)

### Option 2: Fra Railway Dashboard

1. **Gå til:** https://railway.app/new
2. **Velg:** "Deploy from GitHub repo"
3. **Velg:** `kgl-oblinor/oblinor-simple`
4. Railway setter opp alt automatisk!

## Etter deployment:

### 1. Initialiser database
Railway vil gi deg en DATABASE_URL. Kjør:
```bash
psql "DATABASE_URL_FRA_RAILWAY" < database/init.sql
```

Eller last ned init.sql og kjør i Railway's Query tab.

### 2. Generer domener
- Gå til hver service (backend/frontend)
- Settings → Networking → Generate Domain

### 3. Oppdater Frontend miljøvariabel
- Gå til frontend service
- Variables → VITE_API_URL
- Sett til: `https://[din-backend-url].up.railway.app`

## Test credentials:
- **Admin:** admin@oblinor.no / Admin123!
- **User:** user1@example.com / Pass123!

## URLs etter deployment:
- Backend: `https://[backend].up.railway.app/health`
- Frontend: `https://[frontend].up.railway.app`

---

**Deployment tar ca 2-3 minutter!** 🎉