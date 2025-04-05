const express = require("express");
const dbConnect = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// Welcome Route
router.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the SM-TRACKER! We are here to help you." });
});

///////////////// Sign Up Route ///////////////////
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;

    dbConnect.query(
      query,
      [name, email, hashedPassword, role],
      (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Database error", details: err });

        res
          .status(201)
          .json({ message: "User created successfully. Please login." });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
});

////////////////// Login Route ///////////////////////
router.post("/login", async (req, res) => {
  try {
    // console.log("🔹 Incoming request to /login");

    const { email, password } = req.body;
    // console.log("🔹 Request Body:", req.body);

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // console.log("✅ Email and Password received:", email);

    const query = "SELECT * FROM users WHERE email = ?";
    // console.log("🔹 Executing Query:", query, "with params:", email);

    // ✅ Use promise-based connection
    const [result] = await dbConnect.query(query, [email]);

    // console.log("✅ Query Result:", result);

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = result[0];
    // console.log("✅ User Found:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // console.log("✅ Token Generated:", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Error in /login route:", error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
});

////////////////// Logout Route ///////////////////////
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
