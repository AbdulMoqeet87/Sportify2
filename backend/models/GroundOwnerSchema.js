import mongoose from "mongoose";
import validator from "validator";
const { Schema } = mongoose;

// Schema that gives the available slots with theore date, start time, and end time
const availableSlotsSchema = new Schema({
  Date: String,
  startTime: String,
  endTime: String
});

// Schema that defines slot details like the booking status and booked by which user
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

// Schema that defines the tournament details such as name, prize, teams, and dates
const tournamentSchema = new Schema({
  TournamentName: String,
  winningPrize: Number,
  PosterPath:String,
  NoOfRegTeams:  {
    type: Number,
    default: 0,},
    MembersPerTeam:{
      type: Number,
      default: 0,},
  startingDate: String,
  endingDate: String,
  RegStartingDate: String,
  RegEndingDate: String,
  winningTeamName: { type: String, default: null },
  NoOfRegTeams:  {
    type: Number,
    default: 0,
  },
  teamsCount: Number,
  Teams: {
    type: [{
      name: String,
      captainName: String,
      Players: [{
        Name: String,
        Number: Number
      }],
      RegistrationNumber: String,
      RegistrationDate: String,
      //RegisteredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User',default:null }
    }],
    default: null
  }

  // schema for teams-not needed
  // Teams: [{
  //   name: String,
  //   captainName: String,
  //   Players: [{
  //     Name: String,
  //     Email: String,
  //     Number: Number
  //   }],
  //   RegistrationNumber: Date,
  //   RegistrationDate: Date,
  //   //RegisteredBy: String
  // }]
});

// Schema that defines reviews with their corresponding date, username, and review content
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

// Schema that defines rating details including number of ratings, sum, and mean rating
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

// Schema that defines ground details including name, category, location, charges, and associated entities
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

// Schema that defines ground owner details including personal information, credentials, and owned grounds
const groundOwnerSchema = new Schema({
  UserName: {
    type: String,
    required: true,
    minLength: [3, "The Username MUST be atleast 3 character long!"],
    maxLength: [255, "The Username CANNOT exceed 255 characters!"]
  },
  FirstName: {
    type: String,
    // required: true,
    minLength: [3, "The first-name MUST be at least 3 characters long."],
    maxLength: [255, "The Username CANNOT exceed 255 characters!"]
  },
  LastName: {
    type: String,
    // required: true,
    minLength: [3, "The last-name MUST be at least 3 characters long!"],
    maxLength: [255, "The Username CANNOT exceed 255 characters!"]
  },
  
  Password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters long !"]
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email !"]
  },
  PhoneNo: {
    type: String,
    required: true,
    // both min and max length of phone numbers is 11 digits so validation check is as below..
    minLength: [11, "Phone number must contain 11 digits !"],
    maxLength: [11, "Phone number must contain 11 digits !"]
  },
  Grounds: [groundSchema]
});

// create and export this groundowner svhema 
export const GroundOwner = mongoose.model("GroundOwner", groundOwnerSchema);
