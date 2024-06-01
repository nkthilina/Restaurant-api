const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  telephone: {
    type: Number,
    required: true,
  }
})

const RestaurantModel = mongoose.model("restaurants", restaurantSchema);
module.exports = RestaurantModel;
