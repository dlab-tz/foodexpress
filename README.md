# FoodExpress

FoodExpress is a food ordering and delivery application. The project is a monorepo split into two independent apps that are developed and run separately:

```
foodexpress/
├── client/   React app (Vite) — the customer-facing UI
└── server/   Node.js + Express API — backed by Supabase
```

> **Status:** the project is in initial setup — scaffolding and database configuration are in progress. Expect the API and UI to be minimal for now.

## Getting started

Each app has its own dependencies, scripts, and environment variables. Set them up independently, and run them in two separate terminals.

### 1. Server (API)

```bash
cd server
npm install
cp .env.example .env   # then fill in your Supabase credentials
npm run dev
```

See [server/README.md](server/README.md) for details.

### 2. Client (UI)

```bash
cd client
npm install
cp .env.example .env   # then fill in your Supabase credentials (if used)
npm run dev
```

See [client/README.md](client/README.md) for details.

## Tech stack

- **Client:** React 19, Vite
- **Server:** Node.js, Express 5
- **Database:** Supabase (Postgres)

## Environment variables

Neither app shares a `.env` file — each has its own `.env.example` in its own folder. Never commit a real `.env` file; only commit `.env.example` with placeholder values.
