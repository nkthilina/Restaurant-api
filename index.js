// Load environment variables from .env file
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const RestaurantModel = require("./models/Restaurant");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Use the environment variables
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;
const secretKey = process.env.SECRET_KEY;
const apiKey = process.env.API_KEY;

mongoose
  // .connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true})
  // .connect("mongodb://127.0.0.1:27017/HyperByte_Careers-Test-DB")
  .connect(databaseUrl)
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.error('Database connection error', err));

// testing the connection
// app.get("/", (req, res) => {
//   res.send("Hello World Test!");
// });

app.get('/', (req, res) => {
  res.send(`Your API key is ${apiKey}`);
});

app.get("/api/", (req, res) => {
  res.send("New test API");
});
// end testing the connection


// show all restaurants
app.get("/restaurants", async(req, res) => {
  try {
    const restaurants = await RestaurantModel.find({});
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// show the relevant restaurant
app.get("/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await RestaurantModel.findById({ _id: id });
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create new restaurant
app.post("/restaurants", async (req, res) => {
  try {
    const restaurants = await RestaurantModel.create(req.body);
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// edit restaurant details
app.get('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await RestaurantModel.findById({ _id: id });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update restaurant details
app.put('/restaurants/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedRestaurant = await RestaurantModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete restaurant
app.delete("/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await RestaurantModel.findByIdAndDelete({ _id: id });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found with that id ${id}." });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
