const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String },           
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  face_data: { type: String, default: null },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
