import { Movie } from "../models/movieSchema.js";
export const createMovie = async (req, res) => {
    try {
      const movie = await Movie.create(req.body);
      res.status(201).json({ success: true, data: movie });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  export const getMovies = async (req, res) => {
    try {
      const movies = await Movie.find();
      res.status(200).json({ success: true, data: movies });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  export const getMovieById = async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res.status(404).json({ success: false, message: "Movie not found" });
      }
      res.status(200).json({ success: true, data: movie });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  export const getMoviesByGenre = async (req, res) => {
    try {
      const genres = req.params.genre.split(","); // Split the genre parameter into an array
      const movies = await Movie.find({ genre: { $in: genres } }); // Use the $in operator to find movies with genres matching any of the specified genres
      res.status(200).json({ success: true, data: movies });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  export const getMoviesByCast = async (req, res) => {
    try {
      const movies = await Movie.find({ cast: req.params.actorName });
      res.status(200).json({ success: true, data: movies });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  export const updateMovie = async (req, res) => {
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!movie) {
        return res.status(404).json({ success: false, message: "Movie not found" });
      }
      res.status(200).json({ success: true, data: movie });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  export const deleteMovie = async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) {
        return res.status(404).json({ success: false, message: "Movie not found" });
      }
      res.status(200).json({ success: true, message: "Movie deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  export const getMoviesByTitle = async (req, res) => {
    try {
      const title = req.params.title;
      const movies = await Movie.find({ title: { $regex: title, $options: "i" } });
      res.status(200).json({ success: true, data: movies });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
 
  