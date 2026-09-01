const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing SUPABASE_URL or SUPABASE_ANON_KEY. Copy server/.env.example to server/.env and fill in your Supabase credentials.'
  );
}

// supabase-js's realtime client requires a native WebSocket, which Node.js only
// provides from v22+. This app doesn't use realtime, but the client is created
// eagerly, so a polyfill keeps it from crashing on older Node versions.
const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: { transport: require('ws') },
});

module.exports = supabase;