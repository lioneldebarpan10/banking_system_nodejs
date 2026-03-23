// server instance creation & server config
const express = require("express");
const cookieParser = require("cookie-parser") // to parse cookie from request header

const app = express();
app.use(express.json()) // to read json data from request body
app.use(cookieParser())


// Required Routes
const authRouter = require("./routes/auth.routes")
const accountRouter = require("./routes/account.routes")

// use defined routes
app.use("/api/auth", authRouter); // all request hit /api/auth in server will be redirected to authRouter
app.use("/api/accounts", accountRouter)
module.exports = app