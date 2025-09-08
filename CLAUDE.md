# CLAUDE.md - Oblinor Emisjon Platform Documentation

**📍 SINGLE SOURCE OF TRUTH FOR ALL AI AGENTS**  
**⚡ STATUS:** Production Live on Railway | **🎯 TARGET:** Norwegian share emission platform  
**🔗 LIVE:** https://oblinor-simple.up.railway.app  
**Last Updated:** 2025-09-07 Agent 4 Enhanced Responsive System Implementation Complete

---

## 🚀 DEPLOYMENT STATUS

**Railway Production:**
- **Frontend/Backend:** Single service on Railway (monorepo)
- **Database:** PostgreSQL on Railway (external connection allowed)
- **Domain:** oblinor-simple.up.railway.app
- **SSL:** Automatic HTTPS via Railway

## ⚠️ IMPORTANT: CORRECT PRODUCTION URL

**🎯 ALWAYS USE THIS URL FOR PRODUCTION:**
```
https://oblinor-simple.up.railway.app
```

**❌ DO NOT USE (502 error):**
```
https://oblinor-simple-production.up.railway.app  ← This URL does not work!
```

**📍 URL CONFUSION PREVENTION:**
- Only ONE Railway service is active and working
- Always refer to CLAUDE.md or README.md for correct URL
- If you see 502 Bad Gateway, you're using the wrong URL
- Test collapsed sidebar on the CORRECT URL above

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

## 🚨 CRITICAL: LIVE-ONLY PRODUCTION SYSTEM

### ⚠️ NO LOCAL DEVELOPMENT - LIVE SYSTEM ONLY

**🚨 ADVARSEL:** Dette er et **LIVE produksjonssystem** med reelle brukere!

#### **LIVE PRODUKSJON** 🌐
- **URL:** https://oblinor-simple.up.railway.app/
- **Database:** Live PostgreSQL med ekte data (30 aksjonærer, 127,640 aksjer)  
- **Brukere:** Reelle norske investorer bruker systemet daglig
- **Endringer:** Går direkte live til reelle brukere

### 🔄 LIVE-ONLY Deployment Workflow

```bash
# ADVARSEL: Alle endringer går direkte til produksjon!

# 1. Make code changes in your editor
# 2. Push directly to live system
git add .
git commit -m "Your changes"
git push

# 3. Railway deploys immediately to LIVE system
# 4. Real users see changes instantly
open https://oblinor-simple.up.railway.app/
```

### 🚨 INGEN LOKAL UTVIKLING
- **Ingen localhost** - Alt skjer på live system
- **Ingen development miljø** - Kun produksjon  
- **Ingen test-database** - Live data med reelle investorer
- **Test grundig** før push - reelle brukere påvirkes umiddelbart

**Railway Deployment:**
1. Uses single service serving both API and frontend
2. Frontend built with empty VITE_API_URL for relative paths
3. Backend serves frontend from dist/ folder
4. Environment variables set via Railway dashboard

**Production Database:**
All data is already migrated and live on Railway. No local database files needed.

---

## 🎨 DESIGN SYSTEM

**🎯 CENTRALIZED THEME SYSTEM (MANDATORY):**
ALL components MUST use the centralized THEME constants from `frontend/src/constants/theme.ts`:

```typescript
import { THEME } from '../constants/theme';

// ✅ CORRECT - Always use THEME constants
backgroundColor: THEME.colors.primary,
color: THEME.colors.background,
borderRadius: THEME.spacing.borderRadius,
transition: THEME.transitions.default

// ❌ FORBIDDEN - Never hardcode colors
backgroundColor: '#123543',
color: '#fcfbfa'
```

**THEME Structure:**
```typescript
THEME.colors = {
  primary: '#123543',      // Dark Teal - Main brand color
  background: '#fcfbfa',   // Off-White - Main background  
  error: '#ff6b6b',        // Red - Error states
  success: '#4CAF50',      // Green - Success states
  info: '#2196F3',         // Blue - Info states
  warning: '#FF9800'       // Orange - Warning states
}
THEME.spacing = {
  borderRadius: '8px',     // Consistent rounded corners
  touchTarget: '44px',     // Mobile touch targets
  sidebarWidth: '250px'    // Desktop sidebar width
}
THEME.transitions = {
  default: 'all 0.2s ease',
  sidebar: 'left 0.3s ease'
}
```

**Component Standards:**
- THEME.spacing.borderRadius (8px) for all rounded corners
- THEME.transitions.default (0.2s) for smooth interactions
- 5px blur for restricted content
- Consistent spacing from THEME.spacing

## 📱 MOBILE RESPONSIVE SYSTEM

**CRITICAL: Platform is now fully mobile-optimized using Inline React Styles**

**Responsive Breakpoints:**
- **Mobile:** < 768px (Mobile-first design)
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

**Inline Styles Architecture:**
- **Dynamic React Styles:** All styling done with React CSSProperties objects
- **Responsive Breakpoints:** Using `window.innerWidth <= 768px` conditionals
- **Mobile-First Approach:** Styles adapt dynamically based on screen width

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

