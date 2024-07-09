import Chemical from '../models/chemical.model.js';
import moment from 'moment';

// add chemical
export const createChemical = async (req, res, next) => {
  const initialChemicalData = req.body;

  const newChemical = new Chemical(initialChemicalData);
  try {
    await newChemical.save();
    res.status(201).json({ message: 'Chemical Created successfully' });
  } catch (error) {
    next(error);
    console.error('Error in createChemical controller', error.message);
  }
};

// chemical list
export const chemicalList = async (req, res, next) => {
  try {
    const { query } = req.params;

    if (query === 'low-amount') {
      const chemicals = await Chemical.find({ supply: { $gt: 0, $lt: 5 } });
      return res.json(chemicals);
    }
    if (query === 'out-of-stock') {
      const chemicals = await Chemical.find({ supply: { $eq: 0 } });
      return res.json(chemicals);
    }
    if (query === 'expired') {
      const currentDate = moment().startOf('day').toDate();
      const chemicals = await Chemical.find({ expiryDate: { $lt: currentDate } });
      return res.json(chemicals);
    }

    const chemicals = await Chemical.find();
    res.json(chemicals);
  } catch (err) {
    next(err);
  }
};

// delete chemical

export const deleteChemical = async (req, res, next) => {
  try {
    await Chemical.findByIdAndDelete(req.params.id);
    res.status(200).json('chemical has been deleted...');
  } catch (error) {
    next(error);
    console.error('Error in deleteChemical controller', error.message);
  }
};
// update Chemical
export const updateChemical = async (req, res, next) => {
  try {
    const updateChemical = await Chemical.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ data: updateChemical, message: 'Item successfully updated' });
  } catch (error) {
    next(error);
    console.error('Error in updateChemical controller', error.message);
  }
};
