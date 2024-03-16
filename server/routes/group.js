const express = require("express");
const GroupController = require("../controllers/GroupController");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", GroupController.getAllPublicGroupMessage);
router.post("/", upload.single("image"), GroupController.sendMessageToPublicGroup);
router.post("/upload", upload.single("image"), GroupController.uploadImage);

module.exports = router;
