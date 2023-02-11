const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    transaction_id: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    description: String,
    proj_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Transaction', transactionSchema);