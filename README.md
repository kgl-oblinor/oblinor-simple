# Oblinor Simple - Emission Platform

A simplified share emission platform where companies can issue new shares and investors can subscribe to them. The system features strict level-based access control with blur effects.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (if running without Docker)
- PostgreSQL (if running without Docker)

### Start with Docker (Recommended)
```bash
cd /Users/KristianGjerdeLokken/Desktop/oblinor-simple
docker-compose up -d
```

### Access the Application
- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:4001
- **Database**: PostgreSQL on localhost:5432

### Test Accounts
- **Admin (Level 2)**: admin@oblinor.no / admin123
- **User (Level 1)**: user1@example.com / user123

## 🏗️ Architecture

### Backend (Port 4001)
- Express.js + TypeScript
- PostgreSQL database
- JWT authentication (24h expiry)
- bcrypt password hashing

### Frontend (Port 5174)
- React 18 + TypeScript
- Vite build tool
- Axios for API calls
- Level-based blur effects

### Database
- PostgreSQL with seeded data
- 30+ shareholders with shares
- Sample emission data
- Automated triggers for share updates

## 🔐 Access Control System

```
USER Level 1  → Everything blurred (no access)
USER Level 2  → Can see shareholders list only  
USER Level 3  → Full access + can subscribe to emissions

ADMIN Level 1 → Basic admin functions
ADMIN Level 2 → Full control + approve subscriptions
```

## 🎨 Design System

**Colors** (STRICT - Only these two):
- Primary: `#123543` (Dark Teal)
- Secondary: `#fcfbfa` (Off-White)

**Blur Effect**: 5px blur + overlay for insufficient access levels

## 📊 Key Features

### For Users
- Level-based content visibility
- Blur effects for restricted content
- Shareholder list viewing (Level 2+)
- Emission subscription (Level 3+)

### For Admins
- User level management
- Shareholder CRUD operations
- Emission creation and management
- Subscription approval workflow

## 🔄 Emission Workflow

1. Admin creates emission (DRAFT)
2. Admin publishes (ACTIVE)  
3. Level 3 users subscribe
4. Admin reviews & allocates shares
5. Admin approves → Auto-update shareholder.shares_owned
6. Emission completed (COMPLETED)

## 🛠️ Development

### Manual Setup
```bash
# Backend
cd backend
npm install
npm run dev  # Port 4001

# Frontend  
cd frontend
npm install
npm run dev  # Port 5174

# Database
psql postgresql://oblinor_admin:SecretPassword123@localhost:5432/oblinor_simple
```

### API Endpoints
- `POST /auth/login` - Login
- `GET /shareholders` - List shareholders (Level 2+)
- `GET /emissions` - List emissions (All users)
- `POST /emissions/:id/subscribe` - Subscribe (Level 3+)
- `PATCH /users/:id/level` - Change user level (Admin only)

## 📝 Database Schema

- **users** - User accounts with role/level
- **shareholders** - Shareholder registry with shares
- **emissions** - Share emission events  
- **emission_subscriptions** - User subscriptions to emissions

## 🚦 Success Criteria

- [x] Admin login works (admin@oblinor.no)
- [x] 30 shareholders visible (level 2+ users)
- [x] Level 1 users see everything blurred
- [x] Level 2 users see shareholders only
- [x] Level 3 users can subscribe to emissions
- [x] Admin can create/edit emissions
- [x] Admin can approve subscriptions
- [x] Shares auto-update on approval
- [x] Docker Compose starts without errors
- [x] Only two colors used everywhere
- [x] Ports 4001 and 5174 working

## 📄 License

Private - Oblinor AS