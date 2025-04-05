const Tracker = require("../models/trackerModel");

// ✅ Get records (only for logged-in users)
exports.getRecords = async (req, res) => {
  const userId = req.user.id; // Get user ID from token

  if (!userId) {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const records = await Tracker.getRecordsByUserId(userId); // Fetch only user's records
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ message: "Error fetching records", error });
  }
};

// ✅ Add record (public - anyone can add a record)
exports.addRecord = async (req, res) => {
  let { userId, website, duration } = req.body;

  // Ensure `userId` & `duration` are numbers
  userId = parseInt(userId);
  duration = parseInt(duration);

  if (!userId || !website || !duration) {
    console.log("Invalid data:", userId, website, duration);
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

// ✅ Delete record (only Admins can delete)
exports.deleteRecord = async (req, res) => {
  const { id } = req.params;
  const userRole = req.user.role;

  if (userRole !== "Admin") {
    return res.status(403).json({ message: "Only Admins can delete records" });
  }

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
