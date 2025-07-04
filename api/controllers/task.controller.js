import Task from '../models/task.model.js';
import { io } from '../index.js';

export const taskList = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ order: 1 });
    io.emit('taskListUpdated', tasks);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  const { id, username, columnId, order } = req.body;

  if (!id || !username || !columnId || !order === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const taskId = Number(id);
  if (isNaN(taskId)) {
    return res.status(400).json({ message: 'Invalid task id' });
  }

  try {
    const newTask = new Task({
      id,
      columnId,

      username,
      order,
    });

    await newTask.save();

    io.emit('createTask', newTask);
    res.status(201).json({ message: 'Task has been created', newTask });
  } catch (error) {
    next(error);
    console.error('Task Error', error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ id: req.params.id });

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

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { content, dueDate, assignedUsers, priority, desc } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { id },
      { content, dueDate, assignedUsers, priority, desc },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    io.emit('taskUpdated', updatedTask);
    res.status(200).json({ message: 'Task updated successfully', updatedTask });
  } catch (error) {
    next(error);
  }
};

export const updateTaskColumnAndOrder = async (req, res, next) => {
  const { id } = req.params;
  const { columnId, order } = req.body;

  if (!id || columnId === undefined || order === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const updatedTask = await Task.findOneAndUpdate({ id }, { columnId, order }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    io.emit('taskUpdated', updatedTask);
    res.status(200).json({ message: 'Task updated successfully', updatedTask });
  } catch (error) {
    next(error);
  }
};
