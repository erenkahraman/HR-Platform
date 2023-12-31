import mongoose from "mongoose"
import validator from "validator"

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate:[validator.isEmail,"Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  confirmation: {
    type: String,
    required: true,
  },
})


export default mongoose.models.User || mongoose.model("User", userSchema)
