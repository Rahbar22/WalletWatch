const express = require('express');
const { getAllTransaction, addTransaction, editTransaction, deleteTransaction } = require('../controllers/transactionController');
const router = express.Router();

router.route('/getalltransaction').post(getAllTransaction)
router.route('/addtransaction').post(addTransaction)
router.route('/edittransaction').post(editTransaction)
router.route('/deletetransaction').post(deleteTransaction)

module.exports = router;