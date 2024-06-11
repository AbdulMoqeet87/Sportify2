import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import NB from '../../components/Navbar';

const ArenasAvail = () => {
  const [ground, setGround] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const cat = state && state.category ? state.category : "";

  useEffect(() => {
    handleSearch(cat);
  }, [cat]); // Run this effect whenever the category changes

  const handleSearch = async (category) => {
    try {
      const response = await axios.get(`http://localhost:4000/GroundOwner/grounds/${category}`);
      if (response.data && Array.isArray(response.data.data)) {
        setGround(response.data.data);
      } else {
        console.error('Invalid API response:', response.data);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  return (
    <div className="bg-white">
      <NB/>
      <div className="container_">
        <div className="grounds-container">
          <h1 className="uppercase-text text-4xl text-black text-left mb-4 mt-20 ml-30">{cat}</h1>
          <hr className="mb-4" />
          {ground.map((d, index) => (
            <div key={index} className="ground-card mt-10 bg-white h-[140px] w-[700px] text-white p-1 border border-white  border-black">
              <div className="flex">
                <div className="relative h-36 bg-white">
                  <img src={"/images/"+d.images[0]} alt="" className="h-40 w-40 mr-10" />
                </div>
                <div className="flex flex-col mt-0 ml-0 items-left gap-0 pl-10 w-2/4">
                  <p className="uppercase-text text-l text-blue-900 font-semibold mb-0 pb-4">{d.G_Name}</p>
                  <p className="uppercase-text text-xs text-black flex flex-row justify-content"><FaMapMarkerAlt/>{d.Address}</p>
                </div>
                <div className="mt-0 items-right w-1/4">
                  <button 
                    onClick={() => navigate('/GroundInfo', { state: { id: d._id } })} 
                    className="ml-5 bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-6 border border-black hover:border-transparent"
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
