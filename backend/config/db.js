const mysql = require("mysql2/promise"); // ✅ Use mysql2/promise
const dotenv = require("dotenv");

dotenv.config();

const dbConnect = mysql.createPool({
  // ✅ Use createPool() for better performance
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10, // Limits max connections
  queueLimit: 0,
});

module.exports = dbConnect;
