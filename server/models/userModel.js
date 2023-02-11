const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    ngo: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    interests: [String],
    origin: String,
    impact: String,
    profile_img: String,
    groups: [String]
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);