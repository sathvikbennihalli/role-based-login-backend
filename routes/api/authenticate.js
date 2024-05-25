import express from "express";
import { authenticate } from "../../controllers/authController.js";
import verifyUser from "../../middleware/authMiddleWare.js";
const router = express.Router();

// router.get("/", verifyUser, authenticate);
router.get("/", verifyUser, (req, res) => {
  console.log("Authenticated user:", req.user); // Log the authenticated user
  authenticate(req, res);
});

export default router;
