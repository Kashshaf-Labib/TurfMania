const mongoose = require('mongoose');
const { Schema } = mongoose;





  const MatchSchema = new Schema({
    tournament_id: Schema.Types.ObjectId,
   timeSlot:[String],
  
    date: Date,
    matches:[String],
   
    result: { type: String, default: 'Not played yet' }
  });
  
  const MatchModel = mongoose.model('match', MatchSchema);


module.exports = MatchModel;