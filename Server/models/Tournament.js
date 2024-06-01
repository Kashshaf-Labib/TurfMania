const mongoose = require('mongoose');
const { Schema } = mongoose;





const TournamentSchema = new mongoose.Schema({
    turf_id: { type: Schema.Types.ObjectId, ref: 'Turf' },
    creator_id: { type: Schema.Types.ObjectId, ref: 'customers' },
  
});

const TournamentModel = mongoose.model("tournament", TournamentSchema);

module.exports = TournamentModel;
