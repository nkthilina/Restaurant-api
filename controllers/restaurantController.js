const RestaurantModel = require("../models/Restaurant");

// show all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find({});
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// show the relevant restaurant by id
exports.getRestaurantById = async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await RestaurantModel.findById({ _id: id });
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = await RestaurantModel.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update restaurant details
exports.updateRestaurant = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await RestaurantModel.findByIdAndDelete({ _id: id });
    if (!restaurant) {
      return res
        .status(404)
        .json({ message: "Restaurant not found with that id ${id}." });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
