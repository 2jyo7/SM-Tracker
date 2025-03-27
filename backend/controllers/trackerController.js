const Tracker = require("../models/trackerModel");

exports.getRecords = async (req, res) => {
  try {
    const records = await Tracker.getAllRecords();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ message: "Error fetching records", error });
  }
};

exports.addRecord = async (req, res) => {
  let { userId, website, duration } = req.body;

  // Ensure `userId` is a number
  userId = parseInt(userId);
  duration = parseInt(duration);

  if (!userId || !website || !duration) {
    console.log("Invalid users credentials:" + userId, website, duration);
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await Tracker.addRecord(userId, website, duration);
    res.status(201).json({ message: "Record added successfully" });
  } catch (error) {
    console.error("Error adding record:", error);
    res.status(500).json({ message: "Error adding record", error });
  }
};

exports.deleteRecord = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    await Tracker.delRecord(id);
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).json({ message: "Error deleting record", error });
  }
};
