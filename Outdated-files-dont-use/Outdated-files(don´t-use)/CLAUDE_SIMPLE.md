# CLAUDE_SIMPLE.md - Oblinor Simple Emisjon Platform

**📍 SINGLE SOURCE OF TRUTH FOR ALL AI AGENTS**  
**⚡ STATUS:** 100% Complete | **🎯 TARGET:** Fully functional emission platform | **Last Updated:** 2025-09-08  

**🎯 PRODUCTION URL:** https://oblinor-simple.up.railway.app/  
**⚠️ IMPORTANT:** Always use oblinor-simple.up.railway.app - NOT oblinoremisjonrailway-production!  
**🚨 CRITICAL:** LIVE-ONLY SYSTEM - NO LOCAL DEVELOPMENT - Real users affected by all changes!  

**📚 DETAILED REFERENCE:** [CLAUDE_SIMPLE_DETAILED.md](./CLAUDE_SIMPLE_DETAILED.md) - Full technical documentation  
**🚂 DEPLOYMENT GUIDE:** [RAILWAY_DEPLOYMENT_GUIDE.md](./RAILWAY_DEPLOYMENT_GUIDE.md) - Complete Railway setup

---

## 📊 IMPLEMENTATION PROGRESS

| Component | Status | Progress | Agent/Task | Notes |
|-----------|--------|----------|------------|-------|
| Project Setup | ✅ | 100% | Agent-1 | All folders created |
| CLAUDE_SIMPLE.md | ✅ | 100% | Claude | Master file complete |
| Folder Structure | ✅ | 100% | Agent-1 | Complete structure |
| Railway Deployment | ✅ | 100% | Agent-1 | Live in production |
| Shared Types | ✅ | 100% | Agent-1 | types/index.ts ready |
| Database Schema | ✅ | 100% | Claude | Updated with real Norwegian shareholders |
| Backend API | ✅ | 100% | Claude | All routes + missing endpoints fixed |
| Frontend Components | ✅ | 100% | Claude | All 13 components created |
| Tab Navigation | ✅ | 100% | Claude | Both dashboards with tabs |
| Authentication | ✅ | 100% | Agent-1 | JWT implemented |
| User Levels | ✅ | 100% | Agent-1 | Blur effect working |
| Shareholder CRUD | ✅ | 100% | Claude | Forms and lists integrated |
| Emission System | ✅ | 100% | Claude | Complete workflow |
| CI/CD Pipeline | ✅ | 100% | Agent-1 | GitHub Actions ready |
| Component Integration | ✅ | 100% | Claude | All components connected |
| NPM Dependencies | ✅ | 100% | Claude | All packages installed |
| Testing | ✅ | 100% | Claude | System fully tested and operational |
| Real Shareholder Data | ✅ | 100% | Claude | 30 Norwegian shareholders imported |
| Test Accounts | ✅ | 100% | Claude | 4 test users for all access levels |
| **TOTAL** | **✅** | **100%** | - | PRODUCTION READY! |

---

## 🎯 PROJECT OVERVIEW

**Hva er dette?**  
En forenklet aksje-emisjonsplattform hvor selskaper kan utstede nye aksjer og investorer kan tegne seg. Systemet har streng tilgangskontroll med nivåbasert synlighet.

**Hovedfunksjoner:**
- 🔐 Felles innlogging for alle (admin/user)
- 📊 30 ekte norske aksjonærer (127,640 totale aksjer)
- 💰 Emisjoner hvor level 3 users kan tegne
- 🎚️ 3-nivå system med blur effect
- ✅ Admin godkjenning før aksjer tildeles

---

## 🏗️ EXACT FOLDER STRUCTURE

```
/Users/kristianlokken/Desktop/oblinor-simple/
├── CLAUDE_SIMPLE.md         # This file
├── backend/
│   ├── src/
│   │   ├── server.ts        # Express server, port 4001
│   │   ├── db.ts           # PostgreSQL connection
│   │   ├── auth.ts         # JWT middleware
│   │   ├── types.ts        # Backend types
│   │   └── routes/
│   │       ├── auth.ts     # Login/register endpoints
│   │       ├── users.ts    # User management
│   │       ├── shareholders.ts # Shareholder CRUD
│   │       └── emissions.ts # Emissions + subscriptions
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── api.ts
│   │   ├── types.ts
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── UserDashboard.tsx
│   │   │   └── AdminDashboard.tsx
│   │   └── components/
│   │       ├── Layout.tsx
│   │       ├── Sidebar.tsx
│   │       ├── BlurredContent.tsx
│   │       ├── ShareholderList.tsx
│   │       ├── ShareholderForm.tsx
│   │       ├── EmissionList.tsx
│   │       ├── EmissionView.tsx
│   │       ├── EmissionForm.tsx
│   │       ├── SubscriptionForm.tsx
│   │       ├── SubscriptionList.tsx
│   │       └── UserManagement.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── index.html
├── types/
│   ├── index.ts
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
├── README.md
├── package.json
└── railway.json
```

