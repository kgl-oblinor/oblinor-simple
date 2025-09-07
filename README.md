# Oblinor Simple - Emission Platform

🌐 **LIVE SYSTEM:** https://oblinoremisjonrailway-production.up.railway.app/

A fully functional share emission platform where companies can issue new shares and investors can subscribe to them. Features real Norwegian shareholder data and strict level-based access control with blur effects.

## 🎯 What is this?

Oblinor Simple is a **simplified emission platform** designed for private companies conducting digital capital raises. The system replaces manual Excel-based processes with a structured, secure, and transparent solution.

### Key Features:
- **Level-based access control** with blur effects for restricted content
- **30 real Norwegian shareholders** (127,640 total shares) 
- **Active emission system** where qualified users can subscribe
- **Admin approval workflow** with automatic share allocation
- **Secure authentication** and role management
- **Mobile-optimized responsive design** with smart caching system
- **Hook-free responsive patterns** with mathematical breakpoint precision

## 🔐 User Access System

The platform uses a strict **5-level access control**:

```
USER Level 1  → Everything blurred (default for new users)
USER Level 2  → Can view shareholders list only  
USER Level 3  → Full access + can subscribe to emissions

ADMIN Level 1 → Basic admin functions
ADMIN Level 2 → Full control + approve subscriptions
```

## 🚀 How to Use the Platform

### 1. Access the System
Visit: **https://oblinoremisjonrailway-production.up.railway.app/**

### 2. Test Accounts Available
- **Admin (Full Control)**: `admin@oblinor.no` / `Admin123!`
- **Admin (Basic)**: `admin1@oblinor.no` / `Admin123!`  
- **User (Can Subscribe)**: `user3@oblinor.no` / `Pass123!`
- **User (View Only)**: `user2@oblinor.no` / `Pass123!`

### 3. User Experience by Level

#### Level 1 Users (New/Restricted)
- All content appears blurred with "Level X required" messages
- Cannot access any functionality until admin upgrades access

#### Level 2 Users (Shareholders List Access)
- Can view complete list of all 30 shareholders
- Can see share distribution and ownership percentages  
- Cannot access emission details or subscribe

#### Level 3 Users (Full Access)  
- Can view all shareholders
- Can read full emission details and presentation materials
- Can subscribe to active emissions
- Receive confirmation of subscription status

#### Admin Users
- **Level 1:** Basic user management functions
- **Level 2:** Full system control, can approve subscriptions, manage emissions

## 📊 Real Data Included

### Norwegian Shareholders (30 total)
- **127,640 total shares** across real Norwegian investors
- **Largest shareholder:** Kristian Gjerde Løkken (90,000 shares, 70.51%)
- **Complete ownership registry** with real names and email addresses

### Active Emission
- **Title:** Oblinor Serie B - Vekstkapital  
- **New shares offered:** 20,000 shares
- **Price per share:** 222 NOK
- **Total raise:** 4,440,000 NOK
- **Period:** October 1 - November 30, 2025

## 🔄 Emission Process

1. **Admin creates emission** (DRAFT status)
2. **Admin publishes** (ACTIVE status)
3. **Level 3 users can subscribe** with desired number of shares
4. **Admin reviews subscriptions** and allocates shares
5. **Admin approves** → System automatically updates shareholder ownership
6. **Emission completed** (COMPLETED status)

## 🎨 Design System

**🎨 THEME Constants System (MANDATORY for New Components):**
All new components MUST use the centralized THEME constants from `frontend/src/constants/theme.ts`:

```typescript
import { THEME } from '../constants/theme';

// ✅ Correct - Use THEME constants
backgroundColor: THEME.colors.primary,
color: THEME.colors.background,
padding: window.innerWidth <= THEME.breakpoints.mobile ? '15px' : '20px'

// ❌ Wrong - Never hardcode colors
backgroundColor: '#123543',
color: '#fcfbfa'
```

