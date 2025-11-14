# Backend (Node + Express)

Run locally:

```powershell
cd "c:/Users/hp/Desktop/API and Landing Pages/university-landing/backend"
npm install
cp .env.example .env
# edit .env to set MONGO_URI and PIPEDREAM_WEBHOOK
npm run dev
```

Endpoints:
- `GET /api/fees?univ=1` - returns nested JSON of courses and fees
- `POST /api/lead` - accepts lead data and forwards to Pipedream webhook (if `PIPEDREAM_WEBHOOK` is set) and saves to MongoDB

Seeding the DB:

1. Ensure `MONGO_URI` is set in `.env`.
2. Run the seed script to insert two universities:

```powershell
cd "c:/Users/hp/Desktop/API and Landing Pages/university-landing/backend"
node scripts/seed.js
```

The `/api/fees` endpoint will read from the DB first and fallback to static data if the DB is unavailable.
