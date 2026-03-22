const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Account must be associated with user"],
      index: true
   },
   status: {
      enum: {
         values: ["active", "frozen", "closed"],
         message: "Status can be either active, frozen or closed",
      }
   },
   currency: {
      type: String,
      required: [true, "Currency is required for creating an account"],
      default: true,
   },

}, {
   timestamps: true
})

accountSchema.index({ user: 1, status: 1 })

const accountModel = mongoose.model("account", accountSchema)
module.exports = accountModel