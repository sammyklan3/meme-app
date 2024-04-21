const express = require('express');
const router = express.Router();
const { register, login, logout, getProfile } = require("../controllers/authController");

router.get("/", function(req, res, next) {
  return res.status(200).json({ success: true, message: "Welcome to the meme API!" });
});

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", getProfile);

module.exports = router;