const router = require("express").Router();
const controller = require("../Controllers/productController");
const middleware = require("../middleware");
const multer = require("multer");

// Images Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Photos/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });


router.get(
    "/get-all-products",
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetAllProducts
);
router.get(
    '/details/:id',
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetProductByID
)
router.get(
    "/get-all-approved-normal-products",
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetAllApprovedNormalProducts
);
router.get(
    "/get-all-approved-products",
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetAllApprovedProducts
);
router.get(
    "/get-all-recommended-products",
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetAllRecommendedProducts
);
router.get(
    "/get-all-curated-products",
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetAllCuratedProducts
);
router.put(
    "/approve/:id",
    middleware.stripToken,
    middleware.verifyToken,
    controller.ApproveProduct
)
router.put(
    "/reject/:id",
    middleware.stripToken,
    middleware.verifyToken,
    controller.RejectProduct
)
router.put(
    "/recommended/:id",
    middleware.stripToken,
    middleware.verifyToken,
    controller.RecommendProduct
)
router.put(
    "/curated/:id",
    middleware.stripToken,
    middleware.verifyToken,
    controller.CuratedProduct
)
router.put(
    "/add-product-to-auction/:id",
    middleware.stripToken,
    middleware.verifyToken,
    controller.AddToAuction
)
router.get(
    "/get-user-products",
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetUserProducts
);
router.get(
    "/get-auction-products",
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetAuctionProducts
);
router.get(
    "/get-ongoing-auction-products",
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetOngoingAuctionProducts
);
router.post(
    "/register-product",
    middleware.stripToken,
    middleware.verifyToken,
    upload.single('productImage'),
    controller.RegisterProduct
);
router.post(
    "/bid-request",
    middleware.stripToken,
    middleware.verifyToken,
    controller.BidProduct
);
router.post(
    "/bid-auction",
    middleware.stripToken,
    middleware.verifyToken,
    controller.BidAuction
);
router.get(
    "/auction-bids/:id",
    controller.GetAuctionBids
);
router.post(
    "/approve-for-auction",
    middleware.stripToken,
    middleware.verifyToken,
    controller.ApproveForAuction
);

module.exports = router;
