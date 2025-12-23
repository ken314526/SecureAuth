const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const c = require("../controllers/studentController");

router.use(auth);
router.get("/profile", c.getProfile);
router.put("/profile", c.updateProfile);

module.exports = router;
