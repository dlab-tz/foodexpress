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
cp .env.example .env   # then fill in your Supabase credentials — see "Database setup" below
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

## Database setup (Supabase)

Each student sets up **their own** Supabase project — that's the "online Postgres" this project talks to. It's free and takes a few minutes.

1. Create a project at [supabase.com](https://supabase.com) (free tier is enough).
2. In the dashboard, go to **Project Settings → API** and copy the **Project URL** and **anon public key** into `server/.env` (and `client/.env` if the client will query Supabase directly).
3. Create the tables and add sample data using one of the two options below.

### Option A — SQL Editor (fastest)

In the Supabase dashboard, open **SQL Editor → New query**, paste the script below, and click **Run**. It creates the `Restaurants` and `MenuItems` tables (matching the names already used in [server/index.js](server/index.js)), makes them publicly readable, and inserts a few sample rows.

```sql
create table "Restaurants" (
  id bigint generated always as identity primary key,
  name text not null,
  description text,
  image_url text,
  created_at timestamptz not null default now()
);

create table "MenuItems" (
  id bigint generated always as identity primary key,
  restaurant_id bigint not null references "Restaurants"(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10,2) not null,
  image_url text,
  created_at timestamptz not null default now()
);

-- Supabase enables Row Level Security by default, which blocks the anon
-- key from reading anything until a policy allows it.
alter table "Restaurants" enable row level security;
alter table "MenuItems" enable row level security;
create policy "Public read access" on "Restaurants" for select using (true);
create policy "Public read access" on "MenuItems" for select using (true);

insert into "Restaurants" (name, description) values
  ('Mama Nia Kitchen', 'Home-style Tanzanian dishes'),
  ('Pizza Corner', 'Wood-fired pizza and pasta');

insert into "MenuItems" (restaurant_id, name, description, price)
select id, 'Ugali na Nyama', 'Ugali served with beef stew', 8000 from "Restaurants" where name = 'Mama Nia Kitchen'
union all
select id, 'Pilau', 'Spiced rice with beef', 7000 from "Restaurants" where name = 'Mama Nia Kitchen'
union all
select id, 'Margherita Pizza', 'Tomato, mozzarella, basil', 12000 from "Restaurants" where name = 'Pizza Corner'
union all
select id, 'Spaghetti Bolognese', 'Pasta with meat sauce', 10000 from "Restaurants" where name = 'Pizza Corner';
```

### Option B — Table Editor (click-through, good for learning the tool)

1. Go to **Table Editor → New table** and build `Restaurants` and `MenuItems` with the columns above (use the exact capitalized names so they match the code).
2. Under **Authentication → Policies**, add a `select` policy allowing public read access on both tables (same reason as the RLS note in Option A — without it, the API will return empty results even though the tables have data).
3. Open each table and use **Insert → Insert row** (or **Insert → Import data from CSV** for bulk) to add sample restaurants and menu items.

Once seeded, `npm run dev` in `server/` and visiting `http://localhost:5000/restaurants` should return your sample restaurants as JSON.

## Tech stack

- **Client:** React 19, Vite
- **Server:** Node.js, Express 5
- **Database:** Supabase (Postgres)

## Environment variables

Neither app shares a `.env` file — each has its own `.env.example` in its own folder. Never commit a real `.env` file; only commit `.env.example` with placeholder values.
