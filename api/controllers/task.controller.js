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

export const updateTask = async (req, res, next) => {
  const { id, content, order } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate({ id }, { content, order }, { new: true });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    io.emit('taskUpdated', updatedTask);

    res.status(200).json({ message: 'Task has been updated', updatedTask });
  } catch (error) {
    console.error('Error updating task:', error.message);
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  console.log('Delete Here');
};
