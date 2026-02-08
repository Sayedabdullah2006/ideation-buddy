# 🚀 IdeaFlow AI

Design Thinking-Driven MVP Specification Generator powered by KIMI AI.

## 📋 Overview

**IdeaFlow AI** is an enterprise-grade web application that transforms raw ideas into structured MVP specifications using a guided Design Thinking workflow (Empathize → Define → Ideate → Prototype → Validate). The application leverages contextual AI intelligence through KIMI AI to generate insights based on accumulated project data.

### Key Features

- ✨ **Iterative Design Thinking Wizard** - Step-by-step guided process
- 🤖 **Contextual AI Intelligence** - KIMI AI with accumulated project context
- 📄 **MVP Generation** - Comprehensive technical specifications in Markdown/JSON
- 🔐 **Role-Based Security** - Admin/User separation with RBAC
- 🌍 **Full RTL Support** - Arabic UI with English logic/code
- 🎨 **Modern UI/UX** - Notion-minimalist / Linear-inspired design

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS, Shadcn UI, Radix UI |
| **State Management** | React Query (server), Zustand (client) |
| **Backend** | Next.js API Routes |
| **Database** | PostgreSQL + Prisma ORM |
| **Authentication** | NextAuth.js (JWT + RBAC) |
| **AI Integration** | KIMI AI API |
| **Icons** | Lucide React |

## 📁 Folder Structure

```
ideation-buddy/
├── app/                              # Next.js App Router
│   ├── (auth)/                       # Authentication routes (grouped)
│   │   ├── login/                    # Login page
│   │   └── register/                 # Registration page
│   │
│   ├── (dashboard)/                  # Main app routes (grouped)
│   │   ├── projects/                 # Projects list/management
│   │   └── wizard/                   # Design Thinking wizard
│   │
│   ├── admin/                        # Admin dashboard
│   │   ├── users/                    # User management
│   │   ├── analytics/                # Usage analytics
│   │   └── logs/                     # AI generation logs
│   │
│   ├── api/                          # API routes
│   │   ├── auth/                     # NextAuth endpoints
│   │   ├── projects/                 # Project CRUD
│   │   ├── ai/                       # KIMI AI integration
│   │   └── admin/                    # Admin operations
│   │
│   ├── layout.tsx                    # Root layout with providers
│   ├── page.tsx                      # Landing page
│   └── globals.css                   # Global styles
│
├── components/                       # React components
│   ├── ui/                           # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...                       # Other UI primitives
│   │
│   ├── rtl/                          # RTL-specific components
│   │   ├── rtl-provider.tsx          # RTL context provider
│   │   └── rtl-wrapper.tsx           # RTL layout wrapper
│   │
│   ├── wizard/                       # Design Thinking wizard components
│   │   ├── step-empathize.tsx        # Step 1: User personas
│   │   ├── step-define.tsx           # Step 2: Problem statement
│   │   ├── step-ideate.tsx           # Step 3: Solutions
│   │   ├── step-prototype.tsx        # Step 4: Business model
│   │   ├── step-validate.tsx         # Step 5: MVP generation
│   │   └── wizard-navigation.tsx     # Progress bar & navigation
│   │
│   ├── admin/                        # Admin dashboard components
│   │   ├── user-table.tsx            # User management table
│   │   ├── analytics-charts.tsx      # Usage charts (Recharts)
│   │   └── ai-logs-viewer.tsx        # AI logs viewer
│   │
│   └── layout/                       # Layout components
│       ├── sidebar.tsx               # Main sidebar
│       ├── header.tsx                # Top header
│       └── mobile-nav.tsx            # Mobile navigation
│
├── lib/                              # Utilities & configurations
│   ├── auth/                         # Authentication utilities
│   │   ├── auth-options.ts           # NextAuth configuration
│   │   ├── middleware.ts             # Auth middleware
│   │   └── rbac.ts                   # Role-based access control
│   │
│   ├── api/                          # API clients
│   │   ├── kimi-client.ts            # KIMI AI API client
│   │   └── rate-limiter.ts           # Rate limiting logic
│   │
│   ├── utils/                        # General utilities
│   │   ├── cn.ts                     # Class name merger (clsx + twMerge)
│   │   ├── formatters.ts             # Date/number formatters
│   │   └── validators.ts             # Input validators
│   │
│   ├── validations/                  # Zod schemas
│   │   ├── auth.schema.ts            # Auth validation schemas
│   │   └── project.schema.ts         # Project validation schemas
│   │
│   ├── prisma.ts                     # Prisma client singleton
│   └── constants.ts                  # App-wide constants
│
├── prisma/                           # Database
│   ├── schema.prisma                 # Database schema
│   ├── migrations/                   # Migration files
│   └── seed/                         # Seed scripts
│       └── index.ts                  # Database seeding
│
├── types/                            # TypeScript types
│   ├── auth.types.ts                 # Authentication types
│   ├── project.types.ts              # Project types
│   ├── ai.types.ts                   # AI response types
│   └── index.ts                      # Type exports
│
├── hooks/                            # Custom React hooks
│   ├── use-project.ts                # Project state hook
│   ├── use-wizard.ts                 # Wizard navigation hook
│   └── use-ai-generation.ts          # AI generation hook
│
├── store/                            # Zustand stores
│   ├── slices/                       # Store slices
│   │   ├── project-slice.ts          # Project state
│   │   └── wizard-slice.ts           # Wizard state
│   └── index.ts                      # Store configuration
│
├── public/                           # Static assets
│   ├── images/                       # Images
│   └── icons/                        # Icons
│
├── styles/                           # Global styles
│   └── arabic-fonts.css              # Arabic font definitions
│
├── .env.example                      # Environment variables template
├── .gitignore                        # Git ignore rules
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
└── README.md                         # This file
```

