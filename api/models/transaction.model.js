import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  chemical: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chemical',
    required: true,
  },
  type: {
    type: String,
    enum: ['Consumption', 'Supply'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: ['grams', 'mg', 'mL', 'L'],
    required: true,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
