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
    likes: {
        type: Number,
        default: 0
    },
    image: String,
    user_id: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Project', projectSchema);