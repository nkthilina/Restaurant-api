const express = require("express");
const mongoose = require("mongoose");
const app = express();
const RestaurantModel = require("./models/Restaurant");

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/HyperByte_Careers-Test-DB")
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Hello World Test!");
});

app.get("/api/", (req, res) => {
  res.send("New test API");
});

app.get("/restaurants", async(req, res) => {
  try {
    const restaurants = await RestaurantModel.find({});
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/restaurants", async (req, res) => {
  try {
    const restaurants = await RestaurantModel.create(req.body);
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
