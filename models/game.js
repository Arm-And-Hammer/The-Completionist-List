const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  content: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const gameSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  esrbRating: String,
  notes: [noteSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);