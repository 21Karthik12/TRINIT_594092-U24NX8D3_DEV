const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    image: String
}, {timestamps: true});

module.exports = mongoose.model('Project', projectSchema);