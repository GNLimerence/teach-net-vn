const express = require("express");
const postController = require("../controllers/post.controller");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/create", verifyToken, postController.createPost);

router.post("/forum-post", verifyToken, postController.getPostsByForumId);

router.post("/get-post", verifyToken, postController.getPostByPostId);
module.exports = router;
