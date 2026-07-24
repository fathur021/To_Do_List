const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createCatatan,
  getCatatan,
  updateCatatan,
  deleteCatatan,
} = require("../controller/catatanController");
const { authenticate } = require("../middleware/auth");

router.post("/", authenticate, createCatatan);
router.get("/", authenticate, getCatatan);
router.put("/:id", authenticate, updateCatatan);
router.delete("/:id", authenticate, deleteCatatan)

module.exports = router;
