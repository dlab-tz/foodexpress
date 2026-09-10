# FoodExpress — Client

React (Vite) frontend for FoodExpress.

## Setup

```bash
npm install
cp .env.example .env
```

| Variable                | Description                                                        |
| ----------------------- | ------------------------------------------------------------------- |
| `VITE_API_URL`           | Base URL of the [server](../server) API (default `http://localhost:5000`) |
| `VITE_SUPABASE_URL`      | Your Supabase project URL — only needed if the client queries Supabase directly |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase project's anon/public key — same as above |

All client env vars must be prefixed `VITE_` to be exposed to the app. Use `VITE_API_URL` instead of hardcoding `http://localhost:5000` in fetch calls — e.g. `` fetch(`${import.meta.env.VITE_API_URL}/restaurants`) `` — so it keeps working once the API is deployed somewhere other than localhost.

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
