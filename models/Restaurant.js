const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  contact: Number
  // name: {
  //   type: String,
  //   required: true,
  // },
  // address: {
  //   type: String,
  //   required: true,
  // },
  // contact: {
  //   type: Number,
  //   required: true,
  // }
})

const RestaurantModel = mongoose.model("restaurants", restaurantSchema);
module.exports = RestaurantModel;
