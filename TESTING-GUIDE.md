# 🧪 Complete Browser Testing Guide

## ⚠️ Prerequisites Setup

Before we can start testing, we need to configure a few things:

### 1. Database Configuration

Your `.env` file currently has placeholder database credentials:
```
DATABASE_URL="postgresql://username:password@localhost:5432/ideaflow_db?schema=public"
```

**You need to:**

**Option A: Using Local PostgreSQL**
```bash
# If you have PostgreSQL installed:
# 1. Create database
psql -U postgres
CREATE DATABASE ideaflow_db;
\q

# 2. Update .env with your credentials
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/ideaflow_db?schema=public"
```

**Option B: Using Docker PostgreSQL** (Recommended)
```bash
# Start PostgreSQL in Docker
docker run --name ideaflow-postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=ideaflow_db \
  -p 5432:5432 \
  -d postgres:14

# Update .env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/ideaflow_db?schema=public"
```

**Option C: Using Free Cloud PostgreSQL (Railway/Supabase)**
```bash
# Get free PostgreSQL from:
# - Railway.app (free tier)
# - Supabase.com (free tier)
# - ElephantSQL (free tier)

# Copy the connection string to .env
DATABASE_URL="postgresql://user:pass@host:5432/database"
```

### 2. Run Database Migrations

After configuring database:
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed admin user
npx prisma db seed
```

### 3. Install Dependencies (already running)
```bash
npm install
```

## 🚀 Starting the Application

Once database is configured:

```bash
# Start development server
npm run dev
```

Server will start at: **http://localhost:3000**

## 📋 Full Test Cycle Checklist

### Phase 1: Account Setup (5 minutes)

#### 1.1 Create Account
- [ ] Navigate to http://localhost:3000
- [ ] Click "تسجيل حساب جديد" (Register)
- [ ] Fill registration form:
  - Name: "Test User"
  - Email: "test@example.com"
  - Password: "testpass123"
- [ ] Click "تسجيل" (Register)
- [ ] ✅ Verify: Redirects to /projects

#### 1.2 Login (if needed)
- [ ] Navigate to http://localhost:3000/login
- [ ] Enter credentials
- [ ] Click "تسجيل الدخول" (Login)
- [ ] ✅ Verify: Redirects to /projects

---

### Phase 2: Step 1 - Empathize (Persona Generation) (3 minutes)

#### 2.1 Create Project
- [ ] From /projects page, click "مشروع جديد" (New Project)
- [ ] ✅ Verify: Redirects to /wizard

#### 2.2 Fill Project Details
- [ ] **Project Title:** "تطبيق توصيل الطعام السريع"
- [ ] **Description:** "منصة لربط المطاعم المحلية بالعملاء للتوصيل السريع والموثوق"
- [ ] **Detailed Idea:**
```
لاحظت أن الكثير من المطاعم الصغيرة في المدينة لا تملك خدمة توصيل خاصة بها، والعملاء يجدون صعوبة في الوصول إلى خيارات متنوعة من الطعام المحلي الأصيل. المشكلة الحالية هي أن منصات التوصيل الكبيرة تأخذ عمولات عالية (30-40%) مما يرهق المطاعم الصغيرة، وأحياناً جودة الخدمة ليست مرضية.

