# ⚡ Quick Start Guide - IdeaFlow AI

## 🎯 Goal
Get the application running in **5 minutes** and start testing the KIMI AI integration.

---

## Step 1: Database Setup (Choose One Option)

### Option A: Using Supabase (Easiest - Free Cloud PostgreSQL) ⭐ RECOMMENDED

1. Go to https://supabase.com
2. Sign up for free account
3. Click "New Project"
4. Fill in:
   - Name: `ideaflow-ai`
   - Database Password: (create a strong password)
   - Region: Choose closest to you
5. Wait 2 minutes for project to provision
6. Go to Project Settings → Database
7. Copy the **Connection String** (URI format)
8. Update `.env` file:
   ```bash
   DATABASE_URL="postgresql://postgres.xxxxx:yourpassword@xxxx.supabase.co:5432/postgres"
   ```

### Option B: Using Docker (Local PostgreSQL)

```bash
# Start PostgreSQL container
docker run --name ideaflow-postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=ideaflow_db \
  -p 5432:5432 \
  -d postgres:14

# Update .env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/ideaflow_db?schema=public"
```

### Option C: Using Local PostgreSQL

```bash
# If you have PostgreSQL installed locally
# Update .env with your credentials
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/ideaflow_db?schema=public"
```

---

## Step 2: Setup Database Schema

```bash
# Navigate to project directory
cd C:\Users\sayed\Downloads\ideation-buddy

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed admin user
npx prisma db seed
```

**Expected Output:**
```
✔ Generated Prisma Client
✔ Database schema synced
✔ Seed data created (if you ran seed)
```

---

## Step 3: Verify Environment Variables

Check your `.env` file has these values:

```bash
# Database (UPDATE THIS!)
DATABASE_URL="postgresql://..."  # Your actual connection string

# NextAuth (Already configured)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="o2OLhUec94xmebueVsQDje4cZwOyrDvaZNJ285mwmFE="

# KIMI AI (Already configured)
KIMI_API_KEY="sk-PG6LkcQ9YjREFx2zFx3Grsrk7Nh8m8UZrpgxVTzIiDgtSmIp"
KIMI_API_URL="https://api.moonshot.cn/v1/chat/completions"
KIMI_MODEL="moonshot-v1-8k"

# Rate Limiting (Already configured)
AI_RATE_LIMIT_PER_USER=50
AI_RATE_LIMIT_WINDOW=86400
```

---

## Step 4: Start the Application

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
▲ Next.js 15.1.6
- Local:        http://localhost:3000
- Ready in 2.5s
```

---

## Step 5: Open Browser & Test! 🚀

1. **Open:** http://localhost:3000
2. **Register Account:**
   - Click "تسجيل حساب جديد" (Register)
   - Name: Test User
   - Email: test@example.com
   - Password: testpass123
   - Click "تسجيل"

3. **Create First Project:**
   - Click "مشروع جديد" (New Project)
   - Fill in project details (use example from TESTING-GUIDE.md)
   - Click "حفظ والمتابعة"

4. **Test AI Generation:**
   - Click "توليد الشخصيات" button
   - Wait 5-15 seconds
   - ✅ See 3 personas appear!

5. **Continue Testing:**
   - Follow the complete test cycle in `TESTING-GUIDE.md`
   - Test all 5 wizard steps
   - Export MVP specs to Markdown/JSON

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to database"

**Check 1:** Verify DATABASE_URL in `.env`
```bash
cat .env | grep DATABASE_URL
```

**Check 2:** Test connection directly
```bash
npx prisma db push
```

**Fix:** Update DATABASE_URL with correct credentials

---

### Issue: "KIMI_API_KEY is not configured"

**Check:** Verify .env file
```bash
cat .env | grep KIMI_API_KEY
```

**Fix:** Ensure API key is set correctly in .env (already done)

---

### Issue: "npm install fails"

**Fix:** Dependencies are being installed. Wait for completion.

If it still fails:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

### Issue: "Port 3000 already in use"

**Fix:** Use different port
```bash
npm run dev -- -p 3001
# Then open: http://localhost:3001
```

---

## ✅ Success Checklist

- [ ] Database connected (npx prisma db push works)
- [ ] Server starts (npm run dev)
- [ ] Can access http://localhost:3000
- [ ] Can register account
- [ ] Can create project
- [ ] Can generate personas with AI
- [ ] All 5 wizard steps work
- [ ] Can export to Markdown/JSON

---

## 📚 Next Steps

1. ✅ **Complete Full Test:** Follow `TESTING-GUIDE.md` for comprehensive testing
2. ✅ **Read Documentation:** Check `PHASE-4-COMPLETE-SUMMARY.md` for all features
3. ✅ **Monitor Costs:** Check AI usage in database (`AIGenerationLog` table)
4. ✅ **Deploy:** When ready, deploy to Vercel/Railway

---

## 🆘 Need More Help?

**Full Testing Guide:** `TESTING-GUIDE.md`
**Technical Docs:** `PHASE-4-KIMI-INTEGRATION.md`
**Summary:** `PHASE-4-COMPLETE-SUMMARY.md`

**Common Commands:**
```bash
# Start dev server
npm run dev

# Check database
npx prisma studio

# View logs
# (check terminal where npm run dev is running)

# Reset database (if needed)
npx prisma db push --force-reset
npx prisma db seed
```

---

**Ready? Let's test the AI! 🚀**

Open http://localhost:3000 and start creating your first AI-powered MVP!
