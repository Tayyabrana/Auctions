const router = require("express").Router();
const controller = require("../Controllers/commisionArtworkController");
const middleware = require("../middleware");
const {ApproveCommission, RejectCommission} = require("../Controllers/commisionArtworkController");


router.post(
    "/register",
    middleware.stripToken,
    middleware.verifyToken,
    controller.RegisterCommisionArtwork
);
router.get(
    "/all",
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetAll
);
router.get("/approve/:id", controller.ApproveCommission)
router.get("/reject/:id", controller.RejectCommission)
module.exports = router;
