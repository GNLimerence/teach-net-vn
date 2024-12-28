const express = require("express");
const commentController = require("../controllers/comment.controller");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/", verifyToken, commentController.createComment);

router.post(
  "/post-comment",
  verifyToken,
  commentController.getCommentsByPostId
);

router.post(
  "/increase-agree",
  verifyToken,
  commentController.increaseAgreeCount
);
module.exports = router;
