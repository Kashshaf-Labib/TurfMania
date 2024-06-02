const mongoose = require("mongoose");

const TurfOwnerSchema = new mongoose.Schema({
  username: { type: String, unique: true }, // Enforce unique constraint for username field
  email: { type: String, unique: true }, // Enforce unique constraint for email field
  password: String,
  avatar: String,
  nationalId: String,
  createdAt: { type: Date, default: Date.now() },
  turfs: [{ type: mongoose.Schema.Types.ObjectId, ref: "turfs" }],
  isFreezed: { type: Boolean, default: true },
});

const TurfOnweModel = mongoose.model("turfOwners", TurfOwnerSchema);

module.exports = TurfOnweModel;