---

## 🔐 ACCESS CONTROL SYSTEM

```typescript
// STRICT VALIDATION - NO EXCEPTIONS!
USER Level 1  → Everything blurred (no access)
USER Level 2  → Can see shareholders list only
USER Level 3  → Full access + can subscribe to emissions

ADMIN Level 1 → Basic admin functions
ADMIN Level 2 → Full control + approve subscriptions
```

**Database constraint:**
```sql
CONSTRAINT valid_level CHECK (
    (role = 'USER' AND level IN (1, 2, 3)) OR 
    (role = 'ADMIN' AND level IN (1, 2))
)
```

---

## 📊 DATABASE SCHEMA (PostgreSQL)

```sql
-- Table 1: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL CHECK (role IN ('USER', 'ADMIN')),
    level INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_level CHECK (
        (role = 'USER' AND level IN (1, 2, 3)) OR 
        (role = 'ADMIN' AND level IN (1, 2))
    )
);

-- Table 2: shareholders
CREATE TABLE shareholders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    shares_owned INTEGER NOT NULL DEFAULT 0 CHECK (shares_owned >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 3: emissions
CREATE TABLE emissions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    presentation_material TEXT,
    shares_before INTEGER NOT NULL CHECK (shares_before >= 0),
    new_shares_offered INTEGER NOT NULL CHECK (new_shares_offered > 0),
    shares_after INTEGER GENERATED ALWAYS AS (shares_before + new_shares_offered) STORED,
    price_per_share DECIMAL(10,2) NOT NULL CHECK (price_per_share > 0),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL CHECK (end_date >= start_date),
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'ACTIVE', 'COMPLETED')),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 4: emission_subscriptions
CREATE TABLE emission_subscriptions (
    id SERIAL PRIMARY KEY,
    emission_id INTEGER REFERENCES emissions(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    shares_requested INTEGER NOT NULL CHECK (shares_requested > 0),
    shares_allocated INTEGER DEFAULT 0 CHECK (shares_allocated >= 0),
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    approved_by INTEGER REFERENCES users(id),
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(emission_id, user_id)
);
```

---

## 🎨 DESIGN SYSTEM - ONLY TWO COLORS!

```typescript
// CRITICAL: NO OTHER COLORS ALLOWED!
const colors = {
  primary: '#123543',    // Dark teal
  secondary: '#fcfbfa',  // Off-white
};

// Sidebar (250px width, fixed)
const sidebarStyle = {
  width: '250px',
  height: '100vh',
  backgroundColor: '#123543',
  color: '#fcfbfa',
  padding: '20px',
  position: 'fixed',
  left: 0,
  top: 0
};

// Blur effect for insufficient level
const blurStyle = {
  filter: 'blur(5px)',
  pointerEvents: 'none',
  userSelect: 'none',
  position: 'relative'
};

// Content area
const contentStyle = {
  marginLeft: '250px',
  padding: '20px',
  backgroundColor: '#fcfbfa',
  minHeight: '100vh',
  color: '#123543'
};
```

---

## 🚀 API ENDPOINTS

| Method | Endpoint | Access | Purpose |
|--------|----------|--------|---------|
| POST | /auth/login | Public | Login with email/password |
| POST | /auth/register | Public | Register new user (level 1) |
| GET | /auth/me | Protected | Get current user |
| GET | /users | Admin only | List all users |
| PATCH | /users/:id/level | Admin only | Change user level |
| GET | /shareholders | Level 2+ | List shareholders |
| POST | /shareholders | Admin only | Add shareholder |
| PUT | /shareholders/:id | Admin only | Edit shareholder |
| DELETE | /shareholders/:id | Admin only | Delete shareholder |
| GET | /emissions | All users | List emissions |
| GET | /emissions/:id | Level 3 full | Get emission details |
| POST | /emissions | Admin only | Create emission |
| PUT | /emissions/:id | Admin only | Edit emission |
| DELETE | /emissions/:id | Admin only | Delete emission |
| POST | /emissions/:id/subscribe | Level 3 only | Subscribe to emission |
| GET | /emissions/:id/subscriptions | Admin only | List subscriptions |
| PATCH | /emissions/:id/subscriptions/:subId | Admin only | Approve/reject subscription |

