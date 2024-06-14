const Product = require("../Models/productModel");
const Auction = require("../Models/auctionModel")
const Bid = require("../Models/bidModel")

const RegisterProduct = async (req, res) => {
    try {
        const userID = res.locals.payload.id;
        const file = req.file;
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imageUrl = `${baseUrl}/uploads/${file.filename}`;
        const data = {
            user: userID,
            image: imageUrl,
            name: req.body.name,
            description: req.body.description,
            category: req.body.category
        }
        const product = await Product.create(data);
        if (product) {
            res.status(200).send('Product Registered Successfully');
        }
        else {
            res.status(400).send('Failed to register product');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};
const BidProduct = async (req, res) => {
    try {
        const { id, base_price, end_price, duration, unit } = req.body;
        const product = await Product.findById(id);
        const auction = await Auction.create({
            product: id,
            base_price,
            end_price,
            duration,
            unit
        });
        product.auction = 'pending';
        await product.save()
        if (auction) {
            res.status(200).send('Bid Request Registered Successfully');
        }
        else {
            res.status(400).send('Failed to register bid request');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const BidAuction = async (req, res) => {
    try {
        const customer = res.locals.payload.id
        const { auction, bid_price } = req.body;
        const bid = await Bid.create({
            customer,
            auction,
            bid_price
        });
        if (bid) {
            res.status(200).send('Bid Request Registered Successfully');
        }
        else {
            res.status(400).send('Failed to register bid request');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

const ApproveForAuction = async (req, res) => {
    try {
        const { id, start_date, end_date } = req.body;
        const auction = await Auction.findById(id).populate('product');
        auction.start_date = start_date;
        auction.end_date = end_date;
        auction.auction = true;
        auction.product.auction = 'false'
        await auction.save()
        if (auction) {
            res.status(200).send('Auction Started Successfully');
        }
        else {
            res.status(400).send('Failed to Start Auction');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const GetAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: 'pending' }).populate('user');
        if (products && products.length > 0) {
            res.status(200).json(products);
        }
        else {
            res.status(404).send('No Pending Products Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const GetAuctionProducts = async (req, res) => {
    try {
        const auctionProducts = await Auction.find().populate('product');
        if (auctionProducts && auctionProducts.length > 0) {
            // Filter the auctions where the product's auction field is false
            const filteredAuctions = auctionProducts.filter(auction => auction.product && auction.product.auction === 'pending' && auction.auction === false);
            if (filteredAuctions.length > 0) {
                res.status(200).json(filteredAuctions);
            }
            else {
                res.status(404).send('No Auction Products Found');
            }
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const GetOngoingAuctionProducts = async (req, res) => {
    try {
        const auctionProducts = await Auction.find({ auction: true }).populate('product');
        if (auctionProducts && auctionProducts.length > 0) {
            res.status(200).json(auctionProducts);
        }
        else {
            res.status(404).send('No Ongoing Auction Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const GetAllApprovedNormalProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: "approved", type: "normal" }).populate('user');
        if (products && products.length > 0) {
            res.status(200).json(products);
        }
        else {
            res.status(404).send('No Approved Products Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};
const GetAllApprovedProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: "approved", auction: false }).populate('user');
        if (products && products.length > 0) {
            res.status(200).json(products);
        }
        else {
            res.status(403).send('No Auction Products Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const GetAllRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: "approved", type: "recommended" }).populate('user');
        if (products && products.length > 0) {
            res.status(200).json(products);
        }
        else {
            res.status(404).send('No Recommended Products Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const GetAllCuratedProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: "approved", type: "curated" }).populate('user');
        if (products && products.length > 0) {
            res.status(200).json(products);
        }
        else {
            res.status(404).send('No Curated Products Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const GetUserProducts = async (req, res) => {
    try {
        const userID = res.locals.payload.id;
        const products = await Product.find({ user: userID });
        if (products && products.length > 0) {
            res.status(200).json(products);
        }
        else {
            res.status(404).send('No Products Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const GetProductByID = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('user');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

const ApproveProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        product.status = 'approved';
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

const RejectProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        product.status = 'reject';
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}
const AddToAuction = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        product.auction = true;
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}
const RecommendProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        product.type = 'recommended';
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

const GetAuctionBids = async (req, res) => {
    try {
        const { id } = req.params
        const bids = await Bid.find({ auction: id }).populate('customer');
        if (bids && bids.length > 0) {
            res.status(200).json(bids);
        }
        else {
            res.status(404).send('No Bids Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const CuratedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        product.type = 'curated';
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}


module.exports = {
    RegisterProduct,
    GetAllProducts,
    GetAllApprovedNormalProducts,
    GetAllApprovedProducts,
    GetUserProducts,
    GetProductByID,
    ApproveProduct,
    RejectProduct,
    RecommendProduct,
    CuratedProduct,
    GetAllRecommendedProducts,
    GetAllCuratedProducts,
    AddToAuction,
    BidProduct,
    BidAuction,
    GetAuctionProducts,
    GetAuctionBids,
    ApproveForAuction,
    GetOngoingAuctionProducts
};
