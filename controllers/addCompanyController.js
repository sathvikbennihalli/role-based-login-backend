import db from "../config/database.js";

export const addCompany = (req, res) => {
  const {
    companyId,
    companyName,
    companyGST,
    companyAddress,
    contactNumber,
    user_id,
  } = req.body;

  const sql =
    "INSERT INTO company (companyId, companyName, companyGST, companyAddress, contactNumber,user_id) VALUES (?, ?, ?, ?, ?,?)";

  db.query(
    sql,
    [
      companyId,
      companyName,
      companyGST,
      companyAddress,
      contactNumber,
      user_id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting company data:", err);
        return res.status(500).json({ Error: "Error inserting company data" });
      }

      return res.json({
        Status: "Success",
        message: "Company added successfully",
      });
    }
  );
};
