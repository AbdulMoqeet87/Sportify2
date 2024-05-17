import { GroundOwner } from "../models/GroundOwnerSchema.js";

export const getTop5LatestTournaments = async (req, res) => {
  try {
    // Retrieve the ground owner document by ID
    const groundOwnerId = req.params.id;
    const groundOwner = await c.findById(groundOwnerId);

    if (!groundOwner) {
      return res.status(404).json({ success: false, message: "Ground owner not found" });
    }

    // Sort tournaments by RegStartingDate in descending order (assuming it's stored as a string)
    groundOwner.Grounds.forEach(ground => {
      ground.Tournaments.sort((a, b) => new Date(b.RegStartingDate) - new Date(a.RegStartingDate));
    });

    // Flatten the array of tournaments
    const allTournaments = groundOwner.Grounds.flatMap(ground => ground.Tournaments);

    // Take the top 5 latest tournaments
    const top5Tournaments = allTournaments.slice(0, 5);

    res.status(200).json({ success: true, data: top5Tournaments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createGroundOwner = async (req, res, next) => {
  try {
      const { UserName, FirstName, LastName, Password, email, PhoneNo, Grounds } = req.body;

      if (!FirstName || !LastName || !email || !Password || !PhoneNo || !UserName) {
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

      await GroundOwner.create({ FirstName, UserName, LastName, email, Password, PhoneNo, Grounds });

      res.status(201).json({
          success: true,
          message: "Owner Account Created!",
      });
  } catch (error) {
      // Handle Mongoose validation errors and other errors
      if (error.name === 'ValidationError') {
          const validationErrors = Object.values(error.errors).map(err => err.message);
          return next(new ErrorHandler(validationErrors.join(', '), 400));
      }
      // Handle other errors
      return next(error);
  }
};


  export const getAllGroundOwnerNames = async (req, res) => {
    try {
      // Retrieve all ground owners from the database
      const groundOwners = await GroundOwner.find({}, 'UserName');
  
      res.status(200).json({ success: true, data: groundOwners.map(owner => owner.UserName) });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };


  export const getAllGroundOwnersWithGroundNames = async (req, res) => {
    try {
      // Retrieve all ground owners from the database
      const groundOwners = await GroundOwner.find();
  
      // Extract ground names from each ground owner
      const groundNames = groundOwners.map(groundOwner => ({
        UserName: groundOwner.UserName,
        GroundNames: groundOwner.Grounds.map(ground => ground.G_Name)
      }));
  
      res.status(200).json({ success: true, data: groundNames });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  export const getAllGroundOwnersWithGroundAndTournamentNames = async (req, res) => {
    try {
      // Retrieve all ground owners from the database
      const groundOwners = await GroundOwner.find();
  
      // Extract ground names and tournament names from each ground owner
      const groundsWithTournaments = groundOwners.map(groundOwner => ({
        UserName: groundOwner.UserName,
        Grounds: groundOwner.Grounds.map(ground => ({
          G_Name: ground.G_Name,
          Tournaments: ground.Tournaments.map(tournament => tournament.TournamentName)
        }))
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
      const tournaments = groundOwners.flatMap(groundOwner =>
        groundOwner.Grounds.flatMap(ground =>
          ground.Tournaments.map(tournament => ({
            TournamentName: tournament.TournamentName,
            StartingDate: tournament.startingDate,
            EndingDate: tournament.endingDate,
            WinningPrize: tournament.winningPrize,
            SportsCategory:ground.SportsCategory,
            SchedulePath:tournament.SchedulePath,
            PosterPath:tournament.PosterPath
          }))
        )
      );
  
      // Sort tournaments based on starting date
      tournaments.sort((a, b) => new Date(a.StartingDate) - new Date(b.StartingDate));
  
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
      const groundOwners = await GroundOwner.find({ "Grounds.SportsCategory": category });
  
      // Extract tournament details from each ground owner's grounds
      const tournaments = groundOwners.flatMap(groundOwner =>
        groundOwner.Grounds.flatMap(ground =>
          ground.Tournaments.map(tournament => ({
            TournamentName: tournament.TournamentName,
            StartingDate: tournament.startingDate,
            EndingDate: tournament.endingDate,
            WinningPrize: tournament.winningPrize,
            SportsCategory: ground.SportsCategory
          }))
        )
      );
  
      // Sort tournaments based on starting date
      tournaments.sort((a, b) => new Date(a.StartingDate) - new Date(b.StartingDate));
  
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
      const groundOwners = await GroundOwner.find({ "Grounds.SportsCategory": category });
  
      // Extract tournament details from each ground owner's grounds
      const tournaments = groundOwners.flatMap(groundOwner =>
        groundOwner.Grounds.flatMap(ground =>
          ground.Tournaments.map(tournament => ({
            TournamentName: tournament.TournamentName,
            StartingDate: tournament.startingDate,
            EndingDate: tournament.endingDate,
            WinningPrize: tournament.winningPrize,
            SportsCategory: ground.SportsCategory
          }))
        )
      );
  
      // Sort tournaments based on starting date
      tournaments.sort((a, b) => new Date(a.StartingDate) - new Date(b.StartingDate));
  
      // Send the response
      res.status(200).json({ success: true, data: tournaments });
    } catch (error) {
      // Handle errors
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const getGroundsByCategory = async (req, res) => {
    try {
      // Extract the category from request parameters
      const { category } = req.params;
  
      // Find all ground owners with grounds matching the specified category
      const groundOwners = await GroundOwner.find({ "Grounds.SportsCategory": category });

      // Extract grounds with the specified category
      const grounds = groundOwners.flatMap(groundOwner =>
        groundOwner.Grounds.filter(ground => ground.SportsCategory === category)
      );
  
      res.status(200).json({ success: true, data: grounds });
    } catch (error) {
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


  export const GetOwnerByEmail = async (req, res, next) => {
    console.log(req.params.email);
    try {
     const {email}=req.params;
  
      const existingUser = await GroundOwner.findOne({ email});
      console.log(existingUser);
      res.status(200).json({
        success: true,
        data:existingUser,
       
      });
    } catch (error) {
      // Handle Mongoose validation errors and other errors
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        return next(new ErrorHandler(validationErrors.join(', '), 400));
      }
      // Handle other errors
      return next(error);
    }
  };
  

  export const GetOwnerByID = async (req, res, next) => {
    console.log(req.params.id);
    try {
     const {id}=req.params;
    console.log("id : ",id);
      const existingUser = await GroundOwner.findById(id);
      console.log(existingUser);
      res.status(200).json({
        success: true,
        data:existingUser,
       
      });
    } catch (error) {
      // Handle Mongoose validation errors and other errors
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        return next(new ErrorHandler(validationErrors.join(', '), 400));
      }
      // Handle other errors
      return next(error);
    }
  };
  