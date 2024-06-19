import express from 'express';
import {
  createColumn,
  columnList,
  deleteColumn,
  updateColumnOrder,
  updateColumnTitle,
} from '../controllers/column.controller.js';
const router = express.Router();

router.post('/column/create', createColumn);
router.get('/column/list', columnList);
router.delete('/column/:id', deleteColumn);
router.post('/column/updateOrder', updateColumnOrder);
router.put('/column/updateTitle', updateColumnTitle);
export default router;
