const mongoose = require('mongoose');
const { Schema } = mongoose;





  const bookingSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    turf_id: { type: Schema.Types.ObjectId, ref: 'Turf' },
    timeslot_id: { type: Schema.Types.ObjectId, ref: 'Timeslot' },
    start_time: String,
    end_time: String,
    date: Date,
    booking_date: { type: Date, default: Date.now },
    status: { type: String, default: 'confirmed' }
  });
  
  const Booking = mongoose.model('Booking', bookingSchema);


module.exports = Booking;