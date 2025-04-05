const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const trackerController = require("../controllers/trackerController");
const authController = require("../controllers/authController");

router.get("/me", authenticateToken, authController.getCurrentUser);
router.get("/records", authenticateToken, trackerController.getRecords);
router.post("/records", trackerController.addRecord);
router.delete(
  "/records/:id",
  authenticateToken,
  trackerController.deleteRecord
);

module.exports = router;
