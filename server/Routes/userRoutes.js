const router = require("express").Router();
const controller = require("../Controllers/userController");
const middleware = require("../Middleware");

router.post("/register", controller.Register);
router.post("/login", controller.Login);
router.get("/role",
    middleware.stripToken,
    middleware.verifyToken,
    controller.Role);

module.exports = router;
