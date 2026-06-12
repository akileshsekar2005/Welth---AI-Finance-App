# WELTH - AI-POWERED FINANCE PLATFORM

![Welth Banner](public/banner.jpeg)

> A production-ready, full-stack AI finance web application built with Next.js 16, Supabase, Prisma, Clerk, and Google Gemini AI.

 **Live Demo:** [Click Here To Try The APP](https://welth-ai-finance-app-lfkt.vercel.app)

---

##  Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

---

##  Overview

Welth is a comprehensive AI-powered personal finance management platform that helps users track expenses, manage multiple bank accounts, scan receipts using AI, set budgets, and receive automated financial insights via email.

---

##  Features

-  **Authentication** — Secure sign-in/sign-up with Clerk
-  **Multi-Account Management** — Create and manage multiple bank accounts (Current/Savings)
-  **Transaction Tracking** — Add, edit, delete income and expense transactions
-  **AI Receipt Scanner** — Upload receipt images and auto-extract transaction details using Google Gemini AI
-  **Dashboard Analytics** — Visual charts showing spending patterns and expense breakdown by category
-  **Budget Management** — Set monthly budgets with real-time progress tracking
-  **Recurring Transactions** — Set up daily, weekly, monthly, or yearly recurring transactions
-  **Email Alerts** — Automated budget alerts (at 80% usage) and monthly financial reports via Resend
-  **Security** — Arcjet rate limiting and bot protection on all API routes
-  **Background Jobs** — Inngest-powered cron jobs for recurring transaction processing and report generation

---

##  Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui |
| Authentication | Clerk |
| Database | Supabase (PostgreSQL) |
| ORM | Prisma v6 |
| AI | Google Gemini AI (gemini-2.5-flash) |
| Background Jobs | Inngest |
| Email | Resend + React Email |
| Security | Arcjet |
| Deployment | Vercel |

---

##  Architecture

```
finance-app/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Sign-in, Sign-up pages
│   │   ├── (main)/          # Protected app pages
│   │   │   ├── dashboard/   # Main dashboard
│   │   │   ├── account/     # Account details & transactions
│   │   │   └── transaction/ # Create/Edit transactions
│   │   ├── api/
│   │   │   └── inngest/     # Inngest background jobs endpoint
│   │   └── page.tsx         # Landing page
│   ├── actions/             # Server actions
│   │   ├── dashboard.js     # Account CRUD operations
│   │   ├── transaction.js   # Transaction + AI receipt scan
│   │   ├── account.js       # Account management
│   │   ├── budget.js        # Budget management
│   │   └── send-email.js    # Email sending
│   ├── components/          # Reusable components
│   ├── data/                # Static data (categories)
│   ├── emails/              # React Email templates
│   ├── hooks/               # Custom React hooks
│   └── lib/
│       ├── prisma.ts        # Prisma client
│       ├── arcjet.js        # Arcjet security
│       ├── checkUser.ts     # Clerk-DB user sync
│       └── inngest/         # Inngest functions & client
├── prisma/
│   └── schema.prisma        # Database schema
└── public/                  # Static assets
```

---

##  Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### 1. Clone the repository

```bash
git clone https://github.com/akileshsekar2005/Welth---AI-Finance-App.git
cd Welth---AI-Finance-App
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add all required variables (see [Environment Variables](#environment-variables)).

### 4. Set up the database

```bash
npx prisma db push
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Run Inngest Dev Server (for background jobs)

In a separate terminal:

```bash
npx inngest-cli@latest dev
```

Open [http://localhost:8288](http://localhost:8288) to access the Inngest dashboard.

---

##  Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Supabase Database
DATABASE_URL=your_supabase_pooler_url
DIRECT_URL=your_supabase_direct_url

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Resend Email
RESEND_API_KEY=your_resend_api_key

# Arcjet Security
ARCJET_KEY=your_arcjet_key

# Inngest (set to 1 for local development)
INNGEST_DEV=1
```

### Getting API Keys

| Service | URL |
|---------|-----|
| Clerk | https://clerk.com |
| Supabase | https://supabase.com |
| Google Gemini AI | https://aistudio.google.com/app/apikey |
| Resend | https://resend.com |
| Arcjet | https://app.arcjet.com |
| Inngest | https://inngest.com |

---

##  Database Setup

This project uses **Supabase** (PostgreSQL) with **Prisma ORM**.

### Schema Overview

```prisma
model User {
  id          String    @id @default(uuid())
  clerkUserId String    @unique
  email       String    @unique
  name        String?
  imageUrl    String?
  accounts    Account[]
  transactions Transaction[]
  budgets     Budget[]
}

model Account {
  id           String   @id @default(uuid())
  name         String
  type         AccountType  # CURRENT | SAVINGS
  balance      Decimal  @default(0)
  isDefault    Boolean  @default(false)
  transactions Transaction[]
}

model Transaction {
  id                String            @id @default(uuid())
  type              TransactionType   # INCOME | EXPENSE
  amount            Decimal
  description       String?
  date              DateTime
  category          String
  isRecurring       Boolean           @default(false)
  recurringInterval RecurringInterval? # DAILY | WEEKLY | MONTHLY | YEARLY
  status            TransactionStatus  @default(COMPLETED)
}

model Budget {
  id            String    @id @default(uuid())
  amount        Decimal
  lastAlertSent DateTime?
}
```

### Push schema to database

```bash
npx prisma db push
```

### Generate Prisma Client

```bash
npx prisma generate
```

---

##  Deployment

This app is deployed on **Vercel** with automatic CI/CD from GitHub.

### Steps to Deploy

#### 1. Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin master
```

#### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Add all environment variables in Vercel dashboard
5. Click **Deploy**

#### 3. Add Environment Variables in Vercel

Go to **Project Settings** → **Environment Variables** and add all variables from your `.env` file.

#### 4. Set up Inngest for Production

1. Go to [inngest.com](https://inngest.com)
2. Connect your Vercel project
3. Your background jobs will run automatically in production

---

##  Screenshots

### Landing Page
- Hero section with gradient title and AI banner
- Features, How It Works, Testimonials sections
- CTA with animated button

### Dashboard
- Monthly budget progress with color indicators
- Recent transactions with income/expense breakdown
- Monthly expense pie chart by category
- Account cards with balance display

### Transaction Form
- AI Receipt Scanner with Gemini AI
- Income/Expense type selector
- Category selection with color-coded badges
- Recurring transaction setup
- Date picker

### Account Page
- Transaction history chart (7D, 1M, 3M, 6M, All Time)
- Total Income, Expenses, Net summary
- Transaction table with search, filter, sort, pagination
- Bulk delete functionality

---

##  Security Features

- **Arcjet** — Rate limiting (10 requests/minute per user) and bot detection
- **Clerk** — JWT-based authentication with session management
- **Protected Routes** — Middleware-based route protection
- **Server Actions** — All database operations run server-side only
- **Environment Variables** — All secrets stored securely

---

##  Background Jobs (Inngest)

| Function | Schedule | Description |
|----------|----------|-------------|
| `triggerRecurringTransactions` | Daily at midnight | Finds and triggers due recurring transactions |
| `processRecurringTransaction` | On event | Creates new transaction from recurring template |
| `checkBudgetAlerts` | Every 6 hours | Sends email alert when budget exceeds 80% |
| `generateMonthlyReports` | 1st of each month | Sends AI-generated monthly financial report |

---

##  Email Features

Built with **Resend** + **React Email**:

- **Budget Alert Email** — Sent when monthly expenses exceed 80% of set budget
- **Monthly Report Email** — AI-generated insights about spending patterns sent on the 1st of each month

---

##  Author

**Akilesh S**
- GitHub: [@akileshsekar2005](https://github.com/akileshsekar2005)
- Email: akileshsekar2005@gmail.com

---

## 📄 License

This project is for portfolio and educational purposes.

---

*Built with ❤️ by Akilesh S*
