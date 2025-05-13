import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },

    details: {
      type: String,
      required: true,
    },

    category: {
        type: String,
        required: true,
      },
  
  
  },
  { timestamps: true }
);



export default mongoose.model("works", workSchema);