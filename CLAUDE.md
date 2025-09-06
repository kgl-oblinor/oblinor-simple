# CLAUDE.md - Oblinor Emisjon Platform Documentation

**📍 SINGLE SOURCE OF TRUTH FOR ALL AI AGENTS**  
**⚡ STATUS:** Production Live on Railway | **🎯 TARGET:** Norwegian share emission platform  
**🔗 LIVE:** https://oblinoremisjonrailway-production.up.railway.app  
**Last Updated:** 2025-09-06 Mobile Responsive Update

---

## 🚀 DEPLOYMENT STATUS

**Railway Production:**
- **Frontend/Backend:** Single service on Railway (monorepo)
- **Database:** PostgreSQL on Railway (external connection allowed)
- **Domain:** oblinoremisjonrailway-production.up.railway.app
- **SSL:** Automatic HTTPS via Railway

---

## 📊 CURRENT DATABASE STATE

**Users (33 total):**
- 1 Admin account (admin@oblinor.no)
- 2 Test users (user2@oblinor.no, user3@oblinor.no) 
- 30 Shareholder accounts (all real shareholders have user accounts)

**Shareholders (30 real Norwegian investors):**
- Total shares: 127,640
- Largest: Kristian Gjerde Løkken (90,000 shares, 70.51%)
- All shareholders have user accounts with level 1 access

**Active Emission:**
- Title: Oblinor Serie B - Vekstkapital
- New shares: 20,000
- Price per share: 222 NOK
- Total raise: 4,440,000 NOK
- Period: Oct 1 - Nov 30, 2025

---

## 🔑 ACCESS CREDENTIALS

**Admin Access:**
```
Email: admin@oblinor.no
Password: Admin123!
Level: Admin Level 2 (full control)
```

**Test Users:**
```
user2@oblinor.no / Pass123! (Level 2 - view only)
user3@oblinor.no / Pass123! (Level 3 - can subscribe)
```

**Shareholder Users (all have):**
```
Email: [their actual email]
Password: Oblinor2025!
Level: User Level 1 (everything blurred)
```

---

## 🏗️ TECHNICAL ARCHITECTURE

**Monorepo Structure:**
```
oblinor-simple/
├── backend/          # Express.js API + serves frontend in production
├── frontend/         # React SPA (built to backend/dist in production)
├── types/           # Shared TypeScript definitions
├── railway.json     # Railway deployment config
├── package.json     # Root monorepo scripts
└── README.md        # User documentation
```

**Key Technologies:**
- Backend: Express.js, TypeScript, JWT auth, bcrypt
- Frontend: React 18, Vite, TypeScript, Axios
- Database: PostgreSQL with triggers and constraints
- Deployment: Railway with Nixpacks

---

## 🔐 ACCESS CONTROL SYSTEM

**User Levels:**
```typescript
USER Level 1: Everything blurred (no functional access)
USER Level 2: Can view shareholders list only
USER Level 3: Full access + can subscribe to emissions

ADMIN Level 1: Basic admin functions
ADMIN Level 2: Full control + approve subscriptions
```

**Database Constraints:**
```sql
CONSTRAINT valid_level CHECK (
    (role = 'USER' AND level IN (1, 2, 3)) OR 
    (role = 'ADMIN' AND level IN (1, 2))
)
```

---

## 📝 IMPORTANT DEVELOPMENT NOTES

### 🔄 Two Ways to Run the System

#### 1. **Railway (Production)** 🌐
- Live production system on the internet
- URL: https://oblinoremisjonrailway-production.up.railway.app/
- Automatically updates when you push to GitHub
- Used by real users

#### 2. **Local (Development)** 💻  
- Runs on your own machine for development
- Backend: `localhost:4001` 
- Frontend: `localhost:5174`
- For testing and developing new features

### 🔄 Typical Development Workflow

```bash
# 1. Develop locally on your machine
cd backend && npm run dev    # Local backend
cd frontend && npm run dev   # Local frontend

# 2. Test changes on localhost
open http://localhost:5174

# 3. Push to GitHub when satisfied
git push

# 4. Railway automatically updates production
# Users see changes on https://oblinoremisjonrailway-production.up.railway.app/
```

**Railway Deployment:**
1. Uses single service serving both API and frontend
2. Frontend built with empty VITE_API_URL for relative paths
3. Backend serves frontend from dist/ folder
4. Environment variables set via Railway dashboard

**Production Database:**
All data is already migrated and live on Railway. No local database files needed.

---

## 🎨 DESIGN SYSTEM

**Strict Color Palette:**
- Primary: #123543 (Dark Teal)
- Background: #fcfbfa (Off-White)
- NO OTHER COLORS ALLOWED

**Component Standards:**
- 8px border radius
- 0.2-0.3s transitions
- 5px blur for restricted content
- Consistent spacing and typography

## 📱 MOBILE RESPONSIVE SYSTEM

**CRITICAL: Platform is now fully mobile-optimized using CSS Modules**

**Responsive Breakpoints:**
- **Mobile:** < 768px (Mobile-first design)
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

**CSS Architecture:**
- **Global CSS Variables:** `frontend/src/styles/globals.module.css`
- **Component CSS Modules:** Each component has `.module.css` file
- **Mobile-First Approach:** All styles start mobile, scale up

