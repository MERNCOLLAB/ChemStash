import express from 'express';
import { createTask, updateTask, deleteTask } from '../controllers/task.controller.js';
const router = express.Router();

router.post('/task/create', createTask);
router.put('/task/update/:id', updateTask);
router.delete('/task/delete/:id', deleteTask);

export default router;
