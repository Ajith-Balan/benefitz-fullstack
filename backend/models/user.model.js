import mongoose, {Mongoose,model}from "mongoose";
const userSchema=new mongoose.Schema
({

    name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    
      invitecode: {
        type: String,
      },

      usercode: {
        type: String,
        
      },

      
  
      role: {
        type: Number,
        default: 0,
      },

      amount: {
        type: String,
      },
      currency: {
        type: String,
      },
      receipt: {
        type: String,
      },
     
   

      status: {
        type: String,
      },
    },
    { timestamps: true }

)
export default mongoose.model.users || mongoose.model('users',userSchema)
