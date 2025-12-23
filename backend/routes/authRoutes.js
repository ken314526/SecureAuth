const router = require("express").Router();
const c = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", c.signup);
router.post("/login", c.login);
router.get("/verify/:token", c.verifyEmail);

router.post("/forgot-password", c.forgotPassword);
router.post("/reset-password/:token", c.resetPassword);
router.post("/change-password", authMiddleware, c.changePassword);

module.exports = router;
