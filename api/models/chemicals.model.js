import mongoose from "mongoose";

const chemicalsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        casNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        molecularFormula: {
            type: String,
            required: true,
            unique: true,
        },
        purity: {
            type: String,
            required: true,
            unique: true,
        },
        location: {
            type: String,
            required: true,
            unique: false,
        },
        supplier: {
                    type: String,
                    required: true,
                    unique: false,
                    default:null,
        }
    },
    { timestamps: true}
);

const Chemicals = mongoose.model("Chemicals", chemicalsSchema);

export default Chemicals;
