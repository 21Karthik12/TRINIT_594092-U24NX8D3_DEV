const express = require('express');

const router = express.Router();
const {
    getAccounts,
    getAccount,
    createAccount,
    deleteAccount,
    updateAccount,
    depositAmount,
    withdrawAmount,
    getBalance
} = require('../controllers/accountController');

router.get('/', getAccounts);

router.get('/:id', getAccount);

router.post('/', createAccount);

router.delete('/:id', deleteAccount);

router.patch('/:id', updateAccount);

router.patch('/:id/deposit', depositAmount);

router.patch('/:id/withdraw', withdrawAmount);

router.get('/:id/balance', getBalance);

module.exports = router;