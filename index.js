const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const RestaurantModel = require("./models/Restaurant");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

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

// // edit restaurant
// app.patch("/restaurants/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const restaurant = await RestaurantModel.findById({ _id: id });
//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }
//     res.status(200).json(restaurant);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// update a restaurant
// app.put("/updateRestaurant/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const restaurant = await RestaurantModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }
//     const updatedRestaurant = await RestaurantModel.findById({ _id: id });
//     res.status(200).json(updatedRestaurant);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
app.get('/edit/:id', (req, res) => {
  const id = req.params.id
  RestaurantModel.findById({_id: id})
    .then((restaurant) => res.json(restaurant))
    .catch((err) => res.json(err));
})
app.put('/restaurants/:id',  (req, res) => {
  // try {
    const id = req.params.id;
    RestaurantModel.findByIdAndUpdate({ _id: id }, req.body)
    .then((updatedRestaurant) => res.json(updatedRestaurant))
    .catch((err) => res.json(err));
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
})

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
