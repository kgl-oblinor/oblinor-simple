# Railway Deployment Guide

## ✅ Forberedelser er ferdige!

Railway CLI er installert lokalt og alle nødvendige konfigurasjonsfiler er på plass.

## 📝 Neste steg - Manuell deployment

### 1. Logg inn i Railway (i terminal):
```bash
npx railway login
```
Dette åpner nettleseren for innlogging.

### 2. Opprett nytt Railway-prosjekt:
```bash
npx railway init
```
Velg "Create new project" når du blir spurt.

### 3. Legg til PostgreSQL database:
```bash
npx railway add
```
Velg "PostgreSQL" fra listen.

### 4. Sett miljøvariabler for backend:
```bash
npx railway variables set JWT_SECRET="your-super-secret-jwt-key-min-32-chars" -s backend
npx railway variables set NODE_ENV="production" -s backend
```

### 5. Sett miljøvariabler for frontend:
```bash
npx railway variables set VITE_API_URL="https://your-backend.railway.app" -s frontend
```
(Erstatt URL med faktisk backend URL fra Railway)

### 6. Deploy backend:
```bash
cd backend
npx railway up
cd ..
```

### 7. Deploy frontend:
```bash
cd frontend
npx railway up
cd ..
```

### 8. Kjør database-migrering:
Etter at PostgreSQL er oppe, koble til via Railway dashboard og kjør:
```sql
-- Kopier innholdet fra database/init.sql
```

## 🔗 Alternative: GitHub-integrasjon

For enklere deployment kan du:
1. Push koden til GitHub
2. Koble GitHub-repo til Railway via dashboard
3. Railway vil automatisk deploye ved hver push

## 📦 Prosjektstruktur for Railway

Prosjektet er satt opp som monorepo med:
- `/backend` - Express API (egen Railway service)
- `/frontend` - React app (egen Railway service)
- PostgreSQL database (Railway plugin)

## ✅ Verifisering

Etter deployment, sjekk:
- Backend health: `https://your-backend.railway.app/health`
- Frontend: `https://your-frontend.railway.app`

## 🔑 Test-brukere (etter database-migrering)
- admin@oblinor.no / Admin123!
- user3@oblinor.no / Pass123!