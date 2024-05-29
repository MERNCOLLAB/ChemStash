import express from "express";
import {
  createChemical,
  chemicalList,
} from "../controllers/chemical.controller.js";

const router = express.Router();

router.post("/item", createChemical);
router.get("/list", chemicalList);

export default router;
