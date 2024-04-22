const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: Date ,
    timeSlot: String,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'], // Add more status options as needed
        default: 'pending',
    },
    // You can add more fields here as needed, such as user details, payment info, etc.
});

const TurfSchema = new mongoose.Schema({
    name: String,
    location: String,
    imageURL: String,
    facilities: String,
    ratePerHour: Number,
    bookings: [BookingSchema],
    customers: [{ type: mongoose.Schema.Types.ObjectId, ref: "customers" }],
    date: {
      type: Date,
    
  },
  // Define available time slots
  availableTimeSlots: {
      type: [String],
      default: [
          '12:00 AM - 01:00 AM',
          '01:00 AM - 02:00 AM',
          '02:00 AM - 03:00 AM',
          '03:00 AM - 04:00 AM',
          '04:00 AM - 05:00 AM',
          '05:00 AM - 06:00 AM',
          '06:00 AM - 07:00 AM',
          '07:00 AM - 08:00 AM',
          '08:00 AM - 09:00 AM',
          '09:00 AM - 10:00 AM',
          '10:00 AM - 11:00 AM',
          '11:00 AM - 12:00 PM',
          '12:00 PM - 01:00 PM',
          '01:00 PM - 02:00 PM',
          '02:00 PM - 03:00 PM',
          '03:00 PM - 04:00 PM',
          '04:00 PM - 05:00 PM',
          '05:00 PM - 06:00 PM',
          '06:00 PM - 07:00 PM',
          '07:00 PM - 08:00 PM',
          '08:00 PM - 09:00 PM',
          '09:00 PM - 10:00 PM',
          '10:00 PM - 11:00 PM',
          '11:00 PM - 12:00 AM'
      ]
  },
  // Define unavailable time slots
  unavailableTimeSlots: {
      type: [String],
      default: []
  },
  status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
  },
});

const TurfModel = mongoose.model("turfs", TurfSchema);

module.exports = TurfModel;
