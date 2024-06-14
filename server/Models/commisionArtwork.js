const mongoose = require('mongoose');

const commisionArtworkSchema = new mongoose.Schema({
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        details: {
            type: String,
            required: true
        },
        requirements: {
            type: String,
            required: true
        },
        budget: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            default: "pending"
        }
    },
    { timestamps: true }
);

const CommisionArtwork = mongoose.model("CommisionArtwork", commisionArtworkSchema);
module.exports = CommisionArtwork;
