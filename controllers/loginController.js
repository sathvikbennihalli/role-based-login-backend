import db from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = (req, res) => {
  const sql = "SELECT * FROM users WHERE user = ?";
  db.query(sql, [req.body.user], (err, data) => {
    if (err) return res.json({ Error: "Login  error in server" });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });
          if (response) {
            const user = data[0].user;
            const role = data[0].role;
            const token = jwt.sign({ user }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            // res.cookie("token", token, {
            //   httpOnly: true,
            //   secure: process.env.NODE_ENV === "production",
            //   sameSite: "strict",
            // });
            return res.json({
              Status: "Success",
              role: role,

              token: token,
            });
          } else {
            return res.json({ Error: "Password not matched" });
          }
        }
      );
    } else {
      return res.json({ Error: "No email existed" });
    }
  });
};
