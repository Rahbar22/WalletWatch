const express = require('express');
const { getAllTransaction, addTransaction } = require('../controllers/transactionController');
const router = express.Router();

router.route('/addtransaction').post(addTransaction)
router.route('/getalltransaction').post(getAllTransaction)

module.exports = router;