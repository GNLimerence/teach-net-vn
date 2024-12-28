const httpStatus = require("http-status");
const commentModel = require("../models/comment.model");
const mongoose = require("mongoose");
const userModel = require("../models/user.model");

const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const { id } = req.user;
    if (!postId || !content) {
      return res
        .status(400)
        .json({ error: "forum_id, author_id, and content are required" });
    }
    await commentModel.create({
      post_id: postId,
      author_id: id,
      content,
    });
    res.status(201).json({ message: "Comment created" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create comment", details: err.message });
  }
};

const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.body;

    const commentsOfPost = await commentModel
      .find({
        post_id: new mongoose.Types.ObjectId(postId),
      })
      .populate("author_id", "name avatar_url");

    res.status(200).json({
      code: 200,
      data: commentsOfPost.map((comment) => ({
        ...comment.toObject(),
        agreeCount: comment.agreedBy.length,
      })),
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch comments",
      details: err.message,
    });
  }
};

const increaseAgreeCount = async (req, res) => {
  const { commentId, userId } = req.body;

  const comment = await commentModel.findById(commentId);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  const objectTypeUserId = new mongoose.Types.ObjectId(userId);
  const userIndex = comment.agreedBy.indexOf(objectTypeUserId);

  if (userIndex > -1) {
    comment.agreedBy.splice(userIndex, 1);
  } else {
    comment.agreedBy.push(objectTypeUserId);
  }

  await comment.save();
  res.json({
    agreedBy: comment.agreedBy,
    agreeCount: comment.agreedBy.length,
  });
};
module.exports = { createComment, getCommentsByPostId, increaseAgreeCount };
