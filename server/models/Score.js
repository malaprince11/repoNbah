const mongoose = require('mongoose');

const { Schema } = mongoose;

const scoreSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  point: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: new Date(),
  },
});
const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;
