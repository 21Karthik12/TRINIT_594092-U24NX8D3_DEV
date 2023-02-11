const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    transaction_id: {
        type: Number,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    description: String,
    proj_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Transaction', transactionSchema);