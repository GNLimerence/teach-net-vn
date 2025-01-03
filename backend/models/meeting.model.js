const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  forum_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Forum",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Meeting", meetingSchema);
