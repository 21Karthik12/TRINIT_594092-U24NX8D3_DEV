const mongoose = require('mongoose');
const Expenditure = require('../models/expenditureModel');

/* Get all expenditures */
const getExpenditures = async (req, res) => {
    const expenditures = await Expenditure.find({}).sort({createdAt: -1});
    res.status(200).json(expenditures);
}

/* Get a single expenditure */
const getExpenditure = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Expenditure not found'});
    }
    const expenditure = await Expenditure.findById(id);
    if(!expenditure) {
        return res.status(404).json({error: 'Expenditure not found'});
    }
    res.status(200).json(expenditure);
}

/* Create a new expenditure */
const createExpenditure = async (req, res) => {
    const {sender_id, receiver_id, amount, description} = req.body;
    try {
        const expenditure = await Expenditure.create({sender_id, receiver_id, amount, description});
        res.status(200).json(expenditure);
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    getExpenditures,
    getExpenditure,
    createExpenditure
}