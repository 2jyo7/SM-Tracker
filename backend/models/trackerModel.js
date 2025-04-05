const dbConnect = require("../config/db");
const dotenv = require("dotenv");

dotenv.config();

const Tracker = {
  // ✅ Get all records (for debugging, not recommended for users)
  getAllRecords: async () => {
    try {
      const connection = await dbConnect.getConnection();
      const [rows] = await connection.query("SELECT * FROM tracking_data");
      console.log(rows);
      connection.release();
      return rows;
    } catch (error) {
      console.error("Error fetching all records:", error);
      throw new Error("Database error");
    }
  },

  // ✅ Get records for a specific user
  getRecordsByUserId: async (userId) => {
    const userIdNum = parseInt(userId, 10);
    if (!userIdNum) throw new Error("Invalid User ID");

    try {
      const connection = await dbConnect.getConnection();
      const [rows] = await connection.query(
        "SELECT * FROM tracking_data WHERE user_id = ?",
        [userIdNum]
      );
      connection.release();
      return rows;
    } catch (error) {
      console.error("Error fetching records for user:", error);
      throw new Error("Database error");
    }
  },

  // ✅ Add a new tracking record
  addRecord: async (userId, website, duration) => {
    const userIdNum = parseInt(userId, 10);
    const durationNum = parseInt(duration, 10);
    if (!userIdNum || !website || !durationNum) {
      console.log("Invalid data:", userId, website, duration);
      throw new Error("All fields are required");
    }

    try {
      const connection = await dbConnect.getConnection();

      // Step 1: Check if a record exists for today
      const [existing] = await connection.query(
        `SELECT id, duration FROM tracking_data 
         WHERE user_id = ? AND website = ? AND DATE(created_at) = CURDATE() 
         LIMIT 1`,
        [userIdNum, website]
      );

      let result;

      if (existing.length > 0) {
        // Step 2a: If exists, update duration
        const newDuration = existing[0].duration + durationNum;
        [result] = await connection.query(
          `UPDATE tracking_data SET duration = ? WHERE id = ?`,
          [newDuration, existing[0].id]
        );
      } else {
        // Step 2b: If not, insert new record
        [result] = await connection.query(
          `INSERT INTO tracking_data (user_id, website, duration) VALUES (?, ?, ?)`,
          [userIdNum, website, durationNum]
        );
      }

      connection.release();
      console.log("Add/Update Record Result:", result);
      return result;
    } catch (error) {
      console.error("Error adding/updating record:", error);
      throw new Error("Database error");
    }
  },
  // ✅ Delete a record by ID (only admins should use this)
  delRecord: async (id) => {
    const recordId = parseInt(id, 10);
    if (!recordId) throw new Error("Invalid record ID");

    try {
      const connection = await dbConnect.getConnection();
      const [result] = await connection.query(
        "DELETE FROM tracking_data WHERE id = ?",
        [recordId]
      );
      connection.release();
      console.log("Delete Record Result:", result);
      return result;
    } catch (error) {
      console.error("Error deleting record:", error);
      throw new Error("Database error");
    }
  },
};

module.exports = Tracker;
