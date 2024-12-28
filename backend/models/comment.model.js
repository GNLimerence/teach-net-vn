const mongoose = require("mongoose");
const moment = require("moment-timezone");

const commentSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  agreedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

commentSchema.set("toJSON", {
  transform: function (doc, ret) {
    if (ret.created_at) {
      ret.created_at = moment(ret.created_at)
        .tz("Asia/Ho_Chi_Minh")
        .format("YYYY/MM/DD HH:mm");
    }
    return ret;
  },
});

commentSchema.set("toObject", {
  transform: function (doc, ret) {
    if (ret.created_at) {
      ret.created_at = moment(ret.created_at)
        .tz("Asia/Ho_Chi_Minh")
        .format("YYYY/MM/DD HH:mm");
    }
    return ret;
  },
});

module.exports = mongoose.model("Comment", commentSchema);
