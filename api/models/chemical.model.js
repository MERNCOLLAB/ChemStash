import mongoose from "mongoose";

const chemicalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    casNumber: {
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
    supplier: {
      type: String,
      required: true,
      default: null,
    },
  },
  { timestamps: true }
);

const Chemical = mongoose.model("Chemical", chemicalSchema);

export default Chemical;
