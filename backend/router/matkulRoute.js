const express = require("express");
const router = express.Router()


const {createMatkul , getMatkul} = require("../controller/matakuliah");

// Import Middleware
const { authenticate } = require("../middleware/auth");

router.post("/", authenticate, createMatkul);
router.get("/", authenticate,getMatkul);
module.exports = router