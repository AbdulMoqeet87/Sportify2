import mongoose from "mongoose";
import validator from "validator";
const { Schema } = mongoose;

const UserSchema = new Schema({
    
  UserName: {
    type: String,
    required: true,
    minLength: [3, "Username MUST be at least 3 characters long."],
    maxLength: [255, "Username CANNOT exceed 255 characters."]
  },
  FirstName: {
    type: String,
    required: true,
    minLength: [3, "First Name MUST be at least 3 characters long."],
    maxLength: [255, "Username CANNOT exceed 255 characters."]
  },
  LastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name MUST be at least 3 characters long."],
    maxLength: [255, "Username CANNOT exceed 255 characters."]
  },
  
  Password: {
    type: String,
    required: true,
    minLength: [6, "Password MUST be at least 6 characters long."]
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  PhoneNo: {
    type: String,
    required: true,
    minLength: [11, "Phone number MUST contain 11 digits."],
    maxLength: [11, "Phone number MUST contain 11 digits."]
  },
  city: {
    type: String,
    required: true
  }
});

export const User = mongoose.model("User", UserSchema);
