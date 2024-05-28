import express from "express";
import { createChemical } from "../controllers/chemical.controller.js";

const router = express.Router();

router.post("/item", createChemical);

export default router;
