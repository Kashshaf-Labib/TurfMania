const mongoose = require('mongoose');
const { Schema } = mongoose;





const TournamentSchema = new mongoose.Schema({
    turf_id: { type: Schema.Types.ObjectId, ref: 'turfOwners' },
    creator_id: { type: Schema.Types.ObjectId, ref: 'customers' },
    matchnumber:Number,
    is_booked: { type: Boolean, default: false }

  
});

const TournamentModel = mongoose.model("tournament", TournamentSchema);

module.exports = TournamentModel;
