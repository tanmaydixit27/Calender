// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleSync: { type: Boolean, default: false },
  googleCalendarId: { type: String }, // Optional field for Google Calendar sync
});

module.exports = mongoose.model('User', userSchema);
