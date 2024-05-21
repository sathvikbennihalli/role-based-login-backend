import db from "../config/database.js";

export const getUsers = (req, res) => {
  const sql = "SELECT email, company_id FROM company_users";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Error fetching users" });
    }
    res.json(results);
  });
};
