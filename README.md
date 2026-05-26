# FDA Ghana Regulation Management System (FRMS)

> A national-scale enterprise RegTech platform that digitizes, automates, and secures the full regulatory lifecycle of the Food and Drugs Authority Ghana — from product application submission to certificate issuance and public verification.

---

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)](https://postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-6.7-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io)
[![AWS](https://img.shields.io/badge/AWS_S3-Cloud-FF9900?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## Table of Contents

- [What Is FRMS](#what-is-frms)
- [The Problem It Solves](#the-problem-it-solves)
- [How It Works — User Journey](#how-it-works--user-journey)
- [Core Features](#core-features)
- [Design System](#design-system)
- [Architecture Overview](#architecture-overview)
- [Full Project Structure](#full-project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## What Is FRMS

FRMS is a **government-grade regulatory platform** built for the Food and Drugs Authority of Ghana. It replaces manual, paper-based workflows with a centralized digital system where:

- **Manufacturers and importers** submit product registration applications online
- **FDA officers and reviewers** process, review, and approve applications through role-based workflows
- **The public** can verify any approved product's authenticity via QR code

Think of it as a full-stack digital government office — secure, traceable, and built to operate at national scale.

---

## The Problem It Solves

Before FRMS, Ghana's FDA regulatory process involved:

| Old Way | The Real Cost |
|---|---|
| Paper-based applications | Weeks of delays, lost documents |
| Physical office visits | Applicants traveling multiple times |
| Manual department routing | No visibility into application status |
| Disconnected approval chains | No audit trail, accountability gaps |
| Certificate fraud | No public verification mechanism |
| No deadline enforcement | Regulatory SLAs routinely missed |

FRMS addresses every one of these pain points with a purpose-built digital system.

---

## How It Works — User Journey

### For Applicants (Manufacturers / Importers)

```
Register Account → Submit Application → Upload Documents
→ Track Status in Real Time → Receive Certificate → Share QR Code
```

### For FDA Officers

```
Login → View Assigned Applications → Review Documents
→ Add Scientific Notes → Approve / Reject / Escalate → Monitor SLAs
```

### For the General Public

```
Scan QR Code on Product → Redirected to Public Verification Page
→ View FDA-Approved Product Record → Confirm Authenticity
```

---

## Core Features

### Integrated Registration Portal

The applicant-facing face of FRMS. Built as a guided multi-step experience.

- **Multi-step registration form** with progress saving — applicants never lose work
- **Drag-and-drop document upload** with cloud storage (AWS S3)
- **Smart form validation** — prevents incomplete or incorrectly formatted submissions
- **Real-time application tracking** — applicants see exactly where their application sits in the review pipeline
- **Mobile-responsive** — works on all devices, including low-bandwidth conditions

### Departmental Workflow Engine

The internal operations layer used by FDA staff.

- **Role-based routing** — applications automatically route to the right department (scientific review, legal, labelling, etc.)
- **Approval pipeline** — multi-level review with escalation support for complex cases
- **Internal review notes** — officers leave comments visible only to FDA staff
- **Activity audit trail** — every action is logged with timestamp and officer identity
- **Officer performance dashboard** — supervisors can monitor workload distribution

### Statutory Timeline Tracker

Regulatory bodies have legal deadlines. FRMS enforces them automatically.

- **SLA engine** — each application type has a defined response window; the system counts down from submission
- **Clock-stop logic** — timer pauses when FDA requests more information from the applicant, resumes on response
- **Automated overdue alerts** — escalation emails and dashboard flags when deadlines approach or are missed
- **Compliance reporting** — management can export SLA adherence reports

### Secure Verification & Certificate Issuance

The trust layer that connects approved products to the public.

- **Automated PDF certificate generation** on approval, signed with institutional details
- **Unique QR code per approval** — embedded in the certificate, links to a live public registry
- **Public verification page** — anyone can scan and confirm a product is genuinely FDA-approved
- **Immutable approval records** — approved records cannot be edited without a full audit event

---

## Design System

### Color Palette

The palette is built around national identity and institutional trust.

```css
/* Primary — Deep Authority Navy */
--color-primary:        #0D1B2A;
--color-primary-light:  #1A3047;

/* Brand Accent — Ghana Gold */
--color-gold:           #D4A017;
--color-gold-light:     #F0C040;

/* Health Accent — Regulatory Green */
--color-green:          #00784A;
--color-green-light:    #00A36C;

/* Surface */
--color-surface:        #F5F7FA;
--color-card:           #FFFFFF;
--color-border:         #E2E8F0;

/* Status Colors */
--color-success:        #059669;
--color-warning:        #D97706;
--color-error:          #DC2626;
--color-info:           #0369A1;

/* Text */
--color-text-primary:   #0F172A;
--color-text-secondary: #475569;
--color-text-muted:     #94A3B8;
```

### Typography

```css
/* Headings — Editorial authority */
font-family: 'Sora', sans-serif;

/* Body — Clean readability */
font-family: 'DM Sans', sans-serif;

/* Monospace — Code, IDs, references */
font-family: 'JetBrains Mono', monospace;
```

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

### Spacing Scale (Tailwind custom tokens)

```js
// tailwind.config.ts
spacing: {
  '18': '4.5rem',
  '22': '5.5rem',
  '88': '22rem',
  '112': '28rem',
  '128': '32rem',
}
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│          Next.js 15 App Router + React 19 + TypeScript          │
│   Applicant Portal │ Officer Dashboard │ Admin Panel │ Public    │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS / REST
┌──────────────────────────▼──────────────────────────────────────┐
│                        API LAYER                                │
│              Next.js Route Handlers + Middleware                │
│     Auth Guards │ Rate Limiting │ Input Validation (Zod)        │
└──────┬──────────────────┬──────────────────────┬───────────────┘
       │                  │                       │
┌──────▼──────┐  ┌────────▼────────┐  ┌──────────▼──────────────┐
│  PostgreSQL │  │    AWS S3       │  │  Background Jobs         │
│  via Prisma │  │  Document Store │  │  SLA engine, Emails,     │
│  (Primary   │  │  + Presigned    │  │  QR generation, PDF      │
│   Database) │  │  URLs           │  │  certificates            │
└─────────────┘  └─────────────────┘  └─────────────────────────┘
```

---

## Full Project Structure

```
frms-fda-ghana/
│
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── verify/[qrToken]/page.tsx
│   │   └── layout.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/[token]/page.tsx
│   ├── (applicant)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── applications/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── documents/page.tsx
│   │   ├── certificates/page.tsx
│   │   ├── profile/page.tsx
│   │   └── settings/page.tsx
│   ├── (officer)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── queue/page.tsx
│   │   ├── review/[id]/page.tsx
│   │   ├── sla/page.tsx
│   │   └── reports/page.tsx
│   ├── (admin)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── users/page.tsx
│   │   ├── departments/page.tsx
│   │   ├── audit-log/page.tsx
│   │   └── system/page.tsx
│   └── api/
│       ├── auth/
│       ├── applications/
│       ├── certificates/
│       ├── uploads/
│       ├── sla/
│       └── admin/
│
├── components/
│   ├── layout/
│   ├── ui/
│   ├── dashboard/
│   ├── forms/
│   ├── upload/
│   ├── verification/
│   └── common/
│
├── lib/
├── hooks/
├── store/
├── middleware.ts
├── types/
├── prisma/
├── public/
├── styles/
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## API Reference

All routes require a valid session cookie unless marked `[Public]`.

### Authentication

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Create a new applicant account |
| `POST` | `/api/auth/[...nextauth]` | NextAuth login/logout |
| `POST` | `/api/auth/forgot-password` | Request password reset email |
| `POST` | `/api/auth/reset-password` | Submit new password with token |

### Applications

| Method | Route | Description | Role |
|---|---|---|---|
| `GET` | `/api/applications` | List applications (filtered by role) | All |
| `POST` | `/api/applications` | Create draft application | Applicant |
| `GET` | `/api/applications/[id]` | Get single application | Owner / Officer |
| `PATCH` | `/api/applications/[id]` | Update draft fields | Applicant |
| `POST` | `/api/applications/[id]/submit` | Submit for review | Applicant |
| `POST` | `/api/applications/[id]/review` | Officer review action | Officer+ |
| `GET` | `/api/applications/[id]/documents` | List documents | Owner / Officer |
| `POST` | `/api/applications/[id]/documents` | Attach document | Applicant |

### Certificates & Verification

| Method | Route | Description | Role |
|---|---|---|---|
| `POST` | `/api/certificates/[id]` | Generate certificate on approval | System |
| `GET` | `/api/certificates/[id]` | Download certificate PDF | Owner |
| `GET` | `/api/certificates/verify/[token]` | Verify QR token | `[Public]` |

### Uploads

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/uploads/presigned` | Get S3 presigned upload URL |

---

## Package Stack

### Prerequisites

- Node.js **v22+**
- PostgreSQL **16+**
- AWS account with S3 bucket
- [Resend](https://resend.com) account for email

### Frontend Packages

```bash
# Core
npm install next@15 react@19 react-dom@19 typescript@5.8

# Styling
npm install tailwindcss@4 @tailwindcss/typography @tailwindcss/forms
npm install class-variance-authority clsx tailwind-merge

# UI Components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select @radix-ui/react-tabs
npm install @radix-ui/react-tooltip @radix-ui/react-progress
npm install lucide-react

# Animation
npm install motion@12

# Forms
npm install react-hook-form@8 @hookform/resolvers@3

# State management
npm install zustand@5

# Data tables
npm install @tanstack/react-table@8

# Charts
npm install recharts@2.14

# QR codes
npm install qrcode@1.5 @types/qrcode

# Drag and drop
npm install @dnd-kit/core @dnd-kit/sortable

# Date handling
npm install date-fns@4
```

### Backend Packages

```bash
# Auth
npm install next-auth@5 @auth/prisma-adapter

# Database
npm install prisma@6 @prisma/client@6

# Validation
npm install zod@3

# File upload (AWS S3)
npm install @aws-sdk/client-s3@3 @aws-sdk/s3-request-presigner@3

# PDF generation
npm install @react-pdf/renderer@4

# Email
npm install resend@4

# Security
npm install jose@5 bcryptjs@3 @types/bcryptjs

# Dev dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D eslint eslint-config-next prettier
npm install -D tsx nodemon
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values. See the internal setup guide for the full configuration reference. **Never commit `.env.local` to version control.**

```bash
cp .env.example .env.local
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/frms-fda-ghana.git
cd frms-fda-ghana
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
# Fill in .env.local with your actual credentials
```

### 4. Set up the database

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set all environment variables in the Vercel dashboard under **Project → Settings → Environment Variables**.

### Docker (Self-hosted)

A `Dockerfile` and `docker-compose.yml` are included in the repository for self-hosted or government server deployments. Refer to the internal deployment guide for production configuration.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit with clear messages: `git commit -m "feat: add SLA clock-stop logic"`
4. Push to your fork and open a Pull Request

**Commit convention:**
- `feat:` — new feature
- `fix:` — bug fix
- `refactor:` — code change with no functional difference
- `docs:` — documentation only
- `chore:` — build process, dependencies

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">
Built for the Food and Drugs Authority of Ghana<br>
Advancing regulatory technology for public health protection
</div>
