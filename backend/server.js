const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");
const userRoutes = require("./routes/auth");
const trackerRoutes = require("./routes/trackerRoutes");

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "*", // Change this to specific allowed domains for production
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for Routes
app.use("/api", userRoutes);
app.use("/api", trackerRoutes);

async function startServer() {
  try {
    const [rows] = await dbConnect.query("SELECT 1 + 1 AS solution");
    console.log("The solution is:", rows[0].solution);

    app.listen(process.env.PORT || 4200, () => {
      console.log(`Server listening on port ${process.env.PORT || 4200}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the process if DB fails
  }
}

startServer();
