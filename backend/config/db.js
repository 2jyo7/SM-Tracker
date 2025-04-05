const mysql = require("mysql2/promise"); // ✅ Use promise-based MySQL
const dotenv = require("dotenv");

dotenv.config(); // ✅ Load environment variables from.env file

const dbConnect = mysql.createPool({
  host: process.env.DB_HOST || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = dbConnect;
