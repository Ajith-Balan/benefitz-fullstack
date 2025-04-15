import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },

    description: {
      type: String,
      required: true,
    },

    details: {
      type: String,
      required: true,
    },
  
  
  },
  { timestamps: true }
);



export default mongoose.model("countries", countrySchema);