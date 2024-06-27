import Chemical from '../models/chemical.model.js';
import { initialChemicalData } from '../utils/chemicalinfo.js';
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
    const chemicals = await Chemical.find();
    res.json(chemicals);
  } catch (err) {
    next(err);
    console.error('Error in chemicalList controller', error.message);
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
