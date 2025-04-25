const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { registerUser, loginUser, verifyOtp,getCurrentUser } = require('../controllers/authController');


// Routes Authentification
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOtp);
router.get('/me', auth, getCurrentUser);

module.exports = router;
