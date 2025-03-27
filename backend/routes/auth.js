const express = require("express");
const dbConnect = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authenticateToken = require("../middleware/authMiddleware");

dotenv.config();

const router = express.Router();

// Welcome Route
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the SM-TRACKER! We are here to help you.",
  });
});
///////////////// Sign Up CRUD Routes ///////////////////
// Get All Users
router.get("/getUser", authenticateToken, (req, res) => {
  const getUQuery = `SELECT * FROM users`;

  dbConnect.query(getUQuery, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    res
      .status(200)
      .json({ message: "Users retrieved successfully", data: result });
  });
});

// Create User
router.post("/creatingUser", async (req, res) => {
  const { name, email, password, admin } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const postUQuery = `INSERT INTO users (name, email, password, admin) VALUES (?, ?, ?, ?)`;
    dbConnect.query(
      postUQuery,
      [name, email, hashedPassword, admin],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Database error", details: err });
        }
        res
          .status(201)
          .json({ message: "User created successfully", data: result });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
});

// Update User
router.put("/updateUser/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password, admin } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const updateUQuery = `UPDATE users SET name = ?, email = ?, password = ?, admin = ? WHERE id = ?`;
    dbConnect.query(
      updateUQuery,
      [name, email, hashedPassword, admin, id],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Database error", details: err });
        }
        res
          .status(202)
          .json({ message: "User updated successfully", data: result });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
});

// Delete User
router.delete("/deleteUser/:id", (req, res) => {
  try {
    const { id } = req.params;

    const deleteUQuery = `DELETE FROM users WHERE id = ?`;
    dbConnect.query(deleteUQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }
      res
        .status(200)
        .json({ message: "User deleted successfully", data: result });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: err });
  }
});

////////////////// Login Route ///////////////////////

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    const loginSqlQuery = `SELECT * FROM users WHERE email = ?`;

    dbConnect.query(loginSqlQuery, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }
      if (result.length === 0) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const user = result[0];

      // ✅ Corrected bcrypt.compare() inside the callback
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // ✅ Corrected JWT_SECRET name
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.admin },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      // ✅ Removed unnecessary token check
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.admin,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error });
  }
});

module.exports = router;
