import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
            unique: false,
        },
        transactionType: {
            type: String,
            required: true,
            enum: ['Check-in', 'Check-out', 'Return', 'Disposal', 'Transfer',
                'Adjustment', 'Inspection', 'Reservation', 'Consumption', 'Restock']
        },
        quantity: {
            amount: {
                type: Number,
                required: true,
            },
            unit: {
                type: String,
                required: true,
            }
        }
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
