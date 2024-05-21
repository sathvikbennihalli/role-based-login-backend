export const logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("userRole");
  return res.json({ Status: "Success " });
};
