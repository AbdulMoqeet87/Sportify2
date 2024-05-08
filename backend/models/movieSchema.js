import mongoose from "mongoose";
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [3, "Title must be at least 3 characters long."],
    maxLength: [255, "Title cannot exceed 255 characters."],
  },
  rating: {
    type: Number,
    required: true,
    min: [0, "Rating must be at least 0."],
    max: [10, "Rating cannot be more than 10."],
  },
  genre: {
    type: [String],
    required: true,
    validate: {
      validator: (value) => value.length > 0,
      message: "At least one genre must be provided.",
    },
  },
  cast: {
    type: [String],
    required: true,
    validate: {
      validator: (value) => value.length > 0,
      message: "At least one cast member must be provided.",
    },
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  boxOffice: {
    type: Number,
    required: true,
    min: [0, "Box office must be at least 0."],
  },
});

export const Movie = mongoose.model("Movie", movieSchema);
