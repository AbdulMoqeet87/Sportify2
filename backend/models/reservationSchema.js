import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name MUST be of at least 3 Characters."],
    maxLength: [30, "First name CANNOT exceed 30 Characters."],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name MUST be of at least 3 Characters."],
    maxLength: [30, "Last name CANNOT exceed 30 Characters."],
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, "Phone number MUST contain 11 Digits."],
    maxLength: [11, "Phone number MUST contain 11 Digits."],
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);
