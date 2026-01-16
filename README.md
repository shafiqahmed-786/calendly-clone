# Calendly Clone – Fullstack Assignment

## Tech Stack
- Frontend: Next.js (App Router)
- Backend: Node.js + Express
- Database: SQLite + Prisma

## Features
- Event types with unique booking links
- Weekly availability
- Slot generation with buffer handling
- Public booking page
- Meetings dashboard
- Rescheduling via token

## Design Decisions
- SQLite used for development simplicity
- Rescheduling implemented as cancel + recreate
- Server Components used for dashboard pages

## How to Run
### Backend
cd calendly-clone-backend
npm install
npm run dev

### Frontend
cd calendly-clone-frontend
npm install
npm run dev
