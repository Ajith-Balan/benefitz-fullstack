import userModel from "../models/user.model.js";
import nodemailer from 'nodemailer'
import {comparePassword,  hashPassword } from "../helpers/authhelper.js";
import JWT from "jsonwebtoken"
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import crypto from 'crypto'



dotenv.config()

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, invitecode } = req.body;

    // Validations
    if (!name) return res.send({ error: "Name is Required" });
    if (!email) return res.send({ message: "Email is Required" });
    if (!password) return res.send({ message: "Password is Required" });
    if (!phone) return res.send({ message: "Phone no is Required" });

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        msg: "Already Registered. Please login.",
      });
    }

    // Generate new usercode
    const prefix = "BNFTZ";
    const latestUser = await userModel.findOne().sort({ createdAt: -1 });

    let newUserCode;
    if (latestUser?.usercode) {
      const lastCodeNum = parseInt(latestUser.usercode.replace(prefix, "")) || 0;
      newUserCode = `${prefix}${lastCodeNum + 1}`;
    } else {
      newUserCode = `${prefix}0`; // starting code
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = new userModel({
      name,
      email,
      phone,
      invitecode,
      usercode: newUserCode,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send({
      success: true,
      msg: "User Registered Successfully",
      usercode: newUserCode,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in register",
      error,
    });
  }
};


export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          msg: "Invalid email or password",
        });
      }
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(405).send({
          success: false,
          msg: "Email is not registerd",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(404).send({
          success: false,
          msg: "Invalid Password",
        });
      }
      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWTSECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        msg: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          invitecode: user.invitecode,
          role: user.role,
          usercode: user.usercode,
          receipt: user.receipt,
          amount: user.amount,
          updatedAt: user.updatedAt,


        },
        
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        msg: "Error in login",
        error,
      });
    }
  };
  
  export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };








  export const updateProfile = async (req, res) => {
    try {
    



      const { name, email, phone, password } = req.body;
  
      // Find the user by ID
    
      const user = await userModel.findById(req.user._id);

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      // Create an object to store updated fields
      const updatedData = {
        name: name || user.name,
        email: email || user.email,
        phone: phone || user.phone,
      };
  
      // If password is provided, hash it (assuming you have a function for hashing passwords)
      if (password) {
        updatedData.password = await hashPassword(password); // Assuming `hashPassword` is a helper function
      }
  
      // Update the user's profile

      const updatedUser = await userModel.findByIdAndUpdate(req.user._id, updatedData, { new: true });
  
      res.status(200).send({
        success: true,
        message: "Profile updated successfully",
        updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Error while updating profile",
        error,
      });
    }
  };
  



  
export async function getUsers(req,res){
  try{

      const data=await userModel.find();
      res.status(200).send(data)
  }catch (error){
      res.status(500).send(error)
  }
}




// Import necessary modules

export const updatePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validate inputs
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "New password is required" });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid user",
      });
    }

    // Hash the new password and update the user
    const hashed = await hashPassword(newPassword);
    await userModel.updateOne({ email }, { $set: { password: hashed } });

    // Send success response
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};






  

  const transporter = nodemailer.createTransport({
    service: 'smtpout.secureserver.net',
    host: "smtpout.secureserver.net",
    port:587, //465 true
    secure:false, // You can change this to your email service provider
    auth: {
      user: process.env.EMAIL_USER, // Your email address from the environment variables
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });
  
  // Generate a 6-digit OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString(); 
  
  // Store OTPs temporarily (consider using a database for production)
  const otpStore = {}; 

  export const Forget = async (req, res) => {
    const { email } = req.body;
    
    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "User not found " });
    }
  
    const otp = generateOtp(); // Generate OTP
    otpStore[email] = otp; // Store OTP for verification
    const mailOptions = {
      from: {
        name: 'Benefitz International',
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: 'Your OTP Code for Benefitz International',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0044cc; padding: 20px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0;">Benefitz International</h2>
            </div>
            <div style="padding: 20px;">
              <h3>Hello,</h3>
              <p>Thank you for choosing Benefitz International. To proceed with your request, please use the OTP code provided below:</p>
              <p style="text-align: center; font-size: 24px; font-weight: bold; color: #0044cc;">${otp}</p>
              <p>If you did not request this code, please ignore this email.</p>
              <p>Thank you,<br>Benefitz International Team</p>
            </div>
            <div style="background-color: #f7f7f7; padding: 10px; text-align: center; font-size: 12px; color: #777;">
              <p>This is an automated email, please do not reply.</p>
            </div>
          </div>
        </div>
      `,
    };
    
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ error: 'Failed to send OTP. Please try again.' });
    }
  };
  




  export const verifyotp = async (req, res) => {
    const { email, otp } = req.body;
  
    // Check if the OTP matches
    if (otpStore[email] === otp) {
      delete otpStore[email]; // OTP verified, remove it
      res.status(200).json({ message: 'OTP verified successfully!' });
    } else {
      res.status(400).json({ error: 'Invalid OTP. Please try again.' });
    }
  };
  



  export async function createOrder(req,res){
    const options = {
      amount: 9900,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
  
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      // const order = await razorpay.userModel.updateOne(options);
      const order = await userModel.findByIdAndUpdate(req.user._id, options, { new: true });

      res.status(200).send(order);
    } catch (error) {
      res.status(500).json({ message: "Error creating order", error });
    }
  }
  
  


  export async function verifyPayment(req, res) {
    const subuser = await userModel.findById({_id:req.user._id});
  
    if (!subuser) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }
  
    try {
      
  
      if (subuser.receipt) {
        const subscription = new userModel({
          amount: 999,
          status: "Success",
        });
  
        await subscription.save();
        return res.json({ success: true, message: "Payment verified", subscription });
      } else {
        return res.status(400).json({ success: false, message: "Invalid Signature" });
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }












