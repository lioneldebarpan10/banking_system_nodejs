// starting the server
require("dotenv").config(); // to load environment variables from .env file
const app = require("./src/app");
const connectToDb = require("./src/config/db")

connectToDb();

app.listen(3000 , () => {
   console.log("Server is running on PORT 3000");
})