## 🗄 Database Schema

### Core Models

1. **User** - User authentication and profile
   - Role-based access (ADMIN/USER)
   - Status management (ACTIVE/INACTIVE/SUSPENDED)

2. **Project** - Design Thinking project with workflow stages
   - Status tracking through all 5 steps
   - JSON storage for personas, solutions, business model, MVP spec
   - AI usage tracking (tokens, cost)

3. **AIGenerationLog** - AI request/response audit trail
   - Per-step logging
   - Performance monitoring (tokens, latency)
   - Error tracking

4. **SystemConfig** - System-wide configuration (optional)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL 14+
- KIMI AI API key

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# 3. Initialize database
npm run prisma:push

# 4. Generate Prisma client
npm run prisma:generate

# 5. Seed database (optional - creates admin user)
npm run prisma:seed

# 6. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Default Admin Credentials

After seeding:
- **Email**: admin@ideaflow.ai
- **Password**: change-this-password

⚠️ **Change these immediately in production!**

## 📋 Development Phases

### ✅ Phase 1: Database Schema & Folder Structure (COMPLETED)
- [x] Prisma schema with User, Project, AIGenerationLog models
- [x] Complete Next.js folder structure
- [x] Configuration files (Next.js, Tailwind, TypeScript)

### 🔄 Phase 2: Authentication System (NEXT)
- [ ] NextAuth.js configuration with JWT
- [ ] Role-based middleware (ADMIN/USER)
- [ ] Login/Register pages with RTL
- [ ] Protected routes

### 🔄 Phase 3: Design Thinking Wizard
- [ ] 5-step wizard UI with progress bar
- [ ] RTL layout and Arabic typography
- [ ] Zustand state management
- [ ] Form validation with Zod

### 🔄 Phase 4: KIMI AI Integration
- [ ] KIMI API client with rate limiting
- [ ] Contextual prompt engineering
- [ ] AI response parsing and validation
- [ ] Error handling and retry logic

### 🔄 Phase 5: Admin Dashboard
- [ ] User management (CRUD)
- [ ] Analytics charts (API usage, costs)
- [ ] AI logs viewer
- [ ] System configuration

## 📝 Design Thinking Workflow

1. **Empathize** → Generate 3 user personas with pain points
2. **Define** → Refine problem statement + select persona
3. **Ideate** → Generate 5-10 solutions with AI scoring
4. **Prototype** → Business Model Canvas + MVP features
5. **Validate** → Comprehensive MVP technical specification

## 🌍 RTL (Arabic) Support

- UI displays in Arabic (RTL layout)
- Code, logs, and API prompts remain in English
- Tailwind RTL utilities included
- Arabic font support (Cairo family)

## 🔒 Security Features

- Server-side API key storage
- JWT-based authentication
- Role-Based Access Control (RBAC)
- Rate limiting on AI requests
- Sanitized AI logs (no sensitive data)
- Protected admin routes

## 📊 Monitoring & Analytics

- Real-time user statistics
- AI API cost tracking
- Token usage monitoring
- Request latency tracking
- Error rate monitoring

## 🤝 Contributing

This is an internal/enterprise tool. Contributions should follow the established architecture.

## 📄 License

Proprietary - Internal Use Only

---

**Built with ❤️ using Next.js, Prisma, and KIMI AI**
