const forumModel = require("../models/forum.model");
const User = require("../models/user.model");
const createForum = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.user;
    if (!name) {
      return res.status(400).json({ error: "Missing information" });
    }

    const newPost = await forumModel.create({
      name,
      created_by: id,
      description,
      members: [id],
    });
    res.status(201).json(newPost);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create forum", details: err.message });
  }
};

const getForumsByUser = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({ error: "userId is required" });
    }
    const forums = await forumModel.find({ members: id });

    res.status(200).json(forums);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch forums", details: err.message });
  }
};

const joinForum = async (req, res) => {
  try {
    const { email, forumId } = req.body;

    if (!email || !forumId) {
      return res.status(400).json({ error: "Missing email or forumId" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const forum = await forumModel.findOneAndUpdate(
      { _id: forumId },
      { $addToSet: { members: user._id } },
      { new: true }
    );

    if (!forum) {
      return res.status(404).json({ error: "No forum found!" });
    }

    res.status(200).json({ message: "Joined forum successfully", forum });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to join forum", details: err.message });
  }
};

const getForumById = async (req, res) => {
  try {
    const { forumId } = req.body;
    if (!forumId) {
      return res.status(400).json({ error: "Missing info" });
    }
    const forum = await forumModel.findById(forumId);
    if (!forum) {
      return res.status(404).json({ error: "Can not find forum" });
    }
    return res.status(200).json(forum);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createForum, getForumsByUser, joinForum, getForumById };
