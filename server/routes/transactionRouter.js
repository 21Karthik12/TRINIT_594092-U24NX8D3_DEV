const express = require('express');

const router = express.Router();
const {
    getTransaction,
    getTransactions,
    createTransaction
} = require('../controllers/transactionController');

router.get('/', getTransactions);

router.get('/:id', getTransaction);

router.post('/', createTransaction);

module.exports = router;