**AGENT 4's ENHANCED RESPONSIVE SYSTEM (MANDATORY):**
```typescript
import { THEME, getResponsive, getResponsiveTypography, getResponsiveSpacing, ALPHA_COLORS } from '../constants/theme';

// AGENT 4's EXACT REQUIREMENT: { isMobile, isTablet, isDesktop } destructuring WITHOUT hooks
const { isMobile, isTablet, isDesktop } = getResponsive();

// AGENT 4's FEATURES:
// - RAF-enhanced caching for 60fps performance during resize
// - Smart 100ms cache + 10px width threshold (prevents micro-adjustments)
// - Tablet breakpoint (768-1024px) for granular responsive control
// - Systematic ALPHA_COLORS for rgba cleanup

// All styling MUST use AGENT 4's enhanced systems
const buttonStyle: React.CSSProperties = {
  backgroundColor: THEME.colors.primary,
  color: THEME.colors.background,
  borderRadius: THEME.spacing.borderRadius,
  transition: THEME.transitions.default,
  padding: getResponsiveSpacing('16px', '12px'),
  minHeight: THEME.spacing.touchTarget
};

// AGENT 4's TYPOGRAPHY SYSTEM:
const titleStyle = getResponsiveTypography('h1');

// AGENT 4's ALPHA COLOR SYSTEM:
backgroundColor: ALPHA_COLORS.primary.light,  // 10% primary tint
backgroundColor: ALPHA_COLORS.background.strong,  // 30% background emphasis
```

**MANDATORY for NEW Components:**
1. Import THEME from '../constants/theme' - NO EXCEPTIONS
2. Use inline React styles with CSSProperties typing  
3. Implement responsive with `isMobile()` helper or `window.innerWidth <= THEME.breakpoints.mobile`
4. Use THEME constants for ALL colors, spacing, transitions
5. Implement minimum THEME.spacing.touchTarget (44px) for mobile
6. Test responsive behavior on mobile viewport (< 768px)
7. Ensure table data converts to cards on mobile using conditional rendering
8. NEVER hardcode #123543 or #fcfbfa - always use THEME.colors

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

---

## 🗄️ DATABASE STRUKTUR & FUNKSJONALITET

**🎯 PRODUKSJONS-URL:** https://oblinor-simple.up.railway.app/  
**🔍 TILKOBLING:** `node check_db.js` for live databasestruktur

### 📊 LIVE DATA (oppdatert daglig)
- **12 tabeller** - bruker, aksjonærer, emisjoner, handel, audit
- **24 business functions** - emisjonstyring, handel, cap table, sikkerhet
- **4 triggers** - auto-allokering, timestamp updates
- **30 aksjonærer** - 127,640 totale aksjer
- **Aktiv emisjon** - Serie B (20,000 nye aksjer)

### 🔧 KRITISKE FUNKSJONER
```bash
# Database struktur og funksjoner
node check_db.js           # Live tabellstruktur 
node debug_tables.js        # Detaljert schema
node create_history_table.js # Historikk-setup
```

### 📋 BUSINESS LOGIC OVERSIKT
- **Emisjoner:** `apply_emission()`, `approve_emission()`, `ui_create_emission_draft()`
- **Handel:** `request_trade()`, `apply_trade()`, `approve_trade_request()`  
- **Cap Table:** `cap_table_at()`, `apply_share_transfer()`, `apply_stock_split()`
- **Sikkerhet:** `assert_is_admin()`, `assert_level_at_least()`

*For komplett database-dokumentasjon, se [Agent-backend.md](./Agent-backend.md) seksjon "KOMPLETT DATABASE STRUKTUR & FUNKSJONALITET"*

**Known Issues:**
- No email notifications (manual process)
- No payment integration (manual verification)
- No bulk operations for subscriptions

---

## 📚 RELATED FILES

- `README.md` - User-facing documentation with THEME system guide
- `backend/` - Express.js API with all routes
- `frontend/` - React application
- `types/` - Shared TypeScript definitions

---

## 🔄 RECENT UPDATES

**2025-09-07 - Agent 4 Enhanced Responsive System Implementation:**
1. ✅ **AdminDashboard Mobile Fix** - Resolved critical mobile typography inconsistency  
2. ✅ **RAF-Enhanced Responsive System** - getResponsive() with RAF optimization for 60fps performance
3. ✅ **Hook-Free Destructuring** - `{ isMobile, isTablet, isDesktop }` pattern delivered (Agent 4's core requirement)
4. ✅ **Tablet Breakpoint Added** - Granular 768-1024px responsive control for iPad/small laptops
5. ✅ **Systematic ALPHA_COLORS** - ALPHA_COLORS.primary.light replaces hardcoded rgba values
6. ✅ **7 Components Migrated** - All window.innerWidth patterns → cached getResponsive()
7. ✅ **Performance Optimization** - Smart caching + width threshold prevents micro-adjustments
8. ✅ **Complete Typography System** - RESPONSIVE_TYPOGRAPHY with getResponsiveTypography()
9. ✅ **Production Safety** - Zero breaking changes, backward compatible with Agent 1's foundation

**2025-09-06 - Mobile Responsive Implementation:**
1. ✅ **Complete Mobile Optimization** - Platform now fully responsive
2. ✅ **Inline Styles Architecture** - Mobile-first responsive design with window.innerWidth
3. ✅ **Collapsible Sidebar** - Hamburger menu for mobile navigation
4. ✅ **Touch-Optimized Forms** - 44px touch targets throughout
5. ✅ **Dual-Layout Tables** - ShareholderList/SubscriptionList convert to cards on mobile
6. ✅ **Mobile-First Components** - All components now mobile-responsive with 768px breakpoint
7. ✅ **Premium Mobile Experience** - Avatar cards, ownership bars, enhanced UX

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