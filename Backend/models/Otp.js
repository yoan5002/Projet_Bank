const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    otp_code: { type: String, required: true },
    expires_at: { type: Date, required: true }
});

module.exports = mongoose.model('Otp', OtpSchema);
