const express = require("express");
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const MessageController = require("../controllers/MessageController");
const deleteDirectMessageAuthorization = require("../middlewares/deleteDirectMessageAuthorization");
const router = express.Router();

router.post("/register", UserController.Register);
router.post("/login", UserController.Login);
router.post("/google-login", UserController.googleLogin);

router.use(authentication);
router.get("/user", UserController.findCurrentlyLoggedUser);
router.get("/", HomeController.Home);
router.use("/profile", require("./profile"));

router.get("/:username/message", MessageController.getDirectMessages);
router.post("/:username/message", MessageController.sendDirectMessage);
router.delete(
  "/:id/message",
  deleteDirectMessageAuthorization,
  MessageController.deleteDirectMessage
);

router.use("/group", require("./group"));

module.exports = router;
