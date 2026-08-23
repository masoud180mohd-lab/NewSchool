# School Management System

A comprehensive multi-tenant SaaS School Management System built with Next.js, TypeScript, and Tailwind CSS.

## Overview

This platform allows multiple schools to manage their daily operations including students, parents, staff, classes, attendance, exams, marks, report cards, fees, invoices, payments, and more. The system includes a Super Admin portal for managing schools and subscriptions.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui style components
- **Form Handling**: React Hook Form + Zod
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Utilities**: date-fns
- **HTTP Client**: Axios (typed fetch wrapper ready)

## Features

### Super Admin Portal
- Dashboard with key metrics
- Schools management (list, view, add)
- School profile with subscription details
- Suspend/Reactivate schools
- Update subscription plans
- System settings

### School Admin Portal (Phase 3+)
- Students management
- Parents management
- Staff management
- Classes and subjects
- Attendance tracking
- Exams and marks
- Report cards
- Fee structures
- Invoices and payments
- Announcements
- Reports
- School settings

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
cd school-management-system
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Other Scripts

- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Demo Login Credentials

### Super Admin
- Email: `superadmin@system.com`
- Password: `password`

### School Admin
- Email: `admin@school.com`
- Password: `password`

### Teacher
- Email: `teacher@school.com`
- Password: `password`

### Accountant
- Email: `accountant@school.com`
- Password: `password`

## Project Structure

```
src/
├── app/                    # Next.js App Router routes
│   ├── (public)/          # Public routes (login, forgot-password)
│   ├── (super-admin)/     # Super Admin protected routes
│   └── (school)/          # School Admin protected routes
├── components/            # Shared UI components
│   ├── ui/               # Base UI components (button, input, etc.)
│   └── layout/           # Layout components (AppShell, Sidebar, etc.)
├── features/             # Domain-specific feature modules
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and helpers
├── mocks/                # Mock data and mock database
├── providers/            # App providers (Query, Auth, Toast)
├── services/             # API service layer
├── stores/               # Zustand stores
└── types/                # TypeScript type definitions
```

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
NEXT_PUBLIC_APP_NAME=School Management System
NEXT_PUBLIC_USE_MOCKS=true
NEXT_PUBLIC_DEFAULT_CURRENCY=TZS
```

## Multi-Tenancy

The system supports multiple schools with isolated data. Each school-owned entity includes a `schoolId` field to ensure data separation.

## Mock Data

The application uses mock data for development. Mock users, schools, students, and other entities are seeded in `src/mocks/data.ts`.

## Phase Roadmap

- ✅ **Phase 1**: Project foundation, authentication, app shell, dashboards
- ✅ **Phase 2**: Super Admin school management and onboarding
- ⏳ **Phase 3**: Students, Parents, Staff management
- ⏳ **Phase 4**: Classes, Subjects, Attendance
- ⏳ **Phase 5**: Exams, Marks, Report Cards
- ⏳ **Phase 6**: Finance (Fee structures, Invoices, Payments)
- ⏳ **Phase 7**: Reports, Settings, Roles, Polish

## License

MIT