**Key Mobile Features:**
- **Collapsible Sidebar:** Hamburger menu on mobile, fixed sidebar on desktop
- **Touch-Optimized:** 44px minimum touch targets throughout
- **Responsive Tables:** Cards on mobile, tables on desktop (ShareholderList)
- **Adaptive Forms:** Full-width inputs, stacked buttons on mobile
- **Responsive Typography:** Scales from mobile to desktop

**Mobile Layout Rules:**
- Sidebar: Hidden on mobile, overlay menu with hamburger toggle
- Content: Full width on mobile, 250px left margin on desktop
- Tables: Convert to card layout or horizontal scroll on mobile
- Forms: Single column, full-width inputs with proper touch targets
- Buttons: Stack vertically on mobile, inline on desktop

**CSS Variables (Global):**
```css
:root {
  --color-primary: #123543;
  --color-background: #fcfbfa;
  --sidebar-width: 250px; /* Desktop only */
  --touch-target-min: 44px;
  --spacing-xs: 4px to --spacing-xxl: 40px;
  --border-radius: 8px;
  --transition: all 0.2s ease;
}
```

**MANDATORY for NEW Components:**
1. Create `.module.css` file with mobile-first breakpoints
2. Use global CSS variables for colors/spacing
3. Implement minimum 44px touch targets
4. Test on mobile viewport (< 768px)
5. Ensure table data converts to cards on mobile

**Component Mobile Status:**
- ✅ Layout.tsx - Responsive with sidebar toggle
- ✅ Sidebar.tsx - Mobile hamburger menu
- ✅ LandingPage.tsx - Mobile-optimized cards and typography  
- ✅ LoginPage.tsx - Touch-friendly forms
- ✅ UserDashboard.tsx - Mobile tab navigation
- ✅ ShareholderList.tsx - Mobile card layout
- ✅ SubscriptionForm.tsx - Mobile-optimized forms

---

## 🛠️ COMMON COMMANDS

**Railway Deployment:**
```bash
npx @railway/cli login
npx @railway/cli link
npx @railway/cli up
npx @railway/cli logs
```

**Build Commands:**
```bash
npm run install:all  # Install all dependencies
npm run build       # Build both frontend and backend
npm start          # Start production server
```

**Database Operations:**
```bash
# Connect to Railway DB
psql "postgresql://postgres:iuzakIAZhFviojhSMiTFfbgdnIAFRWGJ@hopper.proxy.rlwy.net:42209/railway"

# Common queries
SELECT * FROM users WHERE role = 'ADMIN';
SELECT COUNT(*) FROM shareholders;
SELECT * FROM emissions WHERE status = 'ACTIVE';
```

---

## ⚠️ CRITICAL INFORMATION

**Security:**
- JWT tokens expire after 24 hours
- Passwords hashed with bcrypt (10 rounds)
- Database-level constraints prevent privilege escalation
- CORS enabled for cross-origin requests

**Business Logic:**
- Shareholders can exist without user accounts
- Users can be linked to shareholders via email match
- Share allocation happens automatically via database triggers
- Emission subscriptions require admin approval

**Known Issues:**
- No email notifications (manual process)
- No payment integration (manual verification)
- No bulk operations for subscriptions
- No audit logging

---

## 📚 RELATED FILES

- `CLAUDE_SIMPLE.md` - Compact AI agent instructions
- `CLAUDE_SIMPLE_DETAILED.md` - Comprehensive technical reference  
- `README.md` - User-facing documentation
- `backend/` - Express.js API with all routes
- `frontend/` - React application
- `types/` - Shared TypeScript definitions

---

## 🔄 RECENT UPDATES

**2025-09-06 - Mobile Responsive Implementation:**
1. ✅ **Complete Mobile Optimization** - Platform now fully responsive
2. ✅ **CSS Modules Architecture** - Mobile-first responsive design system
3. ✅ **Collapsible Sidebar** - Hamburger menu for mobile navigation
4. ✅ **Touch-Optimized Forms** - 44px touch targets throughout
5. ✅ **Responsive Tables** - ShareholderList converts to cards on mobile
6. ✅ **Mobile-First Components** - All components now mobile-responsive
7. ✅ **Global Design Variables** - Consistent spacing and breakpoints

**2025-09-05 - Production Deployment:**
1. ✅ Deployed to Railway successfully
2. ✅ Imported 30 real Norwegian shareholders  
3. ✅ Created user accounts for all shareholders
4. ✅ Updated emission with real data (Serie B)
5. ✅ Fixed monorepo deployment (single service)
6. ✅ Database migrated and verified
7. ✅ All shareholders linked to user accounts

---

## 🎯 NEXT STEPS FOR PRODUCTION

1. **Email Integration:** Set up SendGrid/Postmark for notifications
2. **Payment Gateway:** Integrate Stripe or Vipps for payments
3. **Audit Logging:** Track all admin actions
4. **2FA:** Add two-factor authentication
5. **Backup Strategy:** Automated database backups
6. **Monitoring:** Set up error tracking (Sentry)
7. **Documentation:** API documentation with Swagger

---

**For AI Agents:** This file contains all critical information for understanding and working with the Oblinor platform. Always refer to this file first before making changes. The platform is LIVE in production - be careful with database operations!