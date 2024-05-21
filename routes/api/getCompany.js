import express from "express";
import { getCompany } from "../../controllers/getCompanyController.js";

const router = express.Router();

router.get("/", getCompany);

export default router;
