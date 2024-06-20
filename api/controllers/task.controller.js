import Task from '../models/task.model.js';
import { io } from '../index.js';

export const createTask = async (req, res, next) => {
  const { id, content, order } = req.body;

  const taskId = Number(id);

  if (isNaN(taskId)) {
    return res.status(400).json({ message: 'Invalid task id' });
  }
  const newTask = new Task({
    id,
    content,
    order,
  });
  try {
    await newTask.save();

    io.emit('taskAdded', newTask);

    res.status(201).json({ message: 'Task has been created', newTask });
  } catch (error) {
    next(error);
    console.error('Task Error', error);
  }
};

export const updateTask = async (req, res) => {
  console.log('Update');
};

export const deleteTask = async (req, res) => {
  console.log('Delete');
};
