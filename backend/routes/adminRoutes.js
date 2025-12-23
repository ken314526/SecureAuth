const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const c = require("../controllers/adminController");

router.use(auth, role("admin"));
router.get("/students", c.getStudents);
router.post("/students", c.addStudent);
router.put("/students/:id", c.updateStudent);
router.delete("/students/:id", c.deleteStudent);

module.exports = router;
