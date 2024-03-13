const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/ProfileController");
const profileAuthorization = require("../middlewares/profileAuthorization");

router.get("/", ProfileController.getAllProfiles);
router.get("/:username", ProfileController.getProfileByUsername);
router.post("/", ProfileController.createProfile);
router.put("/:username", profileAuthorization, ProfileController.updateProfile);

module.exports = router;
