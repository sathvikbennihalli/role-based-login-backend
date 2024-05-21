import express from "express";
import { addUser } from "../../controllers/addUserController.js";
const router = express.Router();

router.post("/", addUser);

export default router;
