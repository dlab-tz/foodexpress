const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const restaurantsRouter = require("./services/restaurants");

app.use("/restaurants", restaurantsRouter);

app.get("/", (req, res) => {
  res.send("FoodExpress server is running!");
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});