import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link  } from 'react-router-dom';

const NB = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/movies/${searchTerm}`);
      if (response.data && Array.isArray(response.data.data)) 
      {
        setMovie(response.data.data);
        
        navigate('/searchResults', { state:{movie:response.data.data}}); // Navigate to search results page with movies as state
      } else {
        console.error('Invalid API response:', response.data);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-[rgb(0, 4, 65)] fixed-pos">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link to="/home" className="text-white text-lg font-semibold mr-4 ml-6">
              <img src="/images/Logo_sportify.jpg" alt="Navbar Logo" className="mr-4 w-[100px]" style={{ height: '30px', borderRadius: '10px' }} />
            </Link>
            {/* <form onSubmit={handleSearch} className="flex">
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-1 bg-gray-200 w-[700px] h-[30px] rounded-full"
              />
              <button type="submit" className="px-4 bg-transparent text-white rounded-full ml-2 h-[30px] border border-white">Search</button>
            </form> */}
          </div>
          <button className="text-white" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="text-white">Menu</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between collapse" id="navbarSupportedContent">
          {/* Add other navbar links here */}
        </div>
      </div>
    </nav>
    

  );
};

export default NB;
