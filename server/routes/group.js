const express = require("express");
const GroupController = require("../controllers/GroupController");
const router = express.Router();
const multer = require("multer");
const deletePublicMessageAuthorization = require("../middlewares/deletePublicMessageAuthorization");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", GroupController.getAllPublicGroupMessage);
router.post(
  "/",
  upload.single("image"),
  GroupController.sendMessageToPublicGroup
);
router.delete(
  "/:id",
  deletePublicMessageAuthorization,
  GroupController.deletePublicGroupMessage
);

module.exports = router;