الفكرة هي إنشاء منصة محلية تربط المطاعم الصغيرة والمتوسطة بسائقين مستقلين، مع عمولة أقل (15-20%)، وتركيز على الطعام المحلي والجودة العالية. المنصة ستوفر للمطاعم لوحة تحكم بسيطة لإدارة الطلبات، وللعملاء تطبيق سهل الاستخدام مع خيارات دفع متعددة.
```
- [ ] Click "حفظ والمتابعة" (Save and Continue)
- [ ] ✅ Verify: URL changes to `/wizard?projectId=xxx`
- [ ] ✅ Verify: Page refreshes and loads saved data

#### 2.3 Generate Personas with AI
- [ ] Scroll down to "توليد الشخصيات بالذكاء الاصطناعي" section
- [ ] Click "توليد الشخصيات" button
- [ ] ✅ Verify: Button shows "جاري التوليد..." with spinner
- [ ] ⏱️ Wait 5-15 seconds
- [ ] ✅ Verify: 3 persona cards appear with:
  - Full name (e.g., "أحمد السعدي")
  - Age (e.g., "28 سنة")
  - Occupation (e.g., "مهندس برمجيات")
  - Bio (2-3 sentences)
  - Pain points list (bullet points)
- [ ] ✅ Verify: Each persona has realistic Arabic content
- [ ] ✅ Verify: No error messages

#### 2.4 Test Re-generation
- [ ] Click "إعادة التوليد" button
- [ ] ✅ Verify: New personas generate (different from before)

#### 2.5 Complete Step 1
- [ ] Click "حفظ والمتابعة" at bottom
- [ ] ✅ Verify: Moves to Step 2 (Define)
- [ ] ✅ Verify: Step 1 marked as complete in progress bar

---

### Phase 3: Step 2 - Define (Problem Refinement) (3 minutes)

#### 3.1 View Loaded Personas
- [ ] ✅ Verify: Generated personas from Step 1 appear at top
- [ ] ✅ Verify: Can see persona cards (read-only)

#### 3.2 Enter Problem Statement
- [ ] Fill "بيان المشكلة" (Problem Statement):
```
أصحاب المطاعم الصغيرة يواجهون صعوبة في الوصول إلى قاعدة عملاء أوسع بسبب عدم وجود خدمة توصيل موثوقة ومنخفضة التكلفة، مما يحد من نموهم ويقلل إيراداتهم بشكل كبير مقارنة بالمطاعم الكبيرة التي تملك خدمات توصيل خاصة.
```
- [ ] ✅ Verify: No validation errors

#### 3.3 Generate Problem Refinement with AI
- [ ] Click "تحسين البيان" button
- [ ] ✅ Verify: Button shows "جاري التحسين..." with spinner
- [ ] ⏱️ Wait 5-10 seconds
- [ ] ✅ Verify: 3 refined HMW statements appear with:
  - "How might we..." format in Arabic
  - AI reasoning for each
  - One marked with "موصى به" (Recommended) badge in green
  - Insights section at bottom

#### 3.4 Select Refined Statement
- [ ] Click on any refined statement card
- [ ] ✅ Verify: Card border turns primary color (highlighted)
- [ ] Click on different statement
- [ ] ✅ Verify: Selection changes

#### 3.5 Complete Step 2
- [ ] Click "حفظ والمتابعة"
- [ ] ✅ Verify: Moves to Step 3 (Ideate)
- [ ] ✅ Verify: Steps 1 & 2 marked complete in progress bar

---

### Phase 4: Step 3 - Ideate (Solution Generation) (5 minutes)

#### 4.1 Generate Solutions with AI
- [ ] Click "توليد الحلول" button
- [ ] ✅ Verify: Button shows "جاري التوليد..." with spinner
- [ ] ⏱️ Wait 10-15 seconds
- [ ] ✅ Verify: 5-7 solution cards appear

#### 4.2 Verify Solution Details
For EACH solution, check:
- [ ] ✅ Solution title (clear, descriptive)
- [ ] ✅ Solution description (2-3 sentences)
- [ ] ✅ Impact Score (1-10) with:
  - Green progress bar
  - Score number displayed
  - Green icon
- [ ] ✅ Feasibility Score (1-10) with:
  - Blue progress bar
  - Score number displayed
  - Blue icon
- [ ] ✅ AI Reasoning section (gray box explaining scores)

#### 4.3 Check Score Indicators
- [ ] ✅ Verify: High scores (8-10) show in green
- [ ] ✅ Verify: Medium scores (6-7) show in yellow
- [ ] ✅ Verify: Lower scores (<6) show in orange
- [ ] ✅ Verify: Solutions with total score ≥16 have yellow star icon

#### 4.4 Select Solution
- [ ] Click on the highest-scored solution
- [ ] ✅ Verify: Card highlighted with primary border
- [ ] ✅ Verify: Checkmark icon appears on selected card

#### 4.5 Complete Step 3
- [ ] Click "حفظ والمتابعة"
- [ ] ✅ Verify: Moves to Step 4 (Prototype)
- [ ] ✅ Verify: Steps 1-3 marked complete

---

### Phase 5: Step 4 - Prototype (Business Model Canvas) (5 minutes)

#### 5.1 Generate Business Model with AI
- [ ] Click "توليد نموذج الأعمال" button
- [ ] ✅ Verify: Button shows "جاري التوليد..." with spinner
- [ ] ⏱️ Wait 10-20 seconds (longest generation)
- [ ] ✅ Verify: Full Business Model Canvas appears

#### 5.2 Verify Business Model Canvas - All 9 Blocks
Check that ALL blocks appear with realistic Arabic content:

1. [ ] ✅ **الشركاء الرئيسيون** (Key Partners)
   - Has icon: Users
   - Multiple bullet points
   - Regular card style

2. [ ] ✅ **الأنشطة الرئيسية** (Key Activities)
   - Multiple bullet points
   - Regular card style

3. [ ] ✅ **الموارد الرئيسية** (Key Resources)
   - Multiple bullet points
   - Regular card style

4. [ ] ✅ **القيمة المقدمة** (Value Propositions)
   - Has icon: TrendingUp
   - Highlighted in primary color
   - Spans 2 columns
   - Multiple bullet points

5. [ ] ✅ **علاقات العملاء** (Customer Relationships)
   - Multiple bullet points
   - Regular card style

6. [ ] ✅ **القنوات** (Channels)
   - Multiple bullet points
   - Regular card style

7. [ ] ✅ **شرائح العملاء** (Customer Segments)
   - Has icon: Users
   - Multiple bullet points
   - Regular card style

8. [ ] ✅ **هيكل التكاليف** (Cost Structure)
   - Has icon: DollarSign (red)
   - Red/pink background
   - Spans 2 columns
   - Multiple bullet points with costs

9. [ ] ✅ **مصادر الإيرادات** (Revenue Streams)
   - Has icon: DollarSign (green)
   - Green background
   - Multiple bullet points with revenue models

#### 5.3 Verify MVP Features Section
- [ ] ✅ "ميزات MVP" section appears below canvas
- [ ] ✅ **Core Features (الميزات الأساسية):**
  - Yellow/orange background cards
  - 3-5 features
  - Each has: title + description
  - Marked as critical for MVP
- [ ] ✅ **Nice-to-Have Features (الميزات الإضافية):**
  - Gray background cards
  - 2-3 features
  - Each has: title + description
  - Marked as post-MVP

#### 5.4 Test Re-generation
- [ ] Click "إعادة التوليد" button
- [ ] ✅ Verify: New business model generates

#### 5.5 Complete Step 4
- [ ] Click "حفظ والمتابعة"
- [ ] ✅ Verify: Moves to Step 5 (Validate)
- [ ] ✅ Verify: Steps 1-4 marked complete

---

### Phase 6: Step 5 - Validate (MVP Specification + Export) (7 minutes)

#### 6.1 Generate MVP Specification with AI
- [ ] Click "توليد المواصفات الكاملة" button
- [ ] ✅ Verify: Button shows "جاري التوليد..." with spinner
- [ ] ⏱️ Wait 10-20 seconds
- [ ] ✅ Verify: Complete specification appears

#### 6.2 Verify All Specification Sections

**Section 1: Project Overview**
- [ ] ✅ Project Type (e.g., "Web Application", "Mobile App + Web Platform")
- [ ] ✅ Overview (2-3 paragraphs describing project)

**Section 2: User Flow**
- [ ] ✅ Numbered steps (5-10 steps)
- [ ] ✅ Each step describes user action
- [ ] ✅ Flows from start (landing page) to end (goal achieved)

**Section 3: Tech Stack Recommendations**
- [ ] ✅ **Frontend:** 3-5 technologies (e.g., React, Next.js, Tailwind)
- [ ] ✅ **Backend:** 3-5 technologies (e.g., Node.js, Express, Auth)
- [ ] ✅ **Database:** Specific database with reason (e.g., PostgreSQL)
- [ ] ✅ **Deployment:** 2-3 platforms (e.g., Vercel, Railway)

**Section 4: Wireframes Description**
- [ ] ✅ Markdown text describing key screens
- [ ] ✅ Mentions homepage, dashboard, main features

**Section 5: Timeline**
- [ ] ✅ Broken into phases/weeks
- [ ] ✅ Each phase has tasks
- [ ] ✅ Realistic timeframe (4-8 weeks typical)

**Section 6: Estimated Cost**
- [ ] ✅ Development cost estimate
- [ ] ✅ Monthly operational costs
- [ ] ✅ First year total

#### 6.3 Test Markdown Export ✨ **CRITICAL FEATURE**
- [ ] Scroll to "تصدير المواصفات" section (green card)
- [ ] Click "تصدير Markdown" button
- [ ] ✅ Verify: File downloads to your browser
- [ ] ✅ Verify: Filename format: `{ProjectTitle}-MVP-Spec.md`
- [ ] Open downloaded .md file
- [ ] ✅ Verify: Contains ALL sections:
  - Project Type & Overview
  - User Flow (numbered list)
  - Tech Stack (Frontend, Backend, Database, Deployment)
  - Wireframes
  - Timeline
  - Estimated Cost
  - Footer: "Generated by IdeaFlow AI powered by KIMI"
- [ ] ✅ Verify: Markdown formatting is correct
- [ ] ✅ Verify: No JSON syntax errors in text

#### 6.4 Test JSON Export ✨ **CRITICAL FEATURE**
- [ ] Click "تصدير JSON" button
- [ ] ✅ Verify: File downloads to your browser
- [ ] ✅ Verify: Filename format: `{ProjectTitle}-MVP-Spec.json`
- [ ] Open downloaded .json file
- [ ] ✅ Verify: Valid JSON (no syntax errors)
- [ ] ✅ Verify: Contains all fields:
```json
{
  "projectType": "...",
  "overview": "...",
  "userFlow": [...],
  "techStackRecommendation": {
    "frontend": [...],
    "backend": [...],
    "database": "...",
    "deployment": [...]
  },
  "wireframes": "...",
  "timeline": "...",
  "estimatedCost": "..."
}
```

#### 6.5 Test Re-generation
- [ ] Click "إعادة التوليد" button (small, below export buttons)
- [ ] ✅ Verify: New specification generates
- [ ] ✅ Verify: Export buttons still work with new content

#### 6.6 Complete the Project
- [ ] Scroll to bottom
- [ ] ✅ Verify: "تهانينا! 🎉" (Congratulations) message appears
- [ ] Click "إنهاء المشروع" (Finish Project)
- [ ] ✅ Verify: Success toast appears
- [ ] ✅ Verify: Redirects to /projects page
- [ ] ✅ Verify: Project shows status as "مكتمل" (Completed)

---

### Phase 7: Navigation & State Testing (3 minutes)

#### 7.1 Test Wizard Navigation
- [ ] From /projects, click "عرض" (View) on completed project
- [ ] ✅ Verify: Opens wizard at Step 5 (last step)
- [ ] Click on Step 1 in progress bar
- [ ] ✅ Verify: Navigates back to Step 1
- [ ] ✅ Verify: All data is still there (personas, project details)
- [ ] Click on Step 3 in progress bar
- [ ] ✅ Verify: Jumps to Step 3
- [ ] ✅ Verify: All solutions still visible

#### 7.2 Test Auto-Save (if enabled)
- [ ] Go to Step 1
- [ ] Edit project title
- [ ] Wait 2 seconds
- [ ] ✅ Verify: "جاري الحفظ..." appears briefly
- [ ] Refresh page (F5)
- [ ] ✅ Verify: Changes persisted

#### 7.3 Test Create Second Project
- [ ] Go back to /projects
- [ ] Click "مشروع جديد"
- [ ] ✅ Verify: Fresh wizard loads (no old data)
- [ ] Enter different project idea
- [ ] Generate personas
- [ ] ✅ Verify: New personas (different from first project)

---

### Phase 8: Error Handling & Edge Cases (5 minutes)

#### 8.1 Test Rate Limiting (Optional - Takes Time)
**Note:** Default limit is 50 requests per 24 hours per user

- [ ] Make 50+ AI generation requests
- [ ] ✅ Verify: After 50th request, error appears
- [ ] ✅ Verify: Error message: "تم تجاوز حد الطلبات اليومية"
- [ ] ✅ Verify: Shows reset time

#### 8.2 Test Validation Errors
- [ ] Go to Step 1
- [ ] Clear project title
- [ ] Try to submit
- [ ] ✅ Verify: Error message appears in red
- [ ] Enter title < 3 characters
- [ ] ✅ Verify: Error: "يجب أن يكون العنوان 3 حروف على الأقل"
- [ ] Enter title > 100 characters
- [ ] ✅ Verify: Error about max length

#### 8.3 Test Empty States
- [ ] Create new project
- [ ] Go to Step 2 WITHOUT generating personas
- [ ] ✅ Verify: Shows placeholder message about personas
- [ ] Try Step 3 without problem statement
- [ ] ✅ Verify: Generate button disabled or shows error

#### 8.4 Test Network Resilience
**Simulate Network Error (if possible):**
- [ ] Open DevTools → Network tab
- [ ] Set to "Offline"
- [ ] Try generating personas
- [ ] ✅ Verify: Error toast appears
- [ ] ✅ Verify: Clear error message (not technical)
- [ ] Set back to "Online"
- [ ] Retry generation
- [ ] ✅ Verify: Works now

---

## 📊 Database Verification (Optional but Recommended)

After completing test cycle, verify data in database:

```sql
-- Check user created
SELECT * FROM "User" WHERE email = 'test@example.com';

