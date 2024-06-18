import express from 'express';
import { createColumn, columnList, deleteColumn } from '../controllers/column.controller.js';
const router = express.Router();

router.post('/column/create', createColumn);
router.get('/column/list', columnList);
router.delete('/column/:id', deleteColumn);

export default router;
