import express from 'express';
import {
  createChemical,
  chemicalList,
  deleteChemical,
  updateChemical,
  saveConsumption,
  getAllConsumptions,
} from '../controllers/chemical.controller.js';

const router = express.Router();

router.post('/item', createChemical);
router.get('/list/:query?', chemicalList);
router.delete('/delete/:id', deleteChemical);
router.post('/update/:id', updateChemical);
router.post('/:id/consume', saveConsumption);
router.get('/consume', getAllConsumptions);
export default router;
