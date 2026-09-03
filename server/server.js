const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/restaurants", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("restaurants")
      .select("*");

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/restaurants/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("restaurants")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({ error: "Restaurant not found" });
      }

      throw error;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello from my Express server!");
});

app.get("/about", (req, res) => {
  res.send("This is the About page.");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/api/foods", (req, res) => {
  
  const foods = [
    {
      id: 1,
      name: "Chicken Burger",
      category: "Burger",
      price: 8000,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      category: "Pizza",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "French Fries",
      category: "Sides",
      price: 5000,
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80",
    },
  ];     
  res.json(foods);
});

app.post("/restaurants", async (req, res) => {
  try {
    const { name, description, image_url, cuisine_type, rating } = req.body;

    const { data, error } = await supabase
      .from("restaurants")
      .insert([
        {
          name,
          description,
          image_url,
          cuisine_type,
          rating,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});