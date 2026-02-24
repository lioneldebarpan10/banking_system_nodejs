const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const emailService = require("../services/email.service")
/** 
 * - user register controller
 * - POST /api/auth/register
 */
async function userRegisterController(req, res) {

   const { email, password, name } = req.body
   const isExists = await userModel.findOne({
      email: email,
   })

   if (isExists) {
      return res.status(422).json({
         message: "User already exists with email",
         status: "Failed"
      })
   }

   const user = await userModel.create({
      email, password, name,
   })

   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" }) // from JWT secret key generator
   res.cookie("token", token);
   // new resource creation in api endpoint because of user request
   res.status(201).json({

      user: {
         _id: user._id,
         email: user.email,
         name: user.name,
      },
      token
   })
   await emailService.sendRegisterEmail(user.email , user.name)

}

/**
 * - user login controller
 * - POST api/auth/login
 */
async function userLoginController(req, res) {

   const { email, password } = req.body

   const user = await userModel.findOne({ email }).select("+password")

   if (!user) {
      return res.status(401).json({
         message: "Invalid User or Password"
      })
   }

   const isValidPassword = await user.comparePassword(password)

   if (!isValidPassword) {
      return res.status(401).json({
         message: "Email or password in Invalid"
      })
   }
   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })
   res.cookie("token", token);

   res.status(200).json({

      user:{
          userId: user._id,
         email: user.email,
         name: user.name,
      },
      token

   })
}

/**
 * - user logout controller
 * - POST api/auth/logout
 * 
 */

module.exports = {
   userRegisterController,
   userLoginController,

}

