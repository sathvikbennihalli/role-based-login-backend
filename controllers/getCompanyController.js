import db from "../config/database.js";

export const getCompany = (req, res) => {
  const sql = "SELECT * FROM company";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching companies:", err);
      return res.status(500).json({ error: "Error fetching companies" });
    }
    res.json(results); // Send array of company objects to frontend
  });
};
