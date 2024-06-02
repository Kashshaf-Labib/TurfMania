const mongoose = require('mongoose');
const { Schema } = mongoose;







const timeslotSchema = new Schema({
    turf_id: { type: Schema.Types.ObjectId, ref: 'turfs' },
    date: Date,
    timeslots: [
      {
        start_time: String,
        end_time: String,
        is_booked: { type: Boolean, default: false },
        booking_id: { type: Schema.Types.ObjectId, ref: 'bookings', default: null }
      }
    ]
  });
  
  const Timeslot = mongoose.model('timeslots', timeslotSchema);
  
  // Booking Schema
  


module.exports = Timeslot;
