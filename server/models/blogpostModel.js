const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publish_date: {
        type: Date,
        required: true
    },
    proj_id: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    image: String
}, {timestamps: true});

module.exports = mongoose.model('Blogpost', blogSchema);