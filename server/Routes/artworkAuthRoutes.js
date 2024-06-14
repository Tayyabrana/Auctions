const router = require("express").Router();
const controller = require("../Controllers/artworkAuthController");
const middleware = require("../middleware");


router.post(
    "/register",
    middleware.stripToken,
    middleware.verifyToken,
    controller.RegisterArtworkAuthentication
);

router.get(
    "/get-all",
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetAll
);
router.get("/approve/:id", controller.ApproveArtwork)
router.get("/reject/:id", controller.RejectArtwork)
module.exports = router;
