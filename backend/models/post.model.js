const mongoose = require("mongoose");
const moment = require("moment-timezone");

const postSchema = new mongoose.Schema({
  forum_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Forum",
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

postSchema.set("toJSON", {
  transform: function (doc, ret) {
    if (ret.created_at) {
      ret.created_at = moment(ret.created_at)
        .tz("Asia/Ho_Chi_Minh")
        .format("YYYY/MM/DD HH:mm");
    }
    return ret;
  },
});

postSchema.set("toObject", {
  transform: function (doc, ret) {
    if (ret.created_at) {
      ret.created_at = moment(ret.created_at)
        .tz("Asia/Ho_Chi_Minh")
        .format("YYYY/MM/DD HH:mm");
    }
    return ret;
  },
});

module.exports = mongoose.model("Post", postSchema);
