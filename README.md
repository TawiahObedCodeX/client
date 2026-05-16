

<!-- 3D Animated Header -->
<h1 align="center">
 ⚡ FDA Ghana Regulation Management System (FRMS)
</h1>

<h3 align="center">
 Enterprise Government Regulation Platform • Digital Transformation • RegTech Infrastructure
</h3>

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=30&duration=3000&pause=1000&color=00F7FF&center=true&vCenter=true&width=1000&lines=FDA+Ghana+Regulation+Management+System;Enterprise+Regulatory+Technology+(RegTech);Secure+Workflow+Automation;Government+Digital+Transformation;Built+With+Next.js+%26+TypeScript;Scalable+Cloud+Infrastructure+🚀" />

</div>

---

# 🏛️ About The Project

The **FDA Ghana Regulation Management System (FRMS)** is a modern enterprise-grade regulatory platform designed to digitize and automate the regulatory workflows of the Food and Drugs Authority (FDA) Ghana.

The platform transforms traditional paper-based product registration and approval systems into a secure, scalable, transparent, and high-performance digital ecosystem.

FRMS enables manufacturers, importers, and FDA officers to manage regulatory processes efficiently through modern web technologies, workflow automation, cloud infrastructure, and secure document management systems.

The project focuses on:

- ⚡ Digital Transformation
- 🔐 Enterprise Security
- 📑 Regulatory Workflow Automation
- ☁️ Cloud Infrastructure
- 📊 Transparency & Monitoring
- 🧠 Smart Compliance Systems
- 🏛️ Government Technology Innovation (GovTech)
- 🧬 Regulatory Technology (RegTech)

---

# 🌍 The Vision Behind FRMS

Historically, many regulatory processes relied heavily on manual paperwork, physical office visits, and disconnected systems. This created:

- Delays in approvals
- Administrative bottlenecks
- Poor application visibility
- Heavy documentation burdens
- Difficult compliance tracking

FRMS solves these challenges by introducing a centralized digital regulation platform where:

✅ Applications are submitted online  
✅ Reviews move through automated workflows  
✅ Documents are securely stored in the cloud  
✅ QR verification prevents fraud  
✅ Regulatory timelines are monitored automatically  
✅ Public product verification increases transparency  

This project represents a real-world enterprise software solution designed for national-scale regulatory operations.

---

# 🧠 Enterprise-Level Features

---

## 🔹 Integrated Registration Portal

A secure online registration portal that allows businesses to submit applications digitally.

### Features:
- Multi-step registration workflow
- Drag-and-drop document uploads
- Product registration dashboard
- Real-time application tracking
- Smart form persistence
- Responsive mobile-friendly UI

---

## 🔹 Departmental Workflow Engine

An internal enterprise workflow system for FDA staff and departments.

### Features:
- Role-based approval routing
- Department assignment logic
- Scientific review workflows
- Internal review notes
- Approval escalation pipeline
- Officer activity monitoring

---

## 🔹 Statutory Timeline Tracker

A compliance-aware monitoring engine designed for regulatory deadlines.

### Features:
- SLA tracking system
- Automated overdue alerts
- Escalation notifications
- Clock-stop logic
- Compliance monitoring dashboard

---

## 🔹 Secure Verification & QR Issuance

A public-facing product verification infrastructure.

### Features:
- Automated PDF certificate generation
- QR code verification system
- Public verification registry
- Authenticity validation
- Immutable approved records

---

# 🔐 Enterprise Security Architecture

FRMS implements modern enterprise-grade security practices:

| Security Feature | Description |
|---|---|
| AES-256 Encryption | Protects sensitive data |
| RBAC | Role-Based Access Control |
| Immutable Records | Prevents unauthorized modifications |
| Secure File Uploads | Cloud-secured document storage |
| Audit Logs | Tracks regulatory actions |
| Protected Routes | Authenticated access control |
| Secure APIs | Backend validation & authorization |

---

# ☁️ Cloud Infrastructure

The system is designed for scalability and production deployment.

### Infrastructure:
- AWS S3 Cloud Storage
- PostgreSQL Database
- Prisma ORM
- Secure API Layer
- Optimized File Handling
- Cloud Deployment Pipelines

---

# ⚙️ Tech Stack

<p align="center">

<!-- Frontend -->
<img src="https://skillicons.dev/icons?i=nextjs" height="65" alt="Next.js" />
<img src="https://skillicons.dev/icons?i=react" height="65" alt="React" />
<img src="https://skillicons.dev/icons?i=typescript" height="65" alt="TypeScript" />
<img src="https://skillicons.dev/icons?i=tailwind" height="65" alt="TailwindCSS" />
<img src="https://skillicons.dev/icons?i=javascript" height="65" alt="JavaScript" />

<!-- Backend -->
<img src="https://skillicons.dev/icons?i=nodejs" height="65" alt="Node.js" />
<img src="https://skillicons.dev/icons?i=express" height="65" alt="Express.js" />

<!-- Database -->
<img src="https://skillicons.dev/icons?i=postgres" height="65" alt="PostgreSQL" />
<img src="https://skillicons.dev/icons?i=prisma" height="65" alt="Prisma" />

<!-- Cloud -->
<img src="https://skillicons.dev/icons?i=aws" height="65" alt="AWS" />
<img src="https://skillicons.dev/icons?i=docker" height="65" alt="Docker" />
<img src="https://skillicons.dev/icons?i=vercel" height="65" alt="Vercel" />

<!-- Tools -->
<img src="https://skillicons.dev/icons?i=git" height="65" alt="Git" />
<img src="https://skillicons.dev/icons?i=github" height="65" alt="GitHub" />
<img src="https://skillicons.dev/icons?i=vscode" height="65" alt="VS Code" />
<img src="https://skillicons.dev/icons?i=figma" height="65" alt="Figma" />

</p>

---

# 📂 Enterprise Project Structure

```bash
frms-fda-ghana/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── new-registration/
│   │   │   └── page.tsx
│   │   ├── applications/
│   │   │   └── [id]/page.tsx
│   │   ├── profile/page.tsx
│   │   └── settings/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   │
│   ├── ui/
│   │
│   ├── dashboard/
│   │   ├── DashboardCards.tsx
│   │   ├── RecentApplicationsTable.tsx
│   │   └── StatusTimeline.tsx
│   │
│   ├── forms/
│   │   └── MultiStepRegistration.tsx
│   │
│   ├── upload/
│   │   └── FileUpload.tsx
│   │
│   ├── common/
│   │   ├── StatusBadge.tsx
│   │   ├── Loader.tsx
│   │   ├── Skeleton.tsx
│   │   └── Toast.tsx
│   │
│   └── modals/
│
├── lib/
│   ├── prisma.ts
│   ├── utils.ts
│   └── s3.ts
│
├── hooks/
│   └── useFormPersist.ts
│
├── store/
│   └── useAppStore.ts
│
├── types/
│   └── index.ts
│
├── prisma/
│   └── schema.prisma
│
├── public/
│   └── logo.svg
│
├── styles/
│
└── package.json
