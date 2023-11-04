const express = require("express")
const {registerController,getOrdersController,orderStatusController,getAllOrdersController,updateProfileController,LoginController,testController,proterUserConroller,proterAdminConroller,forgotPasswordController}= require("../controller/authController")
const {requireSignIn,isAdmin} = require("../middleware/authMiddleware")

const router = express.Router()

//routing
//REGISTER
router.post('/register', registerController)

//LOGIN
router.post('/login',LoginController)
//Forgot Password
router.post('/forgot-password', forgotPasswordController)

//test get route
router.get('/test',requireSignIn,testController)

//protected user route
router.get('/user-auth',requireSignIn,proterUserConroller)

// route admin auth
router.get('/admin-auth',requireSignIn, isAdmin,proterAdminConroller)
//update profile
router.put('/profile',requireSignIn, updateProfileController)
//order
router.get("/orders", requireSignIn, getOrdersController)
//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);
// order status update
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController);
  
module.exports= router