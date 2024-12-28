const { default: mongoose } = require("mongoose");
const postModel = require("../models/post.model");
const moment = require("moment-timezone");
const userModel = require("../models/user.model");

const createPost = async (req, res) => {
  const { forumId, title, content } = req.body;
  const { id } = req.user;
  if (!forumId || !title || !content) {
    return res.status(400).json({ error: "Missing information" });
  }
  await postModel.create({
    forum_id: forumId,
    title,
    content,
    created_by: id,
  });
  return res.status(201).json({ message: "Created!" });
};

const getPostsByForumId = async (req, res) => {
  const { forumId } = req.body;

  if (!forumId) {
    return res.status(400).json({ error: "Forum ID is required" });
  }

  try {
    const posts = await postModel
      .find({ forum_id: new mongoose.Types.ObjectId(forumId) })
      .populate("created_by", "name avatar_url")
      .sort({ created_at: -1 });

    return res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
};

const getPostByPostId = async (req, res) => {
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ error: "Post ID is required" });
  }

  try {
    const post = await postModel
      .findById(postId)
      .populate("created_by", "name avatar_url");
    return res.status(200).json(post);
  } catch (err) {
    console.error("Error get one post: ", err);
    return res.status(500).json({ error: "Failed" });
  }
};
module.exports = {
  createPost,
  getPostsByForumId,
  getPostByPostId,
};
