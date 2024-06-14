const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending'
    },
    type: {
        type: String,
        default: 'normal'
    },
    auction: {
        type: String,
        default: 'false'
    }

},
    { timestamps: true }
);

//Create Model
const Products = new mongoose.model("Product", productSchema);

module.exports = Products;