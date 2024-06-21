import express from 'express';
import { createTask, updateTask, deleteTask, taskList } from '../controllers/task.controller.js';
const router = express.Router();

router.post('/task/create', createTask);
router.put('/task/update/:id', updateTask);
router.delete('/task/delete/:id', deleteTask);
router.get('/task/list', taskList);
export default router;
