import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    mapImgUrl: {
      type: String,
      default:
        "",
    },
  },
  { timestamps: true }
);

const Map = mongoose.model("Map", userSchema);

export default Map;
