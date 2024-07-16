import Chemical from '../models/chemical.model.js';
import moment from 'moment';
import ChemicalConsumption from '../models/chemicalConsumption.model.js';
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

export const saveConsumption = async (req, res, next) => {
  try {
    const { id, amount, unit, user } = req.body;
    const currentChemical = await Chemical.findById(id);

    if (!currentChemical) {
      return res.status(404).json({ message: 'Chemical not found' });
    }

    const consumptionAmount = amount;

    if (consumptionAmount <= 0) {
      return res.status(400).json({ message: 'Invalid consumption amount. It must be greater than 0.' });
    }

    if (consumptionAmount > currentChemical.amount) {
      return res.status(400).json({ message: 'Consumption amount exceeds available chemical amount.' });
    }

    const newConsumption = new ChemicalConsumption({
      chemicalId: id, // Use id from req.body
      amount: consumptionAmount,
      unit,
      date: new Date(),
      user,
    });
    await newConsumption.save();

    currentChemical.amount -= consumptionAmount;
    await currentChemical.save();

    res.status(200).json({
      message: 'Consumption successfully saved and chemical amount updated',
      data: {
        consumption: newConsumption,
        updatedChemical: currentChemical,
      },
    });
  } catch (error) {
    next(error);
    console.error('Error in saveConsumption controller', error.message);
  }
};
