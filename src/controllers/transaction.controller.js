const transactionModel = require("../models/transaction.model")
const ledgerModel = require("../models/ledger.model")
const emailService = require("../services/email.service")


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
   const {fromAccount , toAccount , amount , idempotencyKey} = req.body

   if(!fromAccount || !toAccount || !amount || ! idempotencyKey){
      return res.status(400).json({
         message: "FromAccount , toAccount , amount & idempotencyKey are required"
      })
   }

   const fromUserAccount = await userModel.findOne({
      _id: fromAccount
   })

   const toUserAccount = await userModel.findOne({
      _id: toAccount
   })

   if(!fromUserAccount || !toUserAccount){
      return res.status(400).json({
         message: "Invalid fromUserAccount or toUserAccount"
      })
   }

   // Step - 2 Validate idempotency key

   const isTransactionAlreadyExists = await transactionModel.findOne({
      idempotencyKey: idempotencyKey
   })

   if(isTransactionAlreadyExists){
      if(isTransactionAlreadyExists.status === 'Completed'){
         return res.status(200).json({message: "Transaction is already processed"})
      }

      if(isTransactionAlreadyExists.status === 'Pending'){
         return res.status(200).json({message: "Transaction is still processing"})
      }

      if(isTransactionAlreadyExists.status === 'Failed'){
         return res.status(500).json({message: "Transaction is failed, please retry"})
      }

      if(isTransactionAlreadyExists.status === 'Reversed'){
         return res.status(500).json({message: "Transaction was reversed, try again"})
      }
   }

   // Step - 3 Check account status

   if(fromUserAccount !== 'Active' && toUserAccount !== 'Active'){
      return res.status(400).json({
         message: "fromAccount and toAccount both must be active to process transaction"
      })
   }





}

module.exports = {
   createTransaction
}
