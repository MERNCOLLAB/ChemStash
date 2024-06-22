import mongoose from 'mongoose';

const chemicalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    lotNumber: {
      type: Number,
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
    unit: {
      type: String,
      required: true,
      default: 'Bottle',
    },
    purchaseDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['New', 'Open', 'Near Expiry', 'Expired', 'Out of Stock'],
      default: 'New',
    },
    sds: {
      type: String,
      required: true,
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

const Chemical = mongoose.model('Chemical', chemicalSchema);

export default Chemical;
