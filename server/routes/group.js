const express = require("express");
const GroupController = require("../controllers/GroupController");
const router = express.Router();


router.get("/", GroupController.getAllPublicGroupMessage)
router.post("/", GroupController.sendMessageToPublicGroup)



module.exports = router