---

## 🔄 EMISSION WORKFLOW

```mermaid
1. Admin creates emission (DRAFT)
   ↓
2. Admin publishes (ACTIVE)
   ↓
3. Level 3 users subscribe
   ↓
4. Admin reviews & allocates shares
   ↓
5. Admin approves → Auto-update shareholder.shares_owned
   ↓
6. Emission completed (COMPLETED)
```

---

## 📦 SHARED TYPES (types/index.ts)

```typescript
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  level: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Shareholder {
  id: number;
  user_id: number | null;
  name: string;
  email: string;
  shares_owned: number;
  created_at: string;
  updated_at: string;
}

export interface Emission {
  id: number;
  title: string;
  description: string;
  presentation_material: string;
  shares_before: number;
  new_shares_offered: number;
  shares_after: number;
  price_per_share: number;
  start_date: string;
  end_date: string;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED';
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface EmissionSubscription {
  id: number;
  emission_id: number;
  user_id: number;
  shares_requested: number;
  shares_allocated: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approved_by: number | null;
  approved_at: string | null;
  created_at: string;
}
```

---

## 👥 TEST ACCOUNTS & REAL DATA

### Test Users (For Development & Testing)
```
Admin Level 2: admin@oblinor.no / Admin123!     (Full control)
Admin Level 1: admin1@oblinor.no / Admin123!    (Basic admin)
User Level 3:  user3@oblinor.no / Pass123!      (Can subscribe, owns 200 shares)
User Level 2:  user2@oblinor.no / Pass123!      (View only, owns 200 shares)
```

### Real Norwegian Shareholders (30 total = 127,640 shares)
**Top 5 Shareholders:**
1. Kristian Gjerde Løkken - 90,000 shares (70.51%)
2. Cream Holding AS - 11,676 shares (9.15%)
3. Hewa Mohammed Rasull - 10,000 shares (7.83%)
4. Thom & Co AS - 2,500 shares (1.96%)
5. Karl Steinar Nord - 2,000 shares (1.57%)

Plus 25 additional shareholders with 200-1,000 shares each.

---

## ⚡ QUICK COMMANDS

```bash
# 🚨 LIVE-ONLY SYSTEM - NO LOCAL DEVELOPMENT

# Make changes directly in code editor, then push to live system
cd /Users/kristianlokken/Desktop/oblinor-simple
git add .
git commit -m "Your changes"
git push

# Railway automatically deploys to LIVE production system
# Real users see changes immediately!
open https://oblinor-simple.up.railway.app/

# Database structure & functions (connects to LIVE database)
node check_db.js           # Live database overview  
node debug_tables.js        # Detailed schema
```

### 🗄️ DATABASE QUICK REFERENCE

**12 tables:** users, shareholders, emissions, trades, holdings, audit  
**24 functions:** apply_emission(), cap_table_at(), request_trade(), assert_is_admin()  
**Live data:** 30 shareholders, 127,640 shares, active Serie B emission  
**⚠️ WARNING:** Live PostgreSQL database with real investor data  

*Full database documentation in Agent-backend.md section "KOMPLETT DATABASE STRUKTUR & FUNKSJONALITET"*

---

## 🚦 CRITICAL CHECKPOINTS

1. ✅ **Ports:** Backend 4001, Frontend 5174 (NOT 3001/5173!)
2. ✅ **Colors:** ONLY #123543 and #fcfbfa
3. ✅ **User Levels:** 1-3 for USER, 1-2 for ADMIN
4. ✅ **Blur:** 5px filter for insufficient level
5. ✅ **Sidebar:** Exactly 250px width
6. ✅ **JWT:** 24 hours expiry
7. ✅ **Shareholders:** 30 in seed data, all level 1
8. ✅ **Unique:** (emission_id, user_id) constraint
9. ✅ **Auto-update:** shares_owned on approval
10. ✅ **Password:** bcrypt with 10 rounds

