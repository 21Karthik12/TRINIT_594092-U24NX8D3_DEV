const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: String,
    source_id: Number,
    dest_id: Number,
    dest_group_id: Number,
    group_message: {
        type: Boolean,
        default: false
    },
    time: Date
}, {timestamps: true});

module.exports = mongoose.model('Message', messageSchema);