const transactionModel = require("../models/transaction.model")
const ledgerModel = require("../models/ledger.model")
const emailService = require("../services/email.service")
const accountModel = require("../models/account.model")
const mongoose = require("mongoose")
const userModel = require("../models/user.model")

/**
 * - Create a new transaction
 *    The 10- Step Transfer Flow
 *    1.Validate Request
 *    2.Validate idempotency key
 *    3.check account status
 *    4.derive sender balance from ledger
 *    5.create transaction (Pending)
 *    6.create Debit ledger entry
 *    7.create credit ledger entry
 *    8.Mark transaction completed
 *    9. commit MongoDB Session
 *    10. Send email notification
 *   
 */

async function createTransaction(req, res) {

   // Step - 1 Validate request
   const { fromAccount, toAccount, amount, idempotencyKey } = req.body

   if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
      return res.status(400).json({
         message: "FromAccount , toAccount , amount & idempotencyKey are required"
      })
   }

   const fromUserAccount = await accountModel.findOne({
      _id: fromAccount
   })

   const toUserAccount = await accountModel.findOne({
      _id: toAccount
   })

   if (!fromUserAccount || !toUserAccount) {
      return res.status(400).json({
         message: "Invalid fromUserAccount or toUserAccount"
      })
   }

   // Step - 2 Validate idempotency key

   const isTransactionAlreadyExists = await transactionModel.findOne({
      idempotencyKey: idempotencyKey
   })

   if (isTransactionAlreadyExists) {
      if (isTransactionAlreadyExists.status === 'Completed') {
         return res.status(200).json({ message: "Transaction is already processed" })
      }

      if (isTransactionAlreadyExists.status === 'Pending') {
         return res.status(200).json({ message: "Transaction is still processing" })
      }

      if (isTransactionAlreadyExists.status === 'Failed') {
         return res.status(500).json({ message: "Transaction is failed, please retry" })
      }

      if (isTransactionAlreadyExists.status === 'Reversed') {
         return res.status(500).json({ message: "Transaction was reversed, try again" })
      }
   }

   // Step - 3 Check account status

   if (fromUserAccount.status !== 'Active' || toUserAccount.status !== 'Active') {
      return res.status(400).json({
         message: "fromAccount and toAccount both must be active to process transaction"
      })
   }

   // Step - 4 derive sender balance from ledger

   const balance = await fromUserAccount.getBalance()

   if (balance < amount) {

      return res.status(400).json({
         message: `Insufficient balance. Current balance is ${balance} Requested balance is ${amount}`
      })
   }

   let transaction

   try {
      // Step - 5 Create transaction (Pending)-> startsession

      const session = await mongoose.startSession()
      session.startTransaction();

      transaction = new transactionModel({
         fromAccount,
         toAccount,
         amount,
         idempotencyKey,
         status: "Pending"
      })

      // Step - 6 create debit ledger entry
      const debitLedgerEntry = await ledgerModel.create([{
         account: fromAccount,
         amount: amount,
         transaction: transaction._id,
         type: "Debit",
      }], { session })

      // step - 7 create debit ledger entry
      const creditLedgerEntry = await ledgerModel.create([{
         account: toAccount,
         amount: amount,
         transaction: transaction._id,
         type: "Credit",

      }], { session })

      // step - 8 mark the session completed
      transaction.status = "Completed"
      await transaction.save({ session })

      // step - 9 commit session in mongo
      await session.commitTransaction();
      session.endSession();

   }
   catch(error){
      return res.status(500).json({
         message: "Transaction is Pending due to some issue, please retry after sometime",
      })
   }

   // step - 10 send transaction email
   await emailService.sendTransactionEmaill(req.user.email, req.user.name, amount, toAccount)

   return res.status(201).json({
      message: "Transaction created sucessfully",
      transaction: transaction
   })
}

async function createInitialFundsTransaction(req, res) {

   const { toAccount, amount, idempotencyKey } = req.body

   if (!toAccount || !amount || !idempotencyKey) {
      return res.status(400).json({
         message: "toAccount, amount and idempotencyKey are required"
      })
   }

   const toUserAccount = await accountModel.findOne({
      _id: toAccount
   })

   if (!toUserAccount) {
      return res.status(400).json({
         message: "Invalid toAccount"
      })
   }

   const fromUserAccount = await accountModel.findOne({
      user: req.user._id
   })

   if (!fromUserAccount) {
      return res.status(400).json({
         message: "System user account not found"
      })
   }

   // initiate transaction

   const session = await mongoose.startSession();
   session.startTransaction();

   const transaction = (await transactionModel.create([{
      fromAccount: fromUserAccount._id,
      toAccount,
      amount,
      idempotencyKey,
      status: "Pending"
   }], { session }))[0]


   const debitLedgerEntry = await ledgerModel.create([{
      account: fromUserAccount._id,
      amount: amount,
      transaction: transaction._id,
      type: "Debit",
   }], { session })

   await (() => {
      return new Promise((resolve) => setTimeout(resolve, 15 * 1000));
   })()

   const creditLedgerEntry = await ledgerModel.create([{
      account: toUserAccount,
      amount: amount,
      transaction: transaction._id,
      type: "Credit",

   }], { session })


   await transactionModel.findOneAndUpdate(
      { _id: transaction._id },
      { status: "Completed" },
      { session }
   )

   transaction.status = "Completed"
   await transaction.save({ session })

   await session.commitTransaction()
   session.endSession();


   return res.status(201).json({
      message: "Initial Funds transaction completed successfully",
      transaction: transaction
   })
}

module.exports = {
   createTransaction,
   createInitialFundsTransaction
}