**Expanded Color Palette:**
- **Primary:** `THEME.colors.primary` (#123543 - Dark Teal)
- **Background:** `THEME.colors.background` (#fcfbfa - Off-White)
- **Semantic Colors:** error, success, info, warning (for status badges)

**📱 Mobile-First Responsive Design (MANDATORY):**
- **Mobile Breakpoint:** `window.innerWidth <= 768px` - use THEME.breakpoints.mobile
- **Touch Targets:** Minimum 44px for all interactive elements (iOS/Android standards)
- **Reference Pattern:** `SubscriptionForm.tsx` - perfect mobile responsive implementation
- **Dual-Layout Pattern:** Tables convert to premium cards on mobile
- **Mobile Navigation:** Collapsible sidebar with hamburger menu

**🏆 Reference Components for Future AI Agents:**
- **SubscriptionForm.tsx** - Mobile form pattern with responsive grid layouts
- **Sidebar.tsx** - Mobile hamburger navigation pattern  
- **ShareholderList.tsx** - Table-to-cards responsive transformation
- **THEME constants** - Centralized design system

**Accessibility & UX Features:**
- 5px blur effect for restricted content
- 44px minimum touch targets (mandatory)
- Responsive typography scaling
- Mobile-first component design

## 🏗️ Technical Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and production builds
- **Axios** for API communication
- **React Router** for navigation

### Backend  
- **Express.js** with TypeScript
- **PostgreSQL** database with real data
- **JWT authentication** (24-hour expiry)
- **bcrypt** password hashing

### Security
- Database-level access constraints
- JWT token validation on all protected routes
- Role and level verification for all operations
- Secure password hashing with salt rounds

## 🔧 For Developers

### Two Ways to Run the System

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

### 🔄 Local Development Setup

**REQUIRED: Create Environment Files**
```bash
# 1. Backend environment file
# Create: backend/.env
DATABASE_URL=postgresql://postgres:iuzakIAZhFviojhSMiTFfbgdnIAFRWGJ@hopper.proxy.rlwy.net:42209/railway
JWT_SECRET=oblinor-local-dev-jwt-secret-change-in-production
NODE_ENV=development
PORT=4001

# 2. Frontend environment file  
# Create: frontend/.env
VITE_API_URL=http://localhost:4001
```

### 🔄 Typical Development Workflow

```bash
# 1. Ensure environment files exist (see above)
# 2. Develop locally on your machine
cd backend && npm run dev    # Local backend
cd frontend && npm run dev   # Local frontend

# 3. Test changes on localhost
open http://localhost:5175

# 4. Push to GitHub when satisfied
git push

# 5. Railway automatically updates production
# Users see changes on https://oblinoremisjonrailway-production.up.railway.app/
```

### AI Agent Documentation
- [CLAUDE.md](./CLAUDE.md) - Primary AI agent instructions
- [CLAUDE_SIMPLE.md](./CLAUDE_SIMPLE.md) - Compact AI reference  
- [CLAUDE_SIMPLE_DETAILED.md](./CLAUDE_SIMPLE_DETAILED.md) - Comprehensive technical guide

## 📈 Success Metrics

The platform successfully demonstrates:
- ✅ Secure multi-level access control
- ✅ Real Norwegian shareholder data (30 shareholders)
- ✅ Functional emission subscription workflow  
- ✅ Admin approval and automatic share allocation
- ✅ Responsive blur effects for access control
- ✅ Production-ready Railway deployment
- ✅ Consistent two-color design system
- ✅ **Full mobile responsiveness** with 768px breakpoint
- ✅ **Premium mobile experience** with avatar cards and ownership bars
- ✅ **TypeScript type safety** throughout the application
- ✅ **Local development setup** documented and working

## 📞 Support & Contact

- **Live System:** https://oblinoremisjonrailway-production.up.railway.app/
- **Source Code:** https://github.com/kgl-oblinor/oblinor-simple
- **Issues:** Report via GitHub Issues

---

**Built for Oblinor AS** | **Powered by Railway** | **Production Ready** | **Agent1 Responsive System Implemented**

---

## 🎯 Latest Updates

**2025-09-07 - Agent 4 Enhanced Responsive System:**
- ✅ Fixed AdminDashboard mobile typography inconsistency
- ✅ Implemented RAF-enhanced responsive system with 60fps performance
- ✅ Added hook-free `{ isMobile, isTablet, isDesktop }` destructuring pattern (Agent 4's core requirement)
- ✅ Migrated 7 components from window.innerWidth → cached getResponsive()
- ✅ Added tablet breakpoint (768-1024px) for granular responsive control
- ✅ Implemented systematic ALPHA_COLORS for rgba cleanup
- ✅ Complete RESPONSIVE_TYPOGRAPHY system with getResponsiveTypography()
- ✅ Zero breaking changes - builds on Agent 1's foundation
- ✅ Production-ready with immediate Railway deployment