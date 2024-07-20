import Chemical from '../models/chemical.model.js';
import moment from 'moment';
import ChemicalConsumption from '../models/chemicalConsumption.model.js';
// add chemical
export const createChemical = async (req, res, next) => {
  const initialChemicalData = req.body;

  try {
    const { name, batch, casNumber } = initialChemicalData;
    const existingChemical = await Chemical.findOne({ name, batch, casNumber });
    if (existingChemical) {
      return res.status(400).json({ error: 'Chemical with that batch number already exists' });
    }

    const newChemical = new Chemical(initialChemicalData);
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
    if (query === 'barchart') {
      const chemicals = await Chemical.find({}, 'name dateReceived supply amount unit');
      return res.json(chemicals);
    }
    if (query === 'hazardClassification') {
      const chemicals = await Chemical.find({}, 'hazardClassification');
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
    const { supply, ...otherFields } = req.body;

    let updateFields = otherFields;

    // To reset updatedSupply data whenever supply is changed
    if (supply !== undefined) {
      updateFields = {
        ...updateFields,
        supply,
        updatedSupply: supply,
      };
    }
    const updateChemical = await Chemical.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ data: updateChemical, message: 'Chemical successfully updated' });
  } catch (error) {
    next(error);
    console.error('Error in updateChemical controller', error.message);
  }
};

export const saveConsumption = async (req, res, next) => {
  try {
    const { id, consumptionAmount, updatedSupply, unit, user } = req.body;
    const currentChemical = await Chemical.findById(id);

    if (!currentChemical) {
      return res.status(404).json({ message: 'Chemical not found' });
    }

    if (consumptionAmount <= 0) {
      return res.status(400).json({ message: 'Invalid consumption amount. It must be greater than 0.' });
    }

    if (consumptionAmount > currentChemical.amount) {
      return res.status(400).json({ message: 'Consumption amount exceeds available chemical amount.' });
    }

    const totalAmount = currentChemical.updatedSupply * currentChemical.amount;
    const fractionRemaining = (totalAmount - consumptionAmount) / totalAmount;
    const newAmount = currentChemical.amount - consumptionAmount;
    const newSupply = updatedSupply * fractionRemaining;

    const newConsumption = new ChemicalConsumption({
      chemicalId: id,
      updatedSupply,
      consumptionAmount,
      unit,
      date: new Date(),
      user,
    });
    await newConsumption.save();

    currentChemical.updatedSupply = Number(newSupply.toFixed(1));
    currentChemical.amount = Number(newAmount);
    await currentChemical.save();

    res.status(200).json({
      message: 'Consumption successfully saved and chemical amount updated',
      data: {
        consumption: newConsumption,
        updatedChemical: currentChemical,
        updatedSupply: currentChemical.updatedSupply,
      },
    });
  } catch (error) {
    next(error);
    console.error('Error in saveConsumption controller', error);
  }
};

export const getAllConsumptions = async (req, res, next) => {
  try {
    const consumptions = await ChemicalConsumption.find().populate('chemicalId', 'name').sort({ date: 1 });
    res.status(200).json({
      message: 'Consumptions retrieved successfully',
      data: consumptions,
    });
  } catch (error) {
    next(error);
    console.error('Error in getAllConsumptions controller', error.message);
  }
};
