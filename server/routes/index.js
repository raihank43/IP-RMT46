const express = require("express");
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", UserController.Register);
router.post("/login", UserController.Login);

router.use(authentication);
router.get("/", HomeController.Home);

module.exports = router;
