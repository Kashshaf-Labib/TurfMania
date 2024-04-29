const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: Date,
    timeSlot: String,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'], // Add more status options as needed
        default: 'pending',
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers' // Assuming your customer model is named 'Customer'
    }
    // You can add more fields here as needed, such as user details, payment info, etc.
});

module.exports = mongoose.model('Booking', BookingSchema);

const TurfSchema = new mongoose.Schema({
    name: String,
    location: String,
    imageURL: String,
    facilities: String,
    ratePerHour: Number,
    bookings: [BookingSchema],
   
    dates: [{
        date: {
            type: Date
        },
        availableTimeSlots: {
            type: [String],
            default: [
                '07:00 - 08:00',
                '08:00 - 09:00',
                '09:00 - 10:00',
                '10:00 - 11:00',
                '11:00 - 12:00',
                '12:00 - 13:00',
                '13:00 - 14:00',
                '14:00 - 15:00',
                '15:00 - 16:00',
                '16:00 - 17:00',
                '17:00 - 18:00',
                '18:00 - 19:00',
                '19:00 - 20:00',
                '20:00 - 21:00',
                '21:00 - 22:00',
                '22:00 - 23:00',
                '23:00 - 00:00',
            ]
        },
        unavailableTimeSlots: {
            type: [String],
            default: []
        }
    }],
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
});

const TurfModel = mongoose.model("turfs", TurfSchema);

module.exports = TurfModel;
