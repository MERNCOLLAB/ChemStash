import mongoose from 'mongoose';

const ChemicalConsumptionSchema = new mongoose.Schema({
  chemicalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chemical',
    required: true,
  },
  consumptionAmount: {
    type: Number,
    required: true,
  },
  supply:{
      type:Number,
      required:true,
  },
  unit: {
    type: String,
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
