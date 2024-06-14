const CommisionArtwork = require("../Models/commisionArtwork");
const middleware = require("../middleware");
const Product = require("../Models/productModel");

const RegisterCommisionArtwork = async (req, res) => {
    try {
        const seller = res.locals.payload.id;
        const { details, requirements, budget } = req.body;
        const artworkData = await CommisionArtwork.create({
            seller,
            details,
            requirements,
            budget
        });
        res.status(201).json({ artworkData });

    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

const GetAll = async (req, res) => {
    try {
        const products = await CommisionArtwork.find({});
        if (products && products.length > 0) {
            res.status(200).json({ message: "Done", products: products});
        }
        else {
            res.status(404).send('No Pending Products Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const ApproveCommission = async (req, res) => {
    try {
        const { id } = req.params
        const update = await CommisionArtwork.findByIdAndUpdate(id, { status: "approved" })
        res.status(200).json({ update: true });
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

const RejectCommission = async (req, res) => {
    try {
        const { id } = req.params
        const update = await CommisionArtwork.findByIdAndUpdate(id, { status: "rejected" })
        res.status(200).json({ update: true });
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

module.exports = {
    RegisterCommisionArtwork,
    GetAll,
    ApproveCommission,
    RejectCommission
};
