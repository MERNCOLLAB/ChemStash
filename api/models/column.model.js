import mongoose from 'mongoose';

const boardColumnSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    order: { type: Number, required: true }, // Add this field
  },
  { timestamps: true }
);

const ColumnBoard = mongoose.model('ColumnBoard', boardColumnSchema);

export default ColumnBoard;
