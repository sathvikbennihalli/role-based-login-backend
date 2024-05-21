import express from "express";
import { authenticate } from "../../controllers/authController.js";
import verifyUser from "../../middleware/authMiddleWare.js";
const router = express.Router();

router.get("/", verifyUser, authenticate);

export default router;
