const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: String,
    source_id: String,
    dest_id: String,
    dest_group_id: String,
    group_message: {
        type: Boolean,
        default: false
    },
    time: Date
}, {timestamps: true});

module.exports = mongoose.model('Message', messageSchema);