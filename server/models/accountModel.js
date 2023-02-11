const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    upi_id: String,
    balance: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model('Account', accountSchema);