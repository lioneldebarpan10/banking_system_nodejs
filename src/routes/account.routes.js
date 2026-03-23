const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();
const { createAccountController } = require('../controllers/account.controller')

/**
 * - POST /api/accounts/
 * - Create a new account
 * - Protected Route
 */
router.post("/", authMiddleware.authMiddleware, createAccountController)


module.exports = router;