import ColumnBoard from '../models/column.model.js';
import { io } from '../index.js';
export const test = (req, res) => {
  res.json({
    message: 'APi is working',
  });
};
// add column
export const createColumn = async (req, res, next) => {
  const { id, title, order } = req.body; // Ensure to receive the order as well
  const newColumn = new ColumnBoard({
    id,
    title,
    order, // Set the order field
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
    if (!deletedColumn) {
      return res.status(404).json({ message: 'Column not found' });
    }

    io.emit('columnDeleted', deletedColumn); // Emit event to all connected clients
    res.status(200).json({ message: 'Column has been deleted', deletedColumn });
  } catch (error) {
    next(error);
  }
};

// column list
export const columnList = async (req, res, next) => {
  try {
    const columns = await ColumnBoard.find().sort({ order: 1 }); // Sort by order if you want to maintain a specific order
    io.emit('columnListUpdated', columns); // Emit event to all connected clients
    res.json(columns);
  } catch (err) {
    next(err); // Pass the error to the next middleware
  }
};
// column order
export const updateColumnOrder = async (req, res, next) => {
  const updatedColumns = req.body;
  try {
    // Assuming `updatedColumns` is an array of columns with their new order
    for (const column of updatedColumns) {
      await ColumnBoard.findByIdAndUpdate(column._id, { order: column.order });
    }
    io.emit('columnOrderUpdated', updatedColumns); // Emit event to all connected clients
    res.status(200).json({ message: 'Columns order updated successfully' });
  } catch (error) {
    next(error);
  }
};

// update column title

export const updateColumnTitle = async (req, res, next) => {
  const { id, title } = req.body;

  try {
    const updatedColumn = await ColumnBoard.findOneAndUpdate({ id }, { title }, { new: true });

    if (!updatedColumn) {
      return res.status(404).json({ message: 'Column not found' });
    }

    io.emit('columnTitleUpdated', updatedColumn); // Emit event to all connected clients

    res.status(200).json({ message: 'Column title updated successfully', updatedColumn });
  } catch (error) {
    next(error);
  }
};
