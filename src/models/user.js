const mongoose = require("mongoose")
const validator = require("validator")
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email is valid")
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.includes("password"))
          throw new Error("Password shouldn't include 'password'")
      },
    },
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)

module.exports = User
