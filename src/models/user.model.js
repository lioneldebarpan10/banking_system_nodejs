const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

   email: {
      type: String,
      required: [true, "Email is required for creating a User"],
      trim: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email Address"// validate email format from regex 
      ],
      unique: [true, "Email already exists"]
   },
   name: {
      type: String,
      required: [true, "Name is Required for creating an account"],
   },
   password: {
      type: String,
      required: [true, "Password is required for creating an account"],
      minlength: [6, "Password should be contain more than 6 character"],
      select: false, // password is by default set to false can not be fetched thorugh any query until we ask for it
   },
},
   {
      timestamps: true
   }
)

// middleware to hash the password before saving the user in database
userSchema.pre("save", async function (next) {
   // if password is not modified then return , do nothing
   if (!this.isModified("password")) {
      return;
   }
   // if password is modified then we have to convert it in hash
   const hash = await bcrypt.hash(this.password, 10);
   this.password = hash

   return
})

// method to compare the password entered by user with the hashed password stored in database
userSchema.methods.comparePassword = async function (password) {
   console.log(password , this.password)
   return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("user", userSchema)
module.exports = userModel 