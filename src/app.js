// server instance creation & server config
const express = require("express");
const cookieParser = require("cookie-parser") // to parse cookie from request header

const app = express();
app.use(express.json()) // to read json data from request body
app.use(cookieParser())


// Required Routes
const authRouter = require("./routes/auth.routes")
const accountRouter = require("./routes/account.routes")
const transactionRoutes = require("./routes/transaction.routes")

app.get("/" ,(req , res) => {
   res.send("Ledger-Transaction system is running")
})


// use defined routes
app.use("/api/auth", authRouter); //  hit request /api/auth 
app.use("/api/accounts", accountRouter) // hti request /api/accounts
app.use("/api/transactions", transactionRoutes) // hit request /api/transactions

module.exports = app