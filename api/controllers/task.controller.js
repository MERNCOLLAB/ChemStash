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
  const { id } = req.params;
  const { content, order } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate({ _id: id }, { content, order }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task is not found' });
    }

    io.emit('taskUpdated', updatedTask);

    res.status(200).json({ message: 'Task has been updated', updatedTask });
  } catch (error) {
    console.error('Error updating the task', error.message);
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  const { id: taskId } = req.params;

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: taskId });

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task is not found' });
    }

    io.emit('taskDeleted', deletedTask);
    res.status(200).json({ message: 'Task has been succesfully deleted', deletedTask });
  } catch (error) {
    console.error('Error deleting the task', error.message);
    next(error);
  }
};
