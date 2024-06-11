import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaTrophy } from 'react-icons/fa';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdSportsScore } from "react-icons/md";

const SideBar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [ground, setGround] = useState([]);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const userId = localStorage.getItem("userId");

    useEffect(() => {
      handleSearch(userId);
    }, [userId]); // Run this effect whenever the category changes
  

    const handleSearch = async (category) => {
      try {
        const response = await axios.get(`http://localhost:4000/GroundOwner/groundsById/${userId}`);
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

       <div className="mt-20">
<button data-drawer-target="cta-button-sidebar" data-drawer-toggle="cta-button-sidebar" aria-controls="cta-button-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span class="sr-only">Open sidebar</span>
   <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="cta-button-sidebar" class="mt-10 fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
<div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-600 right-shadow">

      <ul class="space-y-2 font-medium">
         <li>
         <a href="#" className=" mt-10 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaPlusCircle className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ml-3">Add Ground</span>
                            </a>
         </li>
         <li>
         <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaTrophy className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ml-3">Post Tournament</span>
                            </a>
         </li>
     
         </ul>
   </div> 
</aside>

   <div className="bg-white">
      
      <div className="container_">
        <div className="grounds-container">
        <h1 className="uppercase-text text-4xl text-black text-left mb-4 mt-2 ml-30">your Arenas</h1>
        
          <hr className="mb-4" />
          {ground.map((d, index) => (
            <div key={index} className="ground-card mt-10 bg-white h-[140px] w-[700px] text-white p-1 border border-white  border-black">
              <div className="flex">
                <div className="relative h-36 bg-white">
                  <img src={d.images[0]} alt="" className="h-40 w-40 mr-10" />
                </div>
                <div className="flex flex-col mt-0 ml-0 items-left gap-0 pl-10 w-2/4">
                  <p className="uppercase-text text-l text-blue-900 font-semibold mb-0 pb-4">{d.G_Name}</p>
                  <p className="uppercase-text text-l text-black flex flex-row justify-content pb-2"><MdSportsScore />
                  {d.SportsCategory}</p>
                  <p className="uppercase-text text-xs text-black flex flex-row justify-content "><FaMapMarkerAlt/>{d.Address}</p>
                  
                  
                </div>
                <div className="mt-0 items-right w-1/4">
                  <button 
                    onClick={() => navigate('/OwnerGroundInfo', { state: { id: d._id } })} 
                    className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-6 border border-black hover:border-transparent"
                  >
                    View Arena
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    
</div>
</div>

    );
};

export default SideBar;


// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowRight } from 'react-icons/fa';  // Importing arrow icon from react-icons


// const SideBar=()=>{
//     const navigate = useNavigate();

// return(
// <div className="sidebar-container">
//                 <div className="sidebar-toggle">
//                     <FaArrowRight size={30} />
//                 </div>
//                 <div className="sidebar">
//                     <button className="sidebar-button" onClick={() => navigate('/add-ground')}>Add Ground</button>
//                     <button className="sidebar-button" onClick={() => navigate('/post-tournament')}>Post Tournament</button>
//                 </div>
//             </div>
// )
// }

// export default SideBar
