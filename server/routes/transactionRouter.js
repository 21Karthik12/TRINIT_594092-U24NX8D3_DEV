const express = require('express');

const router = express.Router();
const {
    getTransaction,
    getTransactions,
    createTransaction,
    deleteTransaction,
    updateTransaction
} = require('../controllers/transactionController');

router.get('/', getTransactions);

router.get('/:id', getTransaction);

router.post('/', createTransaction);

router.delete('/:id', deleteTransaction);

router.patch('/:id', updateTransaction);

module.exports = router;