-- Check project created
SELECT id, title, status FROM "Project" WHERE "userId" = 'your-user-id';

-- Check AI generation logs
SELECT
  step,
  success,
  "totalTokens",
  "estimatedCost",
  "createdAt"
FROM "AIGenerationLog"
WHERE "projectId" = 'your-project-id'
ORDER BY "createdAt" ASC;

-- Verify all 5 steps logged
-- Expected: 5 rows (EMPATHIZE, DEFINE, IDEATE, PROTOTYPE, VALIDATE)
```

---

## ✅ Success Criteria

Your test is SUCCESSFUL if:

✅ All 5 wizard steps complete without errors
✅ All AI generations produce realistic Arabic content
✅ Markdown export downloads and contains all sections
✅ JSON export downloads and is valid JSON
✅ Project status changes to "COMPLETED"
✅ Can navigate between steps
✅ Data persists after page refresh
✅ No console errors in browser DevTools

---

## 🐛 Common Issues & Solutions

### Issue 1: "KIMI_API_KEY is not configured"
**Solution:**
```bash
# Check .env file
cat .env | grep KIMI_API_KEY
# Restart server after fixing
```

### Issue 2: "Database connection error"
**Solution:**
```bash
# Verify PostgreSQL is running
# Check DATABASE_URL in .env
npx prisma db push
```

### Issue 3: "Cannot read properties of undefined"
**Solution:**
```bash
# Clear browser cache and cookies
# Restart dev server
npm run dev
```

### Issue 4: AI generation hangs (spinner forever)
**Solution:**
- Check browser console for errors (F12)
- Check server terminal for error logs
- Verify KIMI API key is valid
- Check internet connection

### Issue 5: Export buttons don't download
**Solution:**
- Check browser's download settings
- Allow popups from localhost:3000
- Try different browser

---

## 📞 Need Help?

If you encounter issues:
1. Check browser console (F12) for errors
2. Check server terminal for error logs
3. Verify all environment variables in .env
4. Try the test in incognito/private mode
5. Clear browser cache and restart server

---

**Happy Testing! 🚀**
