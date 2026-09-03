# FoodExpress — Server

Express API for FoodExpress, backed by Supabase.

## Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env` with your Supabase project's URL and anon key (Project Settings → API in the Supabase dashboard).

| Variable            | Description                          |
| ------------------- | ------------------------------------- |
| `SUPABASE_URL`       | Your Supabase project URL             |
| `SUPABASE_ANON_KEY`  | Your Supabase project's anon/public key |
| `PORT`               | Port the API listens on (default 5000) |

## Running

```bash
npm run dev    # restarts on file changes
npm start      # plain run, no watch
```

## Routes

- `GET /` — health check
- `GET /restaurants` — reads from the `Restaurants` table in Supabase

## Notes

- Once the client needs to call this API from a different origin (e.g. the Vite dev server on port 5173), add [`cors`](https://www.npmjs.com/package/cors) middleware.
- Double-check the Supabase table name/casing (`Restaurants` in [index.js](index.js)) matches what you create in the database — unquoted Postgres identifiers are case-insensitive and lowercased by default, so a table created without quotes will actually be named `restaurants`.
