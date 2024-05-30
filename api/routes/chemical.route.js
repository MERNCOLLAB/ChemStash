import express from "express";
import {
  createChemical,
  chemicalList,
  deleteChemical,
} from "../controllers/chemical.controller.js";

const router = express.Router();

router.post("/item", createChemical);
router.get("/list", chemicalList);
router.delete("/delete/:id", deleteChemical);
export default router;
