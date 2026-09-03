const express = require('express');
const supabase = require('./supabase');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Test route to check if server is working
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Test route to check database connection
app.get('/restaurants', async (req, res) => {
  const { data, error } = await supabase.from('Restaurants').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});