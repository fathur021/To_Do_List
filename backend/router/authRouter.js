const express = require("express");

// [FIXED] Import semua fungsi dari authController
const {register, login, refreshAccessToken, getProfile, logout} = require("../controller/authController");

// [FIXED] Import middleware authenticate
const {authenticate} = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);
router.get("/profile", authenticate, getProfile);
router.post("/logout", logout);

module.exports = router;