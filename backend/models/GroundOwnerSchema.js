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
  startingDate: Date,
  endingDate: Date,
  RegStartingDate: Date,
  RegEndingDate: Date,
  MembersPerTeam: Number,
  winningTeamName: { type: String, default: null },
  NoOfRegTeams:  {
    type: Number,
    default: 0,
  },
  teamsCount: Number,
  Teams: [{
    name: String,
    captainName: String,
    Players: [{
      Name: String,
      Email: String,
      Number: Number
    }],
    RegistrationNumber: Date,
    RegistrationDate: Date,
    RegisteredBy: String
  }]
});

const ReviewSchema= new Schema({
  Date: {
    type: String,
    required: true,
  },
  UserName: {
    type: String,
  },
  Review: {
    type: String,
    required: true,
  },
})
const RatingSchema = new Schema({
  NoOfRatings: {
    type: Number,
    default: 0,
  },
  SumOfRating: {
    type: Number,
    default: 0,
  },
  MeanRating: {
    type: Number,
    default: 0,
  },
});


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
  Rating: RatingSchema,
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