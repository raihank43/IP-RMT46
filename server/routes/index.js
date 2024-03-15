const express = require("express");
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const MessageController = require("../controllers/MessageController");
const router = express.Router();

router.post("/register", UserController.Register);
router.post("/login", UserController.Login);
router.post("/google-login", UserController.googleLogin)

router.use(authentication);
router.get("/user/find", UserController.findCurrentlyLoggedUser)
router.get("/", HomeController.Home);
router.use("/profile", require("./profile"));

router.get("/:username/message", MessageController.getDirectMessages);
router.post("/:username/message", MessageController.sendDirectMessage);


module.exports = router;
