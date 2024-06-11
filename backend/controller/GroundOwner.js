import { dbConnection } from "../database/dbConnection.js";
import { GroundOwner } from "../models/GroundOwnerSchema.js";
import { User } from "../models/UserSchema.js";
import ErrorHandler from "../error/error.js";
import mongoose from "mongoose";
export const getTop5LatestTournaments = async (req, res) => {
  try {
    // Retrieve the ground owner document by ID
    const groundOwnerId = req.params.id;
    const groundOwner = await c.findById(groundOwnerId);

    if (!groundOwner) {
      return res
        .status(404)
        .json({ success: false, message: "Ground owner not found" });
    }

    // Sort tournaments by RegStartingDate in descending order (assuming it's stored as a string)
    groundOwner.Grounds.forEach((ground) => {
      ground.Tournaments.sort(
        (a, b) => new Date(b.RegStartingDate) - new Date(a.RegStartingDate)
      );
    });

    // Flatten the array of tournaments
    const allTournaments = groundOwner.Grounds.flatMap(
      (ground) => ground.Tournaments
    );

    // Take the top 5 latest tournaments
    const top5Tournaments = allTournaments.slice(0, 5);

    res.status(200).json({ success: true, data: top5Tournaments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createGroundOwner = async (req, res, next) => {
  try {
    const { UserName, FirstName, LastName, Password, email, PhoneNo, Grounds,city } =
      req.body;

    if (
      !FirstName ||
      !LastName ||
      !email ||
      !Password ||
      !PhoneNo ||
      !UserName||
      !city
    ) {
      return next(new ErrorHandler("Please Fill Complete Form!", 400));
    }

    const existingUsername = await GroundOwner.findOne({ UserName });
    if (existingUsername) {
      return next(new ErrorHandler("User Already Exist!", 400));
    }

    const existingEmail = await GroundOwner.findOne({ email });
    if (existingEmail) {
      return next(new ErrorHandler("Email Already In Use!", 400));
    }
    const existingPhoneNO = await GroundOwner.findOne({ PhoneNo });
    if (existingPhoneNO) {
      return next(new ErrorHandler("Phone No. Already In Use!", 400));
    }

    await GroundOwner.create({
      FirstName,
      UserName,
      LastName,
      email,
      Password,
      PhoneNo,
      Grounds,
      city,
    });

    res.status(201).json({
      success: true,
      message: "Owner Account Created!",
    });
  } catch (error) {
    // Handle Mongoose validation errors and other errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    // Handle other errors
    return next(error);
  }
};

export const getAllGroundOwnerNames = async (req, res) => {
  try {
    // Retrieve all ground owners from the database
    const groundOwners = await GroundOwner.find({}, "UserName");

    res
      .status(200)
      .json({
        success: true,
        data: groundOwners.map((owner) => owner.UserName),
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllGroundOwnersWithGroundNames = async (req, res) => {
  try {
    // Retrieve all ground owners from the database
    const groundOwners = await GroundOwner.find();

    // Extract ground names from each ground owner
    const groundNames = groundOwners.map((groundOwner) => ({
      UserName: groundOwner.UserName,
      GroundNames: groundOwner.Grounds.map((ground) => ground.G_Name),
    }));

    res.status(200).json({ success: true, data: groundNames });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllGroundOwnersWithGroundAndTournamentNames = async (
  req, res) => {
  try {
    // Retrieve all ground owners from the database
    const groundOwners = await GroundOwner.find();

    // Extract ground names and tournament names from each ground owner
    const groundsWithTournaments = groundOwners.map((groundOwner) => ({
      UserName: groundOwner.UserName,
      Grounds: groundOwner.Grounds.map((ground) => ({
        G_Name: ground.G_Name,
        Tournaments: ground.Tournaments.map(
          (tournament) => tournament.TournamentName
        ),
      })),
    }));

    res.status(200).json({ success: true, data: groundsWithTournaments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllTournaments = async (req, res) => {
  try {
    // Retrieve all ground owners from the database
    const groundOwners = await GroundOwner.find();

    // Extract tournament details from each ground owner's grounds
    const tournaments = groundOwners.flatMap((groundOwner) =>
      groundOwner.Grounds.flatMap((ground) =>
        ground.Tournaments.map((tournament) => ({
          TournamentName: tournament.TournamentName,
          StartingDate: tournament.startingDate,
          EndingDate: tournament.endingDate,
          WinningPrize: tournament.winningPrize,
          SportsCategory: ground.SportsCategory,
          SchedulePath: tournament.SchedulePath,
          PosterPath: tournament.PosterPath,
        }))
      )
    );

    // Sort tournaments based on starting date
    tournaments.sort(
      (a, b) => new Date(a.StartingDate) - new Date(b.StartingDate)
    );

    res.status(200).json({ success: true, data: tournaments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllTournamentsByCategory = async (req, res) => {
  try {
    // Extract the selected category from request parameters
    const { category } = req.params;

    // Retrieve all ground owners from the database with grounds matching the selected category
    const groundOwners = await GroundOwner.find({
      "Grounds.SportsCategory": category,
    });

    // Extract tournament details from each ground owner's grounds
    const tournaments = groundOwners.flatMap((groundOwner) =>
      groundOwner.Grounds.flatMap((ground) =>
        ground.Tournaments.map((tournament) => ({
          TournamentName: tournament.TournamentName,
          StartingDate: tournament.startingDate,
          EndingDate: tournament.endingDate,
          WinningPrize: tournament.winningPrize,
          SportsCategory: ground.SportsCategory,
        }))
      )
    );

    // Sort tournaments based on starting date
    tournaments.sort(
      (a, b) => new Date(a.StartingDate) - new Date(b.StartingDate)
    );

    // Send the response
    res.status(200).json({ success: true, data: tournaments });
  } catch (error) {
    // Handle errors
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllTournamentsPosters = async (req, res) => {
  try {
    // Extract the selected category from request parameters
    const { category } = req.params;

    // Retrieve all ground owners from the database with grounds matching the selected category
    const groundOwners = await GroundOwner.find({
      "Grounds.SportsCategory": category,
    });

    // Extract tournament details from each ground owner's grounds
    const tournaments = groundOwners.flatMap((groundOwner) =>
      groundOwner.Grounds.flatMap((ground) =>
        ground.Tournaments.map((tournament) => ({
          TournamentName: tournament.TournamentName,
          StartingDate: tournament.startingDate,
          EndingDate: tournament.endingDate,
          WinningPrize: tournament.winningPrize,
          SportsCategory: ground.SportsCategory,
        }))
      )
    );

    // Sort tournaments based on starting date
    tournaments.sort(
      (a, b) => new Date(a.StartingDate) - new Date(b.StartingDate)
    );

    // Send the response
    res.status(200).json({ success: true, data: tournaments });
  } catch (error) {
    // Handle errors
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getGroundsByCategory = async (req, res) => {
  try {
    // Extract the category and user ID from request parameters
    const { category, id } = req.params;
        console.log("id in get ground",id);
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find all ground owners with grounds matching the specified category
    const groundOwners = await GroundOwner.find({
      "Grounds.SportsCategory": category,
    });

    // Extract grounds with the specified category and matching city
    const grounds = groundOwners.flatMap((groundOwner) =>
      groundOwner.Grounds.filter(
        (ground) =>
          ground.SportsCategory === category && ground.City === user.city
      )
    );

    // Check if any grounds were found
    if (grounds.length === 0) {
      return res.status(404).json({ success: false, message: "No grounds found matching the specified category and city" });
    }

    // Return the filtered grounds
    res.status(200).json({ success: true, data: grounds });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ success: false, error: error.message });
  }
};


export const createManyGroundOwners = async (req, res) => {
  try {
    const groundOwnersData = req.body;

    // Insert many ground owners
    const insertedGroundOwners = await GroundOwner.insertMany(groundOwnersData);

    res.status(201).json({ success: true, data: insertedGroundOwners });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getOwnerByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    console.log("Email Andr:", email);
    const groundOwner = await GroundOwner.findOne({ email });

    res.status(200).json({ success: true, data: groundOwner });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const markSlotBooked = async (req, res, next) => {
  try {
    const { slotId, userId } = req.body;
    console.log("slot id ", slotId);
    console.log("user id ", userId);

    const owner = await GroundOwner.findOne({ "Grounds.Slots._id": slotId });
    console.log("andr owner", owner);
    if (!owner) {
      return res
        .status(404)
        .json({ success: false, message: "Ground owner not found" });
    }

    let slot;
    owner.Grounds.forEach((ground) => {
      const foundSlot = ground.Slots.id(slotId);
      if (foundSlot) {
        slot = foundSlot;
      }
    });

    if (!slot) {
      return res
        .status(404)
        .json({ success: false, message: "Slot not found" });
    }
console.log("afterFinding Slot",slot);
    slot.available = false;
    slot.bookedBy = userId;

    await owner.save();
    res.status(200).json({ success: true, message: "Slot marked as booked" });
  } catch (error) {
    // Handle Mongoose validation errors and other errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    // Handle other errors
    return next(error);
  }
};

export const GetOwnerByEmail = async (req, res, next) => {
  console.log(req.params.email);
  try {
    const { email } = req.params;

    const existingUser = await GroundOwner.findOne({ email });
    console.log(existingUser);
    res.status(200).json({
      success: true,
      data: existingUser,
    });
  } catch (error) {
    // Handle Mongoose validation errors and other errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    // Handle other errors
    return next(error);
  }
};

export const GetOwnerByID = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const { id } = req.params;
    console.log("id : ", id);
    const existingUser = await GroundOwner.findById(id);
    console.log(existingUser);
    res.status(200).json({
      success: true,
      data: existingUser,
    });
  } catch (error) {
    // Handle Mongoose validation errors and other errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    // Handle other errors
    return next(error);
  }
};

export const UdpateOwner = async (req, res) => {
  const updates = req.body;
  if (ObjectId.isValid(req.params.id)) {
    db.collection("GroundOwner")
      .updateOne({ _is: ObjectId(req.params.id) }, { $set: updates })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "COuld not update the owner" });
      });
  } else {
    res.status(500).jason({ error: "invalid id" });
  }
};

export const AddSlot = async (req, res) => {
  const { ownerId, groundId } = req.params;
  const newSlot = req.body.slot;

  try {
    const groundOwner = await GroundOwner.findById(ownerId);

    if (!groundOwner) {
      return res.status(404).send({ message: "Ground owner not found" });
    }

    const ground = groundOwner.Grounds.id(groundId);

    if (!ground) {
      return res.status(404).send({ message: "Ground not found" });
    }

    ground.Slots.push(newSlot);
    await groundOwner.save();

    res.status(200).send({ message: "Slot added successfully", groundOwner });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

export const getAllGroundOwnersDetails = async (req, res) => {
  try {
    const groundOwners = await GroundOwner.find();
    console.log(groundOwners);
    res.status(200).json({ success: true, data: groundOwners });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const AddRating = async (req, res) => {
  const { ownerId, groundId } = req.params;
  const newRating = req.body.rating;

  try {
    const groundOwner = await GroundOwner.findById(ownerId);

    if (!groundOwner) {
      return res.status(404).send({ message: "Ground owner not found" });
    }

    const ground = groundOwner.Grounds.id(groundId);

    if (!ground) {
      return res.status(404).send({ message: "Ground not found" });
    }

    ground.Rating.push(newRating);
    await groundOwner.save();

    res.status(200).send({ message: "Rating added successfully", groundOwner });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};
export const AddManyReviews = async (req, res) => {
  const { ownerId, groundId } = req.params;
  const newReviews = req.body.rating;

  try {
    const groundOwner = await GroundOwner.findById(ownerId);

    if (!groundOwner) {
      return res.status(404).send({ message: "Ground owner not found" });
    }

    const ground = groundOwner.Grounds.id(groundId);

    if (!ground) {
      return res.status(404).send({ message: "Ground not found" });
    }
    newReviews.forEach((review) => {
      ground.Reviews.push(review);
    });
    await groundOwner.save();
    res.status(200).send({ message: "Rating added successfully", newReviews });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

export const AddReview = async (req, res) => {
  try {
    const { groundId, review } = req.body;
    console.log("review ka andr");
    console.log("ground id ", groundId);
    console.log("review", review);

    const owner = await GroundOwner.findOne({ "Grounds._id": groundId });
    //console.log("ownwer in review",owner);
    const ground = owner.Grounds.id(groundId);
    console.log("ground in review", ground);
    if (!ground) {
      return res
        .status(404)
        .json({ success: false, message: "Ground not found" });
    }

    ground.Reviews.push(review);

    await owner.save();
    res.status(200).json({ success: true, message: "Review added" });
  } catch (error) {
    console.log("Error adding review:", error.message);
    res.status(500).json({ success: false, message: "Review not added" });
  }
};

export const getReviewsOfGround = async (req, res) => {
  console.log("get review ka andr");
  const { id } = req.params;
  console.log("id : ", id);
  try {
    const owner = await GroundOwner.findOne({ "Grounds._id": id });

    if (!owner) {
      return res.status(404).send({ message: "Ground owner not found" });
    }

    const ground = owner.Grounds.id(id);

    if (!ground) {
      return res.status(404).send({ message: "Ground not found" });
    }
    const reviews = ground.Reviews;
    reviews.sort((a, b) => new Date(b.Date) - new Date(a.Date));

    res.status(200).send({ message: "Rating added successfully", reviews });
  } catch (error) {
    console.log("Error getting review:", error.message);
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

export const GetGroundByID = async (req, res) => {
  const { id } = req.params;
  console.log("id : ", id);
  console.log("get ground by id ka andr",id);

  try {
    const owner = await GroundOwner.findOne({ "Grounds._id": id });

    if (!owner) {
      return res.status(404).send({ message: "Ground owner not found" });
    }
    const ground = owner.Grounds.id(id);
    console.log("ground",ground);
    res.status(200).send({ message: "Ground Fetched ", ground });

  } catch (error) {
    console.log("Error getting review:", error.message);
    res.status(500).send({ message: "Internal Server Error", error });
  }
};
export const GetMyGrounds = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the ground owner by ID
    const groundOwner = await GroundOwner.findById(id);

    // If ground owner not found, return an error response
    if (!groundOwner) {
      return res.status(404).json({
        success: false,
        message: "Ground owner not found"
      });
    }

    // Extract and return the grounds
    const grounds = groundOwner.Grounds;

    res.status(200).json({
      success: true,
      data: grounds
    });
  } catch (error) {
    // Handle errors
    return next(new ErrorHandler(error.message, 500));
  }
};

export const UpdateRating = async (req, res) => {
  try {
    const { groundId, rating } = req.body;
    console.log("ground id ", groundId);
    console.log("rating", rating);

    const owner = await GroundOwner.findOne({ "Grounds._id": groundId });
    const ground = owner.Grounds.id(groundId);

    if (!ground) {
      return res.status(404).json({ success: false, message: "Ground not found" });
    }
    ground.Rating.NoOfRatings=ground.Rating.NoOfRatings+1;
    ground.Rating.SumOfRating=ground.Rating.SumOfRating+rating;
    ground.Rating.MeanRating=ground.Rating.SumOfRating/ground.Rating.NoOfRatings;

    await owner.save();
    res.status(200).json({ success: true, message: "Rating updated", data: ground.Rating.MeanRating });

  } catch (error) {
    console.log("Error updating rating:", error.message);
    res.status(500).json({ success: false, message: "Unable to update rating" });
  }
};


export const RegisterTournament = async (req, res) => {
  try {
    const {
      teamName,
      teamCaptain,
      members,
      tournamentId,
      userId,
      groundId
    } = req.body;
    console.log("register tournament, user id: ",userId);

    const groundOwner = await GroundOwner.findOne({ "Grounds.Tournaments._id": tournamentId });
    const ground = groundOwner.Grounds.id(groundId);
    const tournament = ground.Tournaments.id(tournamentId);

    if (tournament.NoOfRegTeams >= tournament.teamsCount) {
      return res.status(400).json({ error: "Team registration is closed for this tournament" });
    }
    
    tournament.NoOfRegTeams=tournament.NoOfRegTeams+1;
    const newTeam = {
      name: teamName,
      captainName: teamCaptain,
      Players: members.map(member => ({
        Name: member.name,
        Email: member.email,
        Number: member.contact
      })),
      RegistrationNumber: tournament.NoOfRegTeams,
      RegistrationDate: new Date(),
      RegisteredBy: userId
    };

    tournament.Teams.push(newTeam);

    await groundOwner.save();

    res.status(200).json({ message: "Team registration successful" });
  } catch (error) {
    console.error("Error registering team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const GetBookedGrounds = async (req, res) => {
  const { id } = req.params; 
  console.log("Fetching booked grounds and tournaments for user ID: ", id);

  try {
    const grounds = await GroundOwner.find({}, { Grounds: 1 }); 

    let bookedGrounds = [];
    let participatedTournaments = [];

    grounds.forEach((owner) => {
      owner.Grounds.forEach((ground) => {
        // Check for booked slots
        const bookedSlots = ground.Slots.filter(slot => slot.bookedBy === id);
        if (bookedSlots.length > 0) {
          bookedSlots.forEach(slot => {
            bookedGrounds.push({
              groundName: ground.G_Name,
              location: `${ground.Town}, ${ground.District}, ${ground.City}`,
              slotDetails: slot
            });
          });
        }

        // Check for participated tournaments
        ground.Tournaments.forEach((tournament) => {
          const userTeams = tournament.Teams.filter(team => team.RegisteredBy === id );
          if (userTeams.length > 0) {
            participatedTournaments.push({
              groundName: ground.G_Name,
              location: `${ground.Town}, ${ground.District}, ${ground.City}`,
              tournamentDetails: tournament,
              userTeams: userTeams
            });
          }
        });
      });
    });

    res.status(200).json({
      success: true,
      bookedGrounds,
      participatedTournaments
    });
  } catch (error) {
    console.error("Error fetching booked grounds and tournaments: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};



export const createTournament = async (req, res) => {
  console.log("tournament back");

  try {
    const posterPath = req.file.filename;
    //const schedulePath = req.file.path;
    console.log("posterPath", posterPath);
console.log("req file",req.file)
    const { g_id } = req.params;
    const {
      TournamentName,
      winningPrize,
      startingDate,
      endingDate,
      RegStartingDate,
      RegEndingDate,
      teamsCount
    } = req.body;

    const tournamentData = {
      TournamentName,
      winningPrize,
      PosterPath: posterPath,
      startingDate,
      endingDate,
      RegStartingDate,
      RegEndingDate,
      teamsCount
    };

    // Find ground owner and push the new tournament into the specified ground
    const groundOwner = await GroundOwner.findOne({ "Grounds._id": g_id });
console.log("GOwner",groundOwner);
    if (!groundOwner) {
      return res.status(404).json({ success: false, message: "Ground not found" });
    }

    // Find the specific ground by id
    const ground = groundOwner.Grounds.id(g_id);

    if (!ground) {
      return res.status(404).json({ success: false, message: "Ground not found" });
    }

    // Push the new tournament into the Tournaments array of the ground
    ground.Tournaments.push(tournamentData);

    // Save the changes to the ground owner document
    await groundOwner.save();

    res.status(200).json({ success: true, message: "Tournament created successfully", tournament: tournamentData });
  } catch (error) {
    console.error("Error creating tournament:", error);
    res.status(500).json({ success: false, error: "Error creating tournament" });
  }
};