import { GroundOwner } from "../models/GroundOwnerSchema.js";

export const getTop5LatestTournaments = async (req, res) => {
  try {
    // Retrieve the ground owner document by ID
    const groundOwnerId = req.params.id;
    const groundOwner = await GroundOwner.findById(groundOwnerId);

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


export const createGroundOwner = async (req, res) => {
    try {
      const { UserName, Password, email, PhoneNo, Grounds } = req.body;
      
      const groundOwner = new GroundOwner({
        UserName,
        Password,
        email,
        PhoneNo,
        Grounds // Assuming Grounds is already properly formatted in the request body
      });
  
      await groundOwner.save();
  
      res.status(201).json({ success: true, data: groundOwner });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
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
