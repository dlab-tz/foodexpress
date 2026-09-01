const express = require("express");
const pool = require("./db");

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("FoodExpress server is running!");
});
app.get("/restaurants",async (req,res) =>{
  try{
    const result = await pool.query("SELECT*FROM restaurants");
    res.json(result.rows);
  }catch (err) {
    console.error(err);
    res.status(500).json({error:"Server error"});
  }
});
app.get("/restaurants/:id",async (req,res) =>{
  try{
    const {id} = req.params;
    const result = await pool.query("SELECT*FROM restaurants WHERE id = $1",[id]);
    if (result.rows.length === 0){
      return res.status(404).json({error:"Restaurants not found"});
    }
    res.json(result.rows[0]);
  } catch (err){
    console.error(err);
    res.status(500).json({error:"Server error"});
  }
});
app.get("/restaurants/:id/menu",async (req,res) => {
  try{
    const {id} = req.params;
    const result = await pool.query("SELECT*FROM menu_items WHERE restaurant_id = $1",[id]);
    res.json(result.rows);
  }catch (err){
    console.error(err);
    res.status(500).json({error:"Server error"});
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});