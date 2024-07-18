import mongoose from 'mongoose';

const boardColumnSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    color: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

const ColumnBoard = mongoose.model('ColumnBoard', boardColumnSchema);

export default ColumnBoard;
