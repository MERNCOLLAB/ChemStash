import Chemical from '../models/chemical.model.js';

// add chemical
export const createChemical = async (req, res, next) => {
  const {
    name,
    casNumber,
    molecularFormula,
    purity,
    location,
    supplier,
    quantity,
    unit,
    purchaseDate,
    expiryDate,
    sds,
    hazardClassification,
    remarks,
  } = req.body;

  const newChemical = new Chemical({
    name,
    casNumber,
    molecularFormula,
    purity,
    location,
    supplier,
    quantity,
    unit,
    purchaseDate,
    expiryDate,
    sds,
    hazardClassification,
    remarks,
  });
  try {
    await newChemical.save();
    res.status(201).json({ message: 'chemical create successfully' });
  } catch (error) {
    next(error);
    console.log('chemical error', error.message);
  }
};

// chemical list
export const chemicalList = async (req, res, next) => {
  try {
    const chemicals = await Chemical.find();
    res.json(chemicals);
  } catch (err) {
    next(errorHandler(500, 'Server Error'));
  }
};

// delete chemical

export const deleteChemical = async (req, res, next) => {
  try {
    await Chemical.findByIdAndDelete(req.params.id);
    res.status(200).json('chemical has been deleted...');
  } catch (error) {
    next(error);
  }
};

export const updateChemical = async (req, res, next) => {
  try {
    const updateChemical = await Chemical.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          casNumber: req.body.casNumber,
          molecularFormula: req.body.molecularFormula,
          purity: req.body.purity,
          location: req.body.location,
          supplier: req.body.supplier,
          quantity: req.body.quantity,
          unit: req.body.unit,
          purchaseDate: req.body.purchaseDate,
          expiryDate: req.body.expiryDate,
          sds: req.body.sds,
          hazardClassification: req.body.hazardClassification,
          remarks: req.body.remarks,
        },
      },
      { new: true }
    );
    // const { password, ...rest } = updatedUser._doc;
    res.status(200).json({ data: updateChemical, message: 'Item successfully updated' });
  } catch (error) {
    next(error);
  }
};
