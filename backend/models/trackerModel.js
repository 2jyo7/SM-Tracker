const dbConnect = require("../config/db");

const Tracker = {
  getAllRecords: async () => {
    const [rows] = await dbConnect.query("SELECT * FROM tracking_data"); // ✅ Added `await`
    return rows;
  },

  addRecord: async (userId, website, duration) => {
    const [result] = await dbConnect.query(
      // ✅ Added `await`
      "INSERT INTO tracking_data (user_id, website, duration) VALUES (?, ?, ?)",
      [userId, website, duration]
    );
    return result;
  },
  delRecord: async (id) => {
    const [result] = await dbConnect.query(
      // ✅ Added `await`
      "DELETE FROM tracking_data WHERE id = ?",
      [id]
    );
    return result;
  },
};

module.exports = Tracker;
