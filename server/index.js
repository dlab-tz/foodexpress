const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const restaurantsRouter = require('./services/restaurants');
app.use('/restaurants', restaurantsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});