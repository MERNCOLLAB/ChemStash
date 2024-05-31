import express from "express";
import {
  createChemical,
  chemicalList,
  deleteChemical,
  updateChemical
} from "../controllers/chemical.controller.js";

const router = express.Router();

router.post("/item", createChemical);
router.get("/list", chemicalList);
router.delete("/delete/:id", deleteChemical);
router.post("/update/:id", updateChemical);
export default router;
