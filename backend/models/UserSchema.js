import mongoose from "mongoose";
import validator from "validator";
const { Schema } = mongoose;

const UserSchema = new Schema({
    
  UserName: {
    type: String,
    required: true,
    minLength: [3, "Username must be at least 3 characters long."],
    maxLength: [255, "Username cannot exceed 255 characters."]
  },
  FirstName: {
    type: String,
    required: true,
    minLength: [3, "First Name must be at least 3 characters long."],
    maxLength: [255, "Username cannot exceed 255 characters."]
  },
  LastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name must be at least 3 characters long."],
    maxLength: [255, "Username cannot exceed 255 characters."]
  },
  
  Password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters long."]
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Provide a valid email"]
  },
  PhoneNo: {
    type: String,
    required: true,
    minLength: [11, "Phone number must contain 11 digits."],
    maxLength: [11, "Phone number must contain 11 digits."]
  },
  city: {
    type: String,
    required: true
  }
});

export const User = mongoose.model("User", UserSchema);