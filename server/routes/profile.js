const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/ProfileController");
const profileAuthorization = require("../middlewares/profileAuthorization");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", ProfileController.getAllProfiles);
router.get("/:username", ProfileController.getProfileByUsername);
router.post("/", upload.single("image"), ProfileController.createProfile);
router.put(
  "/:username",
  profileAuthorization,
  upload.single("image"),
  ProfileController.updateProfile
);

module.exports = router;
