const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    base_price: {
        type: String,
        required: true
    },
    end_price: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: ['minutes', 'hours', 'days', 'months']
    },
    start_date: {
        type: String
    },
    end_date: {
        type: String
    },
    auction: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

const Auction = mongoose.model("Auction", auctionSchema);

module.exports = Auction;
