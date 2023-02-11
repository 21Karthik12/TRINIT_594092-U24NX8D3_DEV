const mongoose = require('mongoose');
const Transaction = require('../models/transactionModel');

/* Get all transactions */
const getTransactions = async (req, res) => {
    const transactions = await Transaction.find({}).sort({createdAt: -1});
    res.status(200).json(transactions);
}

/* Get a single transaction */
const getTransaction = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Transaction not found'});
    }
    const transaction = await Transaction.findById(id);
    if(!transaction) {
        return res.status(404).json({error: 'Transaction not found'});
    }
    res.status(200).json(transaction);
}

/* Create a new transaction */
const createTransaction = async (req, res) => {
    const {transaction_id, amount, description, proj_id, user_id} = req.body;
    try {
        const transaction = await Transaction.create({transaction_id, amount, description, proj_id, user_id});
        res.status(200).json(transaction);
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

/* Delete a transaction */
const deleteTransaction = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Transaction not found'});
    }
    const transaction = await Transaction.findOneAndDelete({_id: id});
    if(!transaction) {
        return res.status(404).json({error: 'Transaction not found'});
    }
    res.status(200).json(transaction);
}

/* Update a transaction */
const updateTransaction = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Transaction not found'});
    }
    const transaction = await Transaction.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    if(!transaction) {
        return res.status(404).json({error: 'Transaction not found'});
    }
    res.status(200).json(transaction);
}

module.exports = {
    getTransaction,
    getTransactions,
    createTransaction,
    deleteTransaction,
    updateTransaction
}