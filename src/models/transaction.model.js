const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

   fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: [true, "Transaction mst be associated with from account"],
      index: true,
   },
   toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: [true, "Transaction must be associated with to account"],
      index: true
   },
   status: {
      type: String,
      enum: {
         values: ["Pending", "Completed", "Failed", "Reversed"],
         message: "Status can be either pending , completed , failed or reversed"
      },
      default: "Pending"
   },
   account: {
      type: Number,
      required: [true, "Amount is required for creating transaction"],
      min: [0, "Transaction can not be negative"]
   },
   idempotencyKey: {
      type: String,
      required: [true, "Idempotency key is required for creating a transaction"],
      index: true,
      unique: true
   }
}, {
   timestamps: true
})

const transactionModel = mongoose.model("transaction", transactionSchema);
module.exports = transactionModel