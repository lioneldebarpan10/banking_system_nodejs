const express = require('express');
const transactionRoutes = express.Router();
const { createTransaction } = require("../controllers/transaction.controller")
const authMiddleware = require('../middlewares/auth.middleware');


/**
 * - POST /api/transactions
 * - Create new transaction
 */

transactionRoutes.post("/", authMiddleware.authMiddleware, createTransaction)

/**
 * - POST /api/transactions/system/initial-funds
 * - Create a initial fund for system user
 */
transactionRoutes.post("/system/initial-funds" , authMiddleware.authSystemUserMiddleware)

module.exports = transactionRoutes