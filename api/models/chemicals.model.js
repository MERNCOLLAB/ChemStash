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
            type: mongoose.Schema.Types.Mixed,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                    return typeof value === 'string' || typeof value === 'number';
                }
            }
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
