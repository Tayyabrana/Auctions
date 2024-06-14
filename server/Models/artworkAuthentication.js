const mongoose = require('mongoose');

const artworkAuthenticationSchema = new mongoose.Schema({
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        artwork: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        reason: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: "pending"
        }
    },
    {timestamps: true}
);

const ArtworkAuthentication = mongoose.model("ArtworkAuthentication", artworkAuthenticationSchema);
module.exports = ArtworkAuthentication;
