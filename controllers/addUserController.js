import db from "../config/database.js";
import bcrypt from "bcryptjs";

const salt = 10;

export const addUser = (req, res) => {
  const { email, companyID, password } = req.body;
  const sql =
    "INSERT INTO company_users (email, company_id, password) VALUES (?, ?, ?)";

  bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
      console.error("Error while hashing password:", err);
      return res.status(500).json({ Error: "Error while hashing password" });
    }

    db.query(sql, [email, companyID, hash], (err, result) => {
      if (err) {
        console.error("Error inserting data into server:", err);
        return res
          .status(500)
          .json({ Error: "Inserting data error in server" });
      }

      return res.json({
        Status: "Success",
        message: "User added successfully",
      });
    });
  });
};
