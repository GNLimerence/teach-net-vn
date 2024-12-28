const Resource = require("../models/resource.model");
const mongoose = require("mongoose");

const uploadResource = async (req, res) => {
  const { forumId, title, tags } = req.body;
  const { id } = req.user;
  if (!req.file) {
    return res.status(400).json({ message: "Không có file được upload." });
  }

  try {
    const newResource = new Resource({
      title,
      file_url: `/uploads/${req.file.filename}`,
      forum_id: forumId,
      uploaded_by: id,
      tags: tags ? tags.split(",") : [],
    });

    await newResource.save();
    res
      .status(201)
      .json({ message: "Upload thành công!", resource: newResource });
  } catch (error) {
    console.error("Lỗi khi upload tài liệu:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi upload tài liệu." });
  }
};

const getResourcesByForum = async (req, res) => {
  const { forumId } = req.params;
  try {
    const resources = await Resource.find({
      forum_id: new mongoose.Types.ObjectId(forumId),
    }).populate("uploaded_by", "name");
    res.status(200).json(resources);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tài liệu:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi lấy tài liệu." });
  }
};

module.exports = { uploadResource, getResourcesByForum };
