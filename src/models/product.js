const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const productSchema = new Schema({
  name: String,
  description: String,
  quantity: Number,
  image: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 
module.exports = mongoose.model("Product", productSchema);