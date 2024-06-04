// Load environment variables from .env file
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const restaurantRoutes = require('./routes/restaurantRoutes');

app.use(cors());

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the environment variables
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;
const secretKey = process.env.SECRET_KEY;
const apiKey = process.env.API_KEY;

mongoose
  .connect(databaseUrl)
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.error('Database connection error', err));


// testing the connection
// app.get("/", (req, res) => {
//   res.send("Hello World Test!");
// });

// app.get('/', (req, res) => {
//   res.send(`Your API key is ${apiKey}`);
// });

app.get("/api/", (req, res) => {
  res.send("New test API");
});
app.get("/", (req, res) => {
  res.send("Docker is running successfully.");
});
// end testing the connection

// routes
app.use("/restaurants", restaurantRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
