export const authenticate = (req, res) => {
  return res.json({ Status: "Success", user: req.user });
};
