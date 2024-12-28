const express = require("express");
const commentController = require("../controllers/comment.controller");

const router = express.Router();

router.post("/", commentController.createComment);

router.post("/post-comment", commentController.getCommentsByPostId);

router.post("/increase-agree", commentController.increaseAgreeCount);
module.exports = router;
