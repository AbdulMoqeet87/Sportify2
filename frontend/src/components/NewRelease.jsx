import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewRelease = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/GroundOwner/`);
        if (response.data && Array.isArray(response.data.data)) {
          setTournaments(response.data.data);        
        } else {
          console.error('Invalid API response:', response.data);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchTournaments();
  }, []); // Empty dependency array to ensure the effect runs only once

  const settings = {
    
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="ml-60 h-3/4 w-[900px] mt-20 mb-2  pt-0 pb-0 ">
      <div className="mt-3">
        <Slider {...settings}>
          {tournaments.map((tournament, index) => (
            <div key={index} className="bg-black h-[440px] w-[150px] text-white p-1 border border-white">
              <div className="h-full w-auto bg-black flex justify-center items-center">
                <img src={tournament.PosterPath} alt={tournament.TournamentName} className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default NewRelease;
