# FoodExpress — Client

React (Vite) frontend for FoodExpress.

## Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env` with your Supabase project's URL and anon key if the client talks to Supabase directly (Project Settings → API in the Supabase dashboard). All client env vars must be prefixed `VITE_` to be exposed to the app.

## Running

```bash
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # run eslint
```

## Notes

- The app currently talks to the [server](../server) API, which runs separately (see the root [README](../README.md)) — start both to develop end-to-end.
- `@supabase/supabase-js` is not yet a dependency here; add it if the client needs to query Supabase directly instead of going through the server API.
