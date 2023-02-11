const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    group_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    profile_img: Blob,
    users: [Number]
}, {timestamps: true});

module.exports = mongoose.model('Group', groupSchema);