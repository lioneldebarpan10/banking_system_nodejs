// server instance creation & server config
const express = require("express");
const cookieParser = require("cookie-parser") // to parse cookie from request header

const app = express();

// Required Routes
const authRouter = require("./routes/auth.routes")

app.use(express.json()) // to read json data from request body
app.use(cookieParser())


app.use("/api/auth" , authRouter); // all request hit /api/auth in server will be redirected to authRouter

module.exports = app