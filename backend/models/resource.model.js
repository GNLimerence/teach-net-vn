const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file_url: { type: String, required: true },
  tags: [String],
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  uploaded_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resource", resourceSchema);
