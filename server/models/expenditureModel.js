const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenditureSchema = new Schema({
    sender_id: {
        type: String,
        required: true
    },
    receiver_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Expenditure', expenditureSchema);