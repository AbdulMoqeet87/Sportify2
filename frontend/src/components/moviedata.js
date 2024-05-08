import { useState } from 'react';

// Define the initial state for movies
let initialMoviesState = [];

// Create a custom hook to manage movies state
export const useMovies = () => {
  const [movies, setMovies] = useState(initialMoviesState);

  return { movies, setMovies };
};