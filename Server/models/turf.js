const mongoose = require("mongoose");
const { Schema } = mongoose;

const TurfSchema = new mongoose.Schema({
  turfOwnerId: { type: Schema.Types.ObjectId, ref: "turfOwners" },
  name: String,
  location: String,
  imageURL: String,
  facilities: [String],
  ratePerHour: Number,
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
});

const TurfModel = mongoose.model("turfs", TurfSchema);

module.exports = TurfModel;
