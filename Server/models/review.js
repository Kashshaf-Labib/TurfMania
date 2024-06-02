const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'customers' },
  turf_id: { type: Schema.Types.ObjectId, ref: 'turfs' },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const ReviewModel = mongoose.model('reviews', ReviewSchema);

module.exports = ReviewModel;

