const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();
const { createAccountController , getUserAccountsController , getAccountBalanceController} = require('../controllers/account.controller')

/**
 * - POST /api/accounts/
 * - Create a new account
 * - Protected Route
 */
router.post("/", authMiddleware.authMiddleware, createAccountController)

/**
 * - GET /api/accounts/
 * - Get all accounts of the logged-in user
 * - Protected Route
 */
router.get("/", authMiddleware.authMiddleware, getUserAccountsController)

/**
 * - GET /api/accounts/balance/:accountId
 */
router.get("/balance/:accountId" , authMiddleware.authMiddleware, getAccountBalanceController)
module.exports = router;