# Event Match Hub

Event Match Hub is a centralized, web-based event management platform designed to simplify the discovery, registration, and administration of events such as volunteer programs, competitions, workshops, and professional activities. The platform connects participants and organizers within a single ecosystem, reducing manual workflows, improving communication, and ensuring the authenticity of tickets and digital certificates.

---

## Key Features

### User & Role Management
- Secure authentication using Supabase Auth (Email/Password and Google OAuth)
- Role-based access control (Organizer and Participant)
- JWT-protected API routes with server-side authorization checks

### Event Management
- Create, edit, publish, and archive events
- Public event listings and detailed event pages
- Search and filter by keyword, category, date, location, and price

### Registration & Payments
- Fast registration flow for free and paid events
- Secure payment processing via Stripe (test mode)
- Reliable order and payment confirmation using Stripe webhooks

### Ticketing & Check-in
- Automatic PDF ticket generation with unique QR codes
- Mobile-friendly QR code scanning for on-site check-in
- Secure backend validation of ticket authenticity and payment status

### Real-Time Features
- Live attendee count updates using Supabase Realtime
- Instant notifications for event updates and registrations

### AI Integration
- AI-assisted event description generation using the Gemini API
- Dedicated Python microservice to isolate AI workloads from the core backend

### Digital Certificates
- Automated generation of tamper-resistant digital certificates (PDF)
- QR-code–based verification to prevent certificate forgery

---

## System Architecture

- **Frontend:** React / Next.js with Tailwind CSS  
- **Backend:** Node.js with Express.js  
- **Database & Authentication:** Supabase (PostgreSQL, Realtime, RLS)  
- **Payments:** Stripe  
- **AI Microservice:** Python (FastAPI or Flask) + Gemini API  

---

## Technology Stack

- **Frontend:** React, Next.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Authentication:** Supabase Auth, JWT  
- **Database:** Supabase (PostgreSQL with Realtime)  
- **Payments:** Stripe  
- **AI Services:** Python, Gemini API  
- **Hosting:** Vercel, Render, Supabase  

---

## Installation & Setup

### Prerequisites
- Node.js v18+
- Python 3.9+
- Supabase account
- Stripe account (test mode)
- Gemini API key

---

## 1. Clone the Repository
```bash
git clone https://github.com/hoklin12/EventMatchHubProject.git
cd EventMatchHubProject
```

## 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Create a .env.local file in the frontend directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Create a .env file in the backend directory:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
JWT_SECRET=your_jwt_secret
```

## 4. AI Microservice Setup
```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload
```

### Create a .env file in the ai-service directory:
```env
GEMINI_API_KEY=your_gemini_api_key
```

---

## API Overview

Base API path:

```text
/api/v1
```

---

## Security Highlights

- JWT-based authentication and role-based authorization
- Supabase Row-Level Security (RLS) for database access control
- Server-side request validation and error handling
- Stripe PCI-compliant payment processing
- Cryptographic hash validation for QR-based tickets and certificates
- HTTPS enforced across all deployed services

---

## Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **AI Microservice:** Render / Vercel
- **Database & Auth:** Supabase Hosted
- **CI/CD:** GitHub Actions

---

## License

This project is developed for educational and portfolio purposes.
A production license can be added for commercial deployment.
