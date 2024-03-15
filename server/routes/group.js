const express = require("express");
const GroupController = require("../controllers/GroupController");
const router = express.Router();


router.get("/", GroupController.getAllPublicGroupMessage)



module.exports = router