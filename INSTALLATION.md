# 🚀 IdeaFlow AI - Complete Installation Guide

## Prerequisites

Ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** 7.x or higher (or yarn/pnpm)
- **PostgreSQL** 14.x or higher
- **Git** (optional, for version control)

## Step-by-Step Installation

### 1. Navigate to Project Directory

```bash
cd /c/Users/sayed/Downloads/ideation-buddy
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 15
- React 19
- Prisma ORM
- NextAuth.js
- Shadcn UI components
- And 40+ other dependencies

**Expected output:** ✓ Dependencies installed successfully

### 3. Set Up PostgreSQL Database

#### Option A: Local PostgreSQL

```bash
# 1. Start PostgreSQL service
# Windows: Open Services → PostgreSQL → Start
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql

# 2. Create database
psql -U postgres
```

```sql
CREATE DATABASE ideaflow_db;
CREATE USER ideaflow_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE ideaflow_db TO ideaflow_user;
\q
```

#### Option B: Cloud PostgreSQL (Supabase, Neon, etc.)

- Sign up for a PostgreSQL cloud service
- Create a new database
- Copy the connection string

### 4. Configure Environment Variables

```bash
# Copy example file
cp .env.example .env

# Open .env in your editor
notepad .env
# or
code .env
```

**Update .env with your values:**

```env
# Database (REQUIRED)
DATABASE_URL="postgresql://ideaflow_user:your_secure_password@localhost:5432/ideaflow_db?schema=public"

# NextAuth (REQUIRED)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="REPLACE_WITH_GENERATED_SECRET"

# KIMI AI (Optional for Phase 2, Required for Phase 4)
KIMI_API_KEY="your-kimi-api-key"
KIMI_API_URL="https://api.kimi.ai/v1/chat/completions"
KIMI_MODEL="moonshot-v1-8k"

# Rate Limiting
AI_RATE_LIMIT_PER_USER=50
AI_RATE_LIMIT_WINDOW=86400

# Admin Credentials
ADMIN_EMAIL="admin@ideaflow.ai"
ADMIN_PASSWORD="change-this-immediately"

NODE_ENV="development"
```

**Generate NEXTAUTH_SECRET:**

```bash
# Windows (Git Bash)
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and paste it as `NEXTAUTH_SECRET` value.

### 5. Initialize Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database (creates tables)
npm run prisma:push
```

**Expected output:**
```
✓ Generated Prisma Client
✓ The database is now in sync with the Prisma schema
```

### 6. Seed Database (Create Admin User)

```bash
npm run prisma:seed
```

**Expected output:**
```
🌱 Starting database seeding...
✅ Admin user created: admin@ideaflow.ai
✅ Demo user created: demo@ideaflow.ai
✅ System config created: ai_rate_limit_per_user
✅ System config created: max_projects_per_user
✅ System config created: maintenance_mode
🎉 Database seeding completed!

📝 Default Credentials:
   Admin: admin@ideaflow.ai / change-this-immediately
   Demo:  demo@ideaflow.ai / demo123456

⚠️  Change these passwords immediately in production!
```

### 7. Verify Database

```bash
# Open Prisma Studio (database GUI)
npm run prisma:studio
```

This opens http://localhost:5555 where you can see:
- ✅ 2 users in `users` table (admin + demo)
- ✅ 3 configs in `system_config` table
- ✅ Empty `projects` table
- ✅ Empty `ai_generation_logs` table

### 8. Run Development Server

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 15.1.6
- Local:        http://localhost:3000
- Environments: .env

✓ Ready in 2.5s
```

### 9. Test the Application

Open your browser and visit: http://localhost:3000

#### Test Scenarios:

**1. Landing Page**
- Visit http://localhost:3000
- Should see Arabic RTL landing page
- Click "إنشاء حساب" or "تسجيل الدخول"

**2. Registration**
- Navigate to http://localhost:3000/register
- Fill in:
  - Name: أحمد محمد
  - Email: test@example.com
  - Password: test123
  - Confirm Password: test123
- Click "إنشاء حساب"
- Should see success toast
- Should redirect to /login

**3. Login (with new account)**
- Email: test@example.com
- Password: test123
- Click "تسجيل الدخول"
- Should redirect to /projects

**4. Login (with demo account)**
- Email: demo@ideaflow.ai
- Password: demo123456
- Should redirect to /projects
- See empty projects page

**5. Admin Dashboard (with admin account)**
- Logout
- Login with:
  - Email: admin@ideaflow.ai
  - Password: change-this-immediately
- Should redirect to /admin
- See system statistics

**6. Test Protected Routes**
- Logout
- Try to visit http://localhost:3000/projects
- Should redirect to /login
- Try to visit http://localhost:3000/admin
- Should redirect to /login

## Troubleshooting

### Issue 1: Database Connection Error

**Error:** `Can't reach database server at localhost:5432`

**Solution:**
1. Ensure PostgreSQL is running:
   ```bash
   # Windows
   services.msc → PostgreSQL → Start

   # Mac
   brew services list
   brew services start postgresql

   # Linux
   sudo systemctl status postgresql
   sudo systemctl start postgresql
   ```

2. Verify DATABASE_URL in .env
3. Test connection:
   ```bash
   psql -U ideaflow_user -d ideaflow_db
   ```

### Issue 2: Prisma Client Not Found

**Error:** `Cannot find module '@prisma/client'`

**Solution:**
```bash
npm run prisma:generate
```

### Issue 3: NextAuth Configuration Error

**Error:** `NEXTAUTH_SECRET must be provided`

**Solution:**
1. Ensure .env file exists
2. Generate secret:
   ```bash
   openssl rand -base64 32
   ```
3. Add to .env:
   ```env
   NEXTAUTH_SECRET="generated-secret-here"
   ```

### Issue 4: Migration Errors

**Error:** `Migration engine error`

**Solution:**
```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Or manually:
# 1. Drop database
psql -U postgres -c "DROP DATABASE ideaflow_db;"
# 2. Recreate
psql -U postgres -c "CREATE DATABASE ideaflow_db;"
# 3. Push schema
npm run prisma:push
# 4. Seed
npm run prisma:seed
```

### Issue 5: Port 3000 Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or run on different port
PORT=3001 npm run dev
```

### Issue 6: Module Not Found Errors

**Error:** `Module not found: Can't resolve '@/...'`

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run prisma:generate
```

### Issue 7: TypeScript Errors

**Error:** TypeScript compilation errors

**Solution:**
```bash
# Regenerate Prisma types
npm run prisma:generate

# Check tsconfig.json paths
# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

## Verification Checklist

After installation, verify everything works:

- [ ] npm install completed without errors
- [ ] .env file created with all variables
- [ ] Database connection successful
- [ ] Prisma schema pushed (tables created)
- [ ] Database seeded (admin + demo users exist)
- [ ] Development server starts on port 3000
- [ ] Landing page loads (http://localhost:3000)
- [ ] Registration works
- [ ] Login works
- [ ] Protected routes redirect to login when not authenticated
- [ ] Admin can access /admin
- [ ] Regular user cannot access /admin
- [ ] Logout works

## Next Steps

After successful installation:

1. **Change Admin Password**
   ```bash
   # Login as admin → Settings (coming in Phase 3)
   # Or update directly in database
   ```

2. **Explore the Application**
   - Create test projects
   - Test wizard (placeholder in Phase 2)
   - Check admin dashboard

3. **Proceed to Phase 3**
   - Design Thinking Wizard implementation
   - Zustand state management
   - Form components with RTL

4. **Proceed to Phase 4**
   - KIMI AI integration
   - AI-powered content generation
   - Contextual prompts

## Production Deployment

For production deployment (after all phases complete):

1. **Database**: Use production PostgreSQL (AWS RDS, Supabase, etc.)
2. **Environment**: Set NODE_ENV=production
3. **Secrets**: Generate new secure secrets
4. **HTTPS**: Enable HTTPS (NextAuth requirement)
5. **Build**: Run `npm run build`
6. **Start**: Run `npm run start`

## Support

If you encounter issues not covered here:

1. Check PHASE-2-COMPLETE.md for detailed documentation
2. Check README.md for project overview
3. Review code comments in source files
4. Verify all environment variables are set

---

**Installation Status: ✅ Ready for Development**

You're all set! The application is ready for development and testing.
