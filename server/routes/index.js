const express = require("express");
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.post("/register", UserController.Register);
router.get("/", HomeController.Home);

module.exports = router;
