import express from 'express';
import { updateMap, viewMap } from '../controllers/map.controller.js';

const router = express.Router();

router.put('/update', updateMap);
router.get('/viewmap', viewMap);
export default router;
