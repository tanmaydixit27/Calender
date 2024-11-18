const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  datetime: { type: Date, required: true },
  tag: { type: String },
  color: { type: String, default: '#e3f2fd' }, // Default color
  link: { type: String }, // Optional field for event links
});

module.exports = mongoose.model('Event', eventSchema);
