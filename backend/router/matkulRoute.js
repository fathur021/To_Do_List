const express = require("express");
const router = express.Router()


const {createMatkul , getMatkul, updateMatkul, deleteMatkul} = require("../controller/matakuliah");

// Import Middleware
const { authenticate } = require("../middleware/auth");

router.post("/", authenticate, createMatkul);
router.get("/", authenticate,getMatkul);
router.put("/:id", authenticate,updateMatkul)
router.delete("/:id",authenticate,deleteMatkul);

// Nested route: /api/matakuliah/:matkulId/catatan
const catatanRouter = require("./catatanRouter");
router.use("/:matkulId/catatan", catatanRouter);

module.exports = router