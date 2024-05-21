import db from "../config/database.js";
import bcrypt from "bcryptjs";

export const registerUser = (req, res) => {
  const salt = 10;
  const { user, password, role } = req.body;
  const sql = "INSERT INTO users (user, password, role) VALUES (?, ?, ?)";

  bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
      console.error("Error while hashing password:", err);
      return res.status(500).json({ Error: "Error while hashing password" });
    }

    db.query(sql, [user, hash, role], (err, result) => {
      if (err) {
        console.error("Error inserting data into server:", err);
        return res
          .status(500)
          .json({ Error: "Inserting data error in server" });
      }
      return res.json({ Status: "Success" });
    });
  });
};
