const transactionModel = require("../models/transaction.model")
const ledgerModel = require("../models/ledger.model")
const emailService = require("../services/email.service")


/**
 * - Create a new transaction
 *    The 10- Step Transfer Flow
 *    1.Validate Request
 *    2.Validate idempotenc key
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