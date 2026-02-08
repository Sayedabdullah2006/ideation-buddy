# 🚀 IdeaFlow AI - Setup Guide

## Phase 1: Database Schema & Folder Structure ✅

This guide will help you set up the IdeaFlow AI project from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **PostgreSQL** 14.x or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))
- **KIMI AI API Key** (Register at KIMI AI platform)

## Step 1: Database Setup

### Install PostgreSQL

1. Download and install PostgreSQL from the official website
2. During installation, remember your **postgres** user password
3. Default port is **5432**

### Create Database

```sql
-- Open psql terminal or pgAdmin
CREATE DATABASE ideaflow_db;
CREATE USER ideaflow_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE ideaflow_db TO ideaflow_user;
```

## Step 2: Project Setup

### Clone/Initialize Project

```bash
# Navigate to the project directory
cd /path/to/ideation-buddy

# Verify folder structure
ls -la
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

This will install all required packages including:
- Next.js 15
- Prisma ORM
- Shadcn UI components
- NextAuth.js
- React Query
- Zustand
- And more...

## Step 3: Environment Configuration

### Create .env file

```bash
cp .env.example .env
```

### Edit .env with your credentials

```env
# Database Connection
DATABASE_URL="postgresql://ideaflow_user:your_secure_password@localhost:5432/ideaflow_db?schema=public"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-command-below"

# KIMI AI API
KIMI_API_KEY="your-kimi-api-key-here"
KIMI_API_URL="https://api.kimi.ai/v1/chat/completions"
KIMI_MODEL="moonshot-v1-8k"

# Rate Limiting
AI_RATE_LIMIT_PER_USER=50
AI_RATE_LIMIT_WINDOW=86400

# Admin Credentials
ADMIN_EMAIL="admin@ideaflow.ai"
ADMIN_PASSWORD="change-this-password"

NODE_ENV="development"
```

### Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy the output and paste it into `NEXTAUTH_SECRET` in your .env file.

## Step 4: Database Initialization

### Generate Prisma Client

```bash
npm run prisma:generate
```

### Push Database Schema

```bash
npm run prisma:push
```

This will create all tables in your PostgreSQL database:
- users
- projects
- ai_generation_logs
- system_config

### Seed Database (Optional but Recommended)

```bash
npm run prisma:seed
```

This creates:
- ✅ Admin user (admin@ideaflow.ai / change-this-password)
- ✅ Demo user (demo@ideaflow.ai / demo123456)
- ✅ System configuration

## Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 6: Verify Installation

### Check Database Connection

```bash
npm run prisma:studio
```

This opens Prisma Studio at [http://localhost:5555](http://localhost:5555) where you can view your database tables.

### Verify Tables

You should see these tables:
- ✅ users (with admin and demo users if seeded)
- ✅ projects (empty initially)
- ✅ ai_generation_logs (empty initially)
- ✅ system_config (with default configs if seeded)

## Common Issues & Troubleshooting

### Issue 1: PostgreSQL Connection Error

**Error:** `Error: P1001: Can't reach database server`

**Solution:**
1. Ensure PostgreSQL service is running
2. Verify DATABASE_URL in .env
3. Check firewall settings for port 5432

### Issue 2: Prisma Client Not Found

**Error:** `Cannot find module '@prisma/client'`

**Solution:**
```bash
npm run prisma:generate
```

### Issue 3: Migration Errors

**Error:** `Migration engine error`

**Solution:**
```bash
# Reset database (WARNING: This deletes all data)
npx prisma migrate reset

# Or manually drop and recreate database
DROP DATABASE ideaflow_db;
CREATE DATABASE ideaflow_db;

# Then run:
npm run prisma:push
```

### Issue 4: Port 3000 Already in Use

**Solution:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or run on different port
PORT=3001 npm run dev
```

## Database Schema Overview

### Users Table
- **id**: Unique identifier (CUID)
- **email**: User email (unique)
- **password**: Hashed password (bcrypt)
- **role**: ADMIN or USER
- **status**: ACTIVE, INACTIVE, or SUSPENDED

### Projects Table
- **id**: Unique identifier
- **userId**: Foreign key to users
- **status**: Tracks Design Thinking progress (DRAFT → COMPLETED)
- **JSON fields**: personas, solutions, businessModel, mvpSpec

### AI Generation Logs Table
- **id**: Unique identifier
- **projectId**: Foreign key to projects
- **step**: Which Design Thinking step
- **prompt**: AI request (sanitized)
- **response**: AI response (sanitized)
- **tokensUsed**: KIMI API token consumption

## Next Steps

### Phase 2: Authentication System (Coming Next)

The next phase will implement:
- [ ] NextAuth.js configuration
- [ ] JWT-based authentication
- [ ] Role-based middleware
- [ ] Login/Register pages (RTL)
- [ ] Protected routes

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Open Prisma Studio
npm run prisma:studio

# Generate Prisma client
npm run prisma:generate

# Push schema changes
npm run prisma:push

# Create migration
npm run prisma:migrate

# Seed database
npm run prisma:seed
```

## Project Structure Explanation

```
ideation-buddy/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes (route groups)
│   ├── (dashboard)/       # Main application routes
│   ├── admin/             # Admin dashboard routes
│   ├── api/               # API endpoints
│   ├── globals.css        # Global styles with RTL support
│   └── layout.tsx         # Root layout (to be created in Phase 2)
│
├── components/            # React components
│   ├── ui/               # Shadcn UI primitives
│   ├── rtl/              # RTL-specific components
│   ├── wizard/           # Design Thinking wizard
│   ├── admin/            # Admin dashboard components
│   └── layout/           # Layout components
│
├── lib/                  # Core utilities
│   ├── auth/            # Authentication logic
│   ├── api/             # KIMI AI client
│   ├── utils/           # Helper functions
│   ├── prisma.ts        # Prisma client singleton
│   └── constants.ts     # App constants
│
├── prisma/              # Database
│   ├── schema.prisma    # Database schema ✅
│   ├── migrations/      # Migration files
│   └── seed/            # Seed scripts ✅
│
├── types/               # TypeScript definitions ✅
├── hooks/               # Custom React hooks
├── store/               # Zustand state management
├── public/              # Static assets
└── styles/              # Additional styles
```

## Security Checklist

- [x] Environment variables in .env (not committed)
- [x] Passwords hashed with bcrypt
- [ ] NextAuth JWT secret generated (Phase 2)
- [ ] KIMI API key server-side only (Phase 4)
- [ ] Rate limiting implemented (Phase 4)
- [ ] SQL injection protection (Prisma handles this)
- [ ] XSS protection (React handles this)

## Performance Optimization

- [ ] React Query caching (Phase 3)
- [ ] Image optimization (Next.js automatic)
- [ ] Code splitting (Next.js automatic)
- [ ] Database indexing (Already in schema)

## Support & Resources

- **Documentation**: README.md
- **Database Schema**: prisma/schema.prisma
- **API Reference**: To be created in Phase 4
- **Type Definitions**: types/index.ts

---

**Phase 1 Status: ✅ COMPLETED**

- ✅ Database schema designed and implemented
- ✅ Folder structure created
- ✅ Configuration files set up
- ✅ Type definitions created
- ✅ Seed scripts ready
- ✅ Global styles with RTL support

**Ready for Phase 2: Authentication System**
