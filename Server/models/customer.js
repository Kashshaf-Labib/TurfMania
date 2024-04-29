
const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  username: { type: String, unique: true }, // Enforce unique constraint for username field
  email: { type: String, unique: true }, // Enforce unique constraint for email field
  password: String,
  avatar:String,
  createdAt: {type:Date, default: Date.now()},
 
  inventory:[{
    
      date: {
        type: Date,
        unique: true // Ensure each date is unique
    },
    time:{
      type:String
    },
    turfs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'turfs' }],
    

  }]
});

const CustomerModel = mongoose.model("customers", CustomerSchema);

module.exports = CustomerModel;
