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
    interests: [String],
    profile_img: String,
    groups: [Number]
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);