// Import the mysql module and dotenv package
import mysql from "mysql";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a connection to the database using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Export the database connection for use in other modules
export default db;
