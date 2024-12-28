const express = require("express");
const authController = require("../controllers/user.controller");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/register",
  verifyToken,
  verifyAdmin,
  authController.createUserByAdmin
);

router.post("/login", authController.loginUser);

router.get("/users", verifyToken, verifyAdmin, authController.getAllUsers);

router.get("/me", verifyToken, authController.getAccount);

router.get("/profile", verifyToken, authController.getUserProfile);

module.exports = router;
