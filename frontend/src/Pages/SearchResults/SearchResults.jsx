
import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  // Use the useLocation hook to access the location state containing movies data
  const { state } = useLocation();
  
  // Access the movie object from the state
  const movie = state && state.movie ? state.movie[0] : null; // Ensure movie is an object
  
  // If movie is null or undefined, return null to render nothing
  if (!movie) return null;

  return (
    <div className="ml-8 mt-8 bg-white">
      <div className="w-50">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{movie.title}</td> {/* Access movie.title only if movie exists */}
              <td>{movie.rating}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchResults;
