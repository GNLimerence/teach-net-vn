const express = require("express");
const multer = require("multer");
const {
  uploadResource,
  getResourcesByForum,
} = require("../controllers/resource.controller");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", verifyToken, upload.single("file"), uploadResource);
router.get("/forum/:forumId", verifyToken, getResourcesByForum);

module.exports = router;
