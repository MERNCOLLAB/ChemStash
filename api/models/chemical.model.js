import mongoose from 'mongoose';

const chemicalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    batch: {
      type: Number,
      required: true,
    },
    casNumber: {
      type: String,
      required: true,
    },
    molecularFormula: {
      type: String,
      required: true,
    },
    purity: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
      default: null,
    },
    supply: {
      type: Number,
      required: true,
      default: 0,
    },
    amount: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    dateReceived: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    sds: {
      type: String,
      required: false,
    },
    hazardClassification: {
      type: String,
      required: true,
      default: null,
    },
    remarks: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);
chemicalSchema.index({ name: 1, batch: 1, casNumber: 1 }, { unique: true });

const Chemical = mongoose.model('Chemical', chemicalSchema);

export default Chemical;
