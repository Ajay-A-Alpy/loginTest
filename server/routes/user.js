const router = require("express").Router();
const controller = require("../controller/userController");

router.get("/login", controller.login);
router.post("/signup", controller.signup);

module.exports = router;
