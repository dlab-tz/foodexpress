const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.json(restaurant);
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
    const restaurant = new Restaurant(req.body);
    const savedRestaurant = await restaurant.save();

    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});