const mongoose = require('mongoose');
const { Schema } = mongoose;

const TourSchema = new Schema({
    title: String,
    description: String,
    price: String,
    name: String,
    Creator: String,
    tags: [String],
    imageFile: [String], // Store multiple image file paths in an array of strings
    createdAt: {
        type: Date,
        default: new Date(),
    },
    likeCount: {
        type: Number,
        default: 0,
    },
});

const TourModel = mongoose.model('Tour', TourSchema);

module.exports = TourModel;
