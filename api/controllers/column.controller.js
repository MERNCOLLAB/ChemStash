import ColumnBoard from '../models/column.model.js';
import { io } from '../index.js';
export const test = (req, res) => {
  res.json({
    message: 'APi is working',
  });
};
// add column
export const createColumn = async (req, res, next) => {
  const { id, title } = req.body;
  const newColumn = new ColumnBoard({
    id,
    title,
  });

  try {
    await newColumn.save();

    // Emit event to all connected clients
    io.emit('columnAdded', newColumn);

    res.status(201).json({ message: 'Column created successfully', newColumn });
  } catch (error) {
    next(error);
    console.log('Column error:', error);
  }
};

// delete column
export const deleteColumn = async (req, res, next) => {
  try {
    const deletedColumn = await ColumnBoard.findOneAndDelete({ id: req.params.id });
    io.emit('columnDeleted', deletedColumn); // Emit event to all connected clients
    res.status(200).json('Column has been deleted...');
  } catch (error) {
    next(error);
  }
};
// column list
export const columnList = async (req, res, next) => {
  try {
    const columns = await ColumnBoard.find();
    io.emit('columnListUpdated', columns); // Emit event to all connected clients
    res.json(columns);
  } catch (err) {
    next(errorHandler(500, 'Server Error'));
  }
};
