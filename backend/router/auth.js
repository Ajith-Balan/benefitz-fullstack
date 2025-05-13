import express from 'express';
import {
  registerController,
  loginController,
  testController,
  updateProfile,

  Forget,
  verifyotp,
  updatePassword,
  createOrder,
  verifyPayment,
  getUsers,
  getoneUser,
} from '../controllers/authcontroller.js';
import { isAdmin, requireSignIn } from '../middlewares/authmiddleware.js';

const router = express.Router();

// User registration route
router.post('/register', registerController);

// User login route
router.post('/login', loginController);


router.get('/getoneuser/:id' ,getoneUser)


// Test route for admin access, protected by sign-in and admin check
router.get('/test', requireSignIn, isAdmin, testController);
router.get('/getusers',  getUsers);


// Route to check if a user is authenticated (without admin check)
router.get('/userauth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});


router.get('/adminauth', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});


router.put('/profile', requireSignIn, updateProfile)

router.post('/resetpassword',  updatePassword)









router.post('/forgetpswd',  Forget)

router.post('/verifyotp',  verifyotp)

router.put('/createsubscribe', requireSignIn,  createOrder)

router.post('/verify',  verifyPayment)



export default router;

