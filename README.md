# University Landing Pages Project

This repo contains a frontend (Vite + React + Tailwind) and a backend (Node + Express + MongoDB) for two single-page landing pages.

Quick start (local):

1. Frontend

```powershell
cd "c:/Users/hp/Desktop/API and Landing Pages/university-landing/frontend"
npm install
npm run dev
```

2. Backend

```powershell
cd "c:/Users/hp/Desktop/API and Landing Pages/university-landing/backend"
npm install
copy .env.example .env
# Edit .env and set MONGO_URI and optionally PIPEDREAM_WEBHOOK
npm run dev
```

Deployment notes:
- Frontend: Deploy to Vercel or Netlify (both provide free SSL). Build with `npm run build`.
- Backend: Deploy to Render/Heroku/Render. Ensure `MONGO_URI` and `PIPEDREAM_WEBHOOK` are set in environment variables.

Pipedream integration:
- Create a Pipedream HTTP source and set `PIPEDREAM_WEBHOOK` to the provided URL; the backend will forward leads to it.

Deliverables:
- Landing page URLs: Deploy frontend and set routes `/univ1` and `/univ2` (root defaults to `/univ1`).
- Drive link: Put this folder in your drive and share the link.
