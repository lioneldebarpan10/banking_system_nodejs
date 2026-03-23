const accountModel = require("../models/account.model")
const jwt = require("jsonwebtoken")


async function createAccountController(req , res){

   const user = req.user

   const account = await accountModel.create({
      user: user._id
   })

   res.status(201).json({
      message: "Account Created Successfully",
      account
   })

}

module.exports = {
   createAccountController,
}
