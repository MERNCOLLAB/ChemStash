import ColumnBoard from '../models/column.model.js';

export const test = (req, res) => {
  res.json({
    message: 'APi is working',
  });
};
// add column
export const createColumn = async (req, res) => {
  const { id, title } = req.body;
  const newColumn = new ColumnBoard({
    id,
    title,
  });

  try {
    await newColumn.save();
    res.status(201).json({ message: 'Column create successfully' });
  } catch (error) {
    next(error);
    console.log('column error');
  }
};

// delete column
export const deleteColumn = async (req, res, next) => {
  try {
    await ColumnBoard.findOneAndDelete({ id: req.params.id });
    res.status(200).json('Column has been deleted...');
  } catch (error) {
    next(error);
  }
};

// column list
export const columnList = async (req, res, next) => {
  try {
    const column = await ColumnBoard.find();
    res.json(column);
  } catch (err) {
    next(errorHandler(500, 'Server Error'));
  }
};
