import mongoose from "mongoose";
import validator from "validator";
const { Schema } = mongoose;

const availableSlotsSchema = new Schema({
  Date: String,
  startTime: String,
  endTime: String
});
const SlotSchema = new Schema({
    Date: {
      type: String,
    },
    available: {
      type: Boolean,
      default:true,
    },
    startTime: String,
    endTime: String,
    bookedBy: String,
  });
const tournamentSchema = new Schema({
  TournamentName: String,
  winningPrize: Number,
  PosterPath:String,
  SchedulePath:String,
  startingDate: String,
  endingDate: String,
  RegStartingDate: String,
  RegEndingDate: String,
  winningTeamName: { type: String, default: null },
  teamsCount: Number,
  Teams: [{
    name: String,
    captainName: String,
    Players: [{
      Name: String,
      Number: Number
    }],
    RegistrationNumber: String,
    RegistrationDate: String,
    RegisteredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }]
});
const ReviewSchema= new Schema({
  Date: {
    type: String,
    required: true,
  },
  UserId: {
    type: String,
    required: true,
  },
  Review: {
    type: String,
    required: true,
  },
})
const RatingSchema= new Schema({
  NoOfRatings: Number,
  SumOfRating: Number,
  MeanRating:Number,
})


const groundSchema = new Schema({
  G_Name: String,
  SportsCategory:String,
  Town: String,
  District: String,
  City: String,
  Address: String,
  images:[String],
  PerHourCharges: Number,
  GroundOwnerEmail:String,
  Tournaments: [tournamentSchema],
  Slots:[SlotSchema],
  Reviews:[ReviewSchema],
  Rating: [RatingSchema],
});

const groundOwnerSchema = new Schema({
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
  Grounds: [groundSchema]
});

export const GroundOwner = mongoose.model("GroundOwner", groundOwnerSchema);