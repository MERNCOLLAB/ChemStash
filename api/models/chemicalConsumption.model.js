import mongoose from 'mongoose';

const ChemicalConsumptionSchema = new mongoose.Schema({
  chemicalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chemical',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const ChemicalConsumption = mongoose.model('ChemicalConsumption', ChemicalConsumptionSchema);

export default ChemicalConsumption;
