const mongoose = require('mongoose');
const { Schema } = mongoose;





  const MatchSchema = new Schema({
    tournament_id: Schema.Types.ObjectId,
    timeslot_id: { type: Schema.Types.ObjectId, ref: 'Timeslot' },
    start_time: String,
    end_time: String,
    date: Date,
   
    result: { type: String, default: 'Not played yet' }
  });
  
  const MatchModel = mongoose.model('match', MatchSchema);


module.exports = MatchModel;