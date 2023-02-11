const express = require('express');

const router = express.Router();
const {
    getExpenditures,
    getExpenditure,
    createExpenditure
} = require('../controllers/expenditureController');

router.get('/', getExpenditures);

router.get('/:id', getExpenditure);

router.post('/', createExpenditure);

module.exports = router;