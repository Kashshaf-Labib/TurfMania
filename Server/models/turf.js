const mongoose = require('mongoose');
const { Schema } = mongoose;





const TurfSchema = new mongoose.Schema({
    name: String,
    location: String,
    imageURL: String,
    facilities: [String],
    ratePerHour: Number,
  
});

const TurfModel = mongoose.model("turfs", TurfSchema);

module.exports = TurfModel;
