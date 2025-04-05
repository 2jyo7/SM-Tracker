const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");
const userRoutes = require("./routes/auth");
const trackerRoutes = require("./routes/trackerRoutes");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // ✅ Change for production
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Middleware for Routes
app.use("/api", userRoutes);
app.use("/api", trackerRoutes);

// ✅ Handle 404 - Route Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Global Error Handler (Prevents Crashes)
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// ✅ Start Server with DB Check
async function startServer() {
  try {
    const connection = await dbConnect.getConnection(); // ✅ Get connection first
    const [rows] = await connection.query("SELECT 1 + 1 AS solution");
    connection.release(); // ✅ Release connection after use
    console.log("Database connected. Test query result:", rows[0].solution);

    const PORT = process.env.PORT || 4200;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
}

startServer();
