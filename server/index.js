const express = require('express');
const supabase = require('./supabase');
require('dotenv').config();

const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test route to check if server is working
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get("/restaurants", async (req, res) => {
  try {
    const { data, error } = await supabase.from("Restaurants").select("*");
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from("Restaurants").select("*").eq("id", id).single();
    if (error) return res.status(404).json({ error: "Restaurant not found" });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/restaurants/:id/menu", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from("MenuItems").select("*").eq("restaurant_id", id);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});