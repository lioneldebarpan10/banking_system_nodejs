const express = require('express');
const transactionRoutes = express.Router();
const transactionController = require("../controllers/transaction.controller")



/**
 * - POST /api/transactions
 * - Create new transaction
 */

transactionRoutes.post("/", transactionController.createTransaction)
transactionRoutes.post("/", transactionController)

module.exports = transactionRoutes