
const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  username: { type: String, unique: true }, // Enforce unique constraint for username field
  email: { type: String, unique: true }, // Enforce unique constraint for email field
  password: String,
  avatar:String,
  createdAt: {type:Date, default: Date.now()},
 
 

});

const CustomerModel = mongoose.model("customers", CustomerSchema);

module.exports = CustomerModel;
