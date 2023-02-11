const mongoose = require('mongoose');
const Account = require('../models/accountModel');

/* Get all accounts */
const getAccounts = async (req, res) => {
    const accounts = await Account.find({}).sort({createdAt: -1});
    res.status(200).json(accounts);
}

/* Get a single account */
const getAccount = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Account not found'});
    }
    const account = await Account.findById(id);
    if(!account) {
        return res.status(404).json({error: 'Account not found'});
    }
    res.status(200).json(account);
}

/* Create a new account */
const createAccount = async (req, res) => {
    const {user_id, upi_id} = req.body;
    try {
        const account = await Account.create({user_id, upi_id});
        res.status(200).json(account);
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

/* Delete an account */
const deleteAccount = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Account not found'});
    }
    const account = await Account.findOneAndDelete({_id: id});
    if(!account) {
        return res.status(404).json({error: 'Account not found'});
    }
    res.status(200).json(account);
}

/* Update an account */
const updateAccount = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Account not found'});
    }
    const account = await Account.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    if(!account) {
        return res.status(404).json({error: 'Account not found'});
    }
    res.status(200).json(account);
}

/* Deposit amount */
const depositAmount = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Account not found'});
    }
    const {amount} = req.body;
    const account = await Account.findOneAndUpdate({_id: id}, {
        $inc: {"balance": amount}
    });
    if(!account) {
        return res.status(404).json({error: 'Account not found'});
    }
    res.status(200).json(account);
}

/* Withdraw amount */
const withdrawAmount = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Account not found'});
    }
    const {amount} = req.body;
    const account = await Account.findOneAndUpdate({_id: id}, {
        $inc: {"balance": -amount}
    });
    if(!account) {
        return res.status(404).json({error: 'Account not found'});
    }
    res.status(200).json(account);
}

const getBalance = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Account not found'});
    }
    const account = await Account.findById(id);
    const {balance} = account;
    if(!account) {
        return res.status(404).json({error: 'Account not found'});
    }
    res.status(200).json(balance);
}

module.exports = {
    getAccounts,
    getAccount,
    createAccount,
    deleteAccount,
    updateAccount,
    depositAmount,
    withdrawAmount,
    getBalance
}