const express = require('express');
const { sendMoney, getTransactions } = require('../controllers/transactionController');

const router = express.Router();

router.post('/send', sendMoney);
router.post('/history', getTransactions);

module.exports = router;