---

## 🔧 NPM DEPENDENCIES

### Backend (package.json)
```json
{
  "name": "oblinor-simple-backend",
  "version": "1.0.0",
  "dependencies": {
    "express": "4.18.2",
    "cors": "2.8.5",
    "pg": "8.11.3",
    "bcrypt": "5.1.1",
    "jsonwebtoken": "9.0.2",
    "dotenv": "16.3.1"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/cors": "2.8.17",
    "@types/pg": "8.10.9",
    "@types/bcrypt": "5.0.2",
    "@types/jsonwebtoken": "9.0.5",
    "@types/node": "20.10.5",
    "typescript": "5.3.3",
    "ts-node-dev": "2.0.0"
  }
}
```

### Frontend (package.json)
```json
{
  "name": "oblinor-simple-frontend",
  "version": "1.0.0",
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-router-dom": "6.20.1",
    "axios": "1.6.2"
  },
  "devDependencies": {
    "@types/react": "18.2.45",
    "@types/react-dom": "18.2.18",
    "@vitejs/plugin-react": "4.2.1",
    "typescript": "5.3.3",
    "vite": "5.0.10"
  }
}
```

---

## 🚀 DEPLOYMENT READY

### Railway Deployment
**🌐 PRODUCTION URL:** https://oblinor-simple-production.up.railway.app

The system is ready for Railway deployment with:
- Frontend: Uses `serve` for production build
- Backend: Production-ready Express server
- Database: Can use Railway PostgreSQL or external DB

### Environment Variables Needed:
```
# Backend (.env)
DATABASE_URL=postgresql://[connection_string]
JWT_SECRET=[min-32-chars]
NODE_ENV=production
PORT=4001

# Frontend (.env)
VITE_API_URL=https://[backend-url]
```

### Database Migration:
Production DB is already populated with real Norwegian shareholder data via Railway.

---

## 📝 AGENT INSTRUCTIONS

**FOR ALL AI AGENTS:**

1. **READ THIS FIRST** - This file is the single source of truth
2. **UPDATE PROGRESS** - Edit the progress table after each task
3. **FOLLOW EXACT SPECS** - Ports, colors, levels are non-negotiable
4. **TEST EVERYTHING** - Verify blur effect, level access, auto-updates
5. **NO EXTRA COLORS** - Only #123543 and #fcfbfa allowed
6. **USE EXACT PORTS** - Backend 4001, Frontend 5174
7. **MAINTAIN STRUCTURE** - Don't deviate from folder structure
8. **UPDATE THIS FILE** - Mark ✅ and % when tasks complete

### Progress Update Example:
```markdown
| Railway Deployment | ✅ | 100% | Agent-123 | Live in production |
```

---

## 🎯 SUCCESS CRITERIA

- [x] Admin login works (admin@oblinor.no)
- [x] 30 shareholders visible (level 2+ users) - Real Norwegian data
- [x] Level 1 users see everything blurred
- [x] Level 2 users see shareholders only
- [x] Level 3 users can subscribe to emissions
- [x] Admin can create/edit emissions
- [x] Admin can approve subscriptions
- [x] Shares auto-update on approval
- [x] Railway deployment live and ready
- [x] Only two colors used everywhere (#123543 and #fcfbfa)
- [x] Ports 4001 and 5174 working
- [x] Real shareholder data imported (30 Norwegian shareholders)
- [x] 4 test accounts for all access levels

---

## 🔄 LAST UPDATED

| Date | Time | By | Changes |
|------|------|-----|---------|
| 2025-01-05 | 13:15 | Claude | Initial creation, 8% complete |
| 2025-01-05 | 13:30 | Claude | CLAUDE_SIMPLE.md created, folder structure initiated, 15% complete |
| 2025-01-05 | 14:00 | Agent-1 | Backend, database, and most frontend components created, 75% complete |
| 2025-01-05 | 14:30 | Claude | Added 5 missing frontend components, system 85% complete |
| 2025-01-05 | 16:30 | Claude | Fixed password hashes, system tested and working, 95% complete |
| 2025-09-05 | 18:00 | Claude | Deployed to Railway with real Norwegian shareholders, 100% COMPLETE |

---

**📌 REMEMBER:** Update this file after every task completion!