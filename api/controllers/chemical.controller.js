import Chemical from "../models/chemical.model.js";

// add chemical
export const createChemical = async (req, res, next) => {
  const { name, casNumber, molecularFormula, purity, location, supplier } =
    req.body;

  const newChemical = new Chemical({
    name,
    casNumber,
    molecularFormula,
    purity,
    location,
    supplier,
  });
  try {
    await newChemical.save();
    res.status(201).json({ message: "chemical create successfully" });
  } catch (error) {
    next(error);
    console.log("chemical error");
  }
};
