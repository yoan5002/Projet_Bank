const express = require('express');
const { createAccount, getBalance } = require('../controllers/accountController');

const router = express.Router();

router.post('/create', createAccount);
router.post('/balance', getBalance);

module.exports = router;
