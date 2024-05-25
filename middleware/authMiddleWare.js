import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  // console.log(req);
  // console.log("Token:", token); // Log the token to verify its presence
  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  }
  jwt.verify(token, "jwt-secret-key", (err, decoded) => {
    if (err) {
      console.log("Token verification error:", err); // Log the error for debugging
      return res.json({ Error: "Token is not valid" });
    }
    req.user = decoded.user;
    next();
  });
};

export default verifyUser;
