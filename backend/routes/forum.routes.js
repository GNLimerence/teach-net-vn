const express = require("express");
const forumController = require("../controllers/forum.controller");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/", forumController.createForum);

router.post("/my-forums", verifyToken, forumController.getForumsByUser);

router.post("/join-forum", verifyToken, forumController.joinForum);

router.post("/this-forum", verifyToken, forumController.getForumById);

module.exports = router;
