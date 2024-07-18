import express from 'express';
import {
  createColumn,
  columnList,
  deleteColumn,
  updateColumnOrder,
  updateColumnContent,
} from '../controllers/column.controller.js';
const router = express.Router();

router.post('/column/create', createColumn);
router.get('/column/list', columnList);
router.delete('/column/:id', deleteColumn);
router.post('/column/updateOrder', updateColumnOrder);
router.put('/column/updateColumnContent', updateColumnContent);
export default router;
