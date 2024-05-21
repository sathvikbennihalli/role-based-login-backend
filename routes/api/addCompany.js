import express from "express";
import { addCompany } from "../../controllers/addCompanyController.js";

const router = express.Router();

router.post("/", addCompany);

export default router;
