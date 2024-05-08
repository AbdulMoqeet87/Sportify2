import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Importing the location icon from react-icons library
import NB from '../../components/Navbar'
const ArenasAvail = () => {
  const data = [
    {
      name: `Gadafi Stadium`,
      img: `/Categories/Cricket.jpg`,
      review: `Bht sad season ha`,
      town:`Samnabad`,
    },
    {
      name: `TownShip Whites`,
      img: `/Categories/FootBall.jpg`,
      review: `Bht sad season ha`,
      town:`Township`,
    },
    {
      name: `Nawaz Hockey Stadium`,
      img: `/Categories/Hockey.jpg`,
      review: `Bht sad season ha`,
      town:`Model Town`,
    },
    {
      name: `FoosBall`,
      img: `/Categories/FoosBall.jpg`,
      review: `Bht sad season ha`,
      town:`Gajju Matha Town`,
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
      name: `Hockey`,
      img: `/Categories/Hockey.jpg`,
      review: `Bht sad season ha`,
      rating: 8.8,
    },
    {
      name: `FoosBall`,
      img: `/Categories/FoosBall.jpg`,
      review: `Bht sad season ha`,
      rating: 4.2,
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
      name: `Hockey`,
      img: `/Categories/Hockey.jpg`,
      review: `Bht sad season ha`,
      rating: 8.8,
    },
    {
      name: `FoosBall`,
      img: `/Categories/FoosBall.jpg`,
      review: `Bht sad season ha`,
      rating: 4.2,
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

  // Use the useLocation hook to access the location state containing grounds data
  const { state } = useLocation();
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

  // Access the grounds array from the state
  const grounds = state && state.ground ? state.ground : []; // Ensure grounds is an array
  
  return (
    <div className="bg-white">
      <NB/>
      <div className="container_">
        <div className="grounds-container ">
        <h1 className="uppercase-text text-4xl text-black text-left mb-4 mt-20 ml-30">{grounds[0].SportsCategory}</h1>
<hr className="mb-4" />
          {grounds.map((d) => (
            <div key={d.G_Name} className="ground-card mt-10 bg-white h-[140px] w-[700px] text-white p-1 border border-white  border-black">
              <div className="flex   ">
                <div className="h-36 bg-white">
                  <img src={d.images[0]} alt="" className="h-40 w-40 mr-10" />
                </div>
                <div className="flex flex-col mt-0 ml-0 items-left gap-0   pl-10 w-2/4">
                  <p className=" uppercase-text text-l text-blue-900 font-semibold mb-0 pb-4">{d.G_Name}</p>
                  <p className="uppercase-text text-xs text-black flex flex-row justify-content"><FaMapMarkerAlt/>{d.Address}</p>
               
               </div>
               <div className="  mt-0  items-right w-1/4">
                <button 
                  onClick={() => handleSearch(d.G_name)} // Pass the category name to handleSearch
                  className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-6 border border-black hover:border-transparent "
                >
                  Book Now
                </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArenasAvail;
