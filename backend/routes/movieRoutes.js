import express from "express";
import { createMovie, getMovies, getMovieById, updateMovie, deleteMovie, getMoviesByCast,getMoviesByGenre,getMoviesByTitle } from "../controller/movieController.js";

const router = express.Router();

router.post("/", createMovie);
router.get("/", getMovies);
// router.get("/:id", getMovieById);
router.get("/cast/:actorName", getMoviesByCast);
router.get("/:title", getMoviesByTitle);
router.get("/genre/:genre", getMoviesByGenre);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);


export default router;
