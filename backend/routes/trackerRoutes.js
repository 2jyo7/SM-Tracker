const express = require("express");
const router = express.Router();
const trackerController = require("../controllers/trackerController");

router.get("/records", trackerController.getRecords);
router.post("/records", trackerController.addRecord);
router.delete("/records/:id", trackerController.deleteRecord);

module.exports = router;
