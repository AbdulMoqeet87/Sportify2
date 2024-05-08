import React from "react";
import { useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

const Slider_ = () => {

  const data = [
    {
      name: `cricket`,
      img: `/Categories/Cricket.jpg`,
      review: `Bht sad season ha`,
      rating: 4.5,
    },
    {
      name: `football`,
      img: `/Categories/FootBall.jpg`,
      review: `Bht sad season ha`,
      rating: 3.8,
    },
    {
      name: `hockey`,
      img: `/Categories/Hockey.jpg`,
      review: `Bht sad season ha`,
      rating: 8.8,
    },
    
    {
      name: `Badminton`,
      img: `/Categories/Badminton.jpg`,
      review: `Bht sad season ha`,
      rating: 4.0,
    },
    {
      name: `TableTennis`,
      img: `/Categories/TableTennis.jpg`,
      review: `Bht sad season ha`,
      rating: 4.7,
    },
  ];


  const [searchTerm, setSearchTerm] = useState('');
  const [ground, setGround] = useState([]);
  const navigate = useNavigate();


  const handleSearch = async (category) => {
    try {
      const response = await axios.get(`http://localhost:4000/GroundOwner/grounds/${category}`);
      console.log('API Response:', response.data); // Log the response data
      if (response.data && Array.isArray(response.data.data)) {
        setGround(response.data.data);
        navigate('/Arenas', { state: { ground: response.data.data } }); // Navigate to search results page with grounds as state
      } else {
        console.error('Invalid API response:', response.data);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <div className="h-4/4 w-3/4 m-auto mt-10 mb-2 pb-0">
      <h1 className="text-3xl text-black text-center mb-12 mt-8">BOOK&nbsp;&nbsp;NOW!</h1>
      <div className="mt-10 mb-20">
        <Slider {...settings}>
          {data.map((d) => (
            <div key={d.name} className=" bg-white h-[300px] w-[100px] text-white p-1 border border-gray-500 rounded-xl">
              <div className="h-48 bg-white flex justify-center items-center rounded-xl">
                <img src={d.img} alt="" className="h-60 w-60 rounded-xl" />
              </div>
              <div className="flex flex-col justify-center items-center gap-4 p-1">
                <p className="text-xl text-black font-semibold">{d.name}</p>
                <button 
                  onClick={() => handleSearch(d.name)} // Pass the category name to handleSearch
                  className="bg-black text-white text-lg px-6 py-1 rounded-xl"
                >
                  View Arenas
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Slider_;
