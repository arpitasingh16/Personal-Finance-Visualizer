const express = require('express');
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/TransactionController');

router
  .get('/', getTransactions)
  .post('/', addTransaction)
  .put('/:id', updateTransaction)
  .delete('/:id', deleteTransaction);

module.exports = router;
