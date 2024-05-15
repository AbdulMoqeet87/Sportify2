import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaMapMarkerAlt,FaPhoneAlt, FaEnvelope } from "react-icons/fa"; // Importing the location icon from react-icons library
import NB from "../../components/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarRating from "../../components/Rating";




const GroundInformat = () => {
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
  const [searchTerm, setSearchTerm] = useState("");
  const [ground, setGround] = useState([]);
  const navigate = useNavigate();

  // Use the useLocation hook to access the location state containing grounds data
  const { state } = useLocation();
  
  
  console.log(state);
  const groundinfo = state && state.ground ? state.ground:{};

  const [reviewText, setReviewText] = useState("");

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };
  
  const handleRatingUpdate = (rating) => {
    console.log({rating});
  };

  const handleBookNow = async (ground) => {
    try {
        navigate('/GroundInfo', { state: { ground } });
      } 
     catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleSubmitReview = async () => {
    try {
        navigate('/GroundInfo', { state: { ground } });
      } 
     catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  return (
    <div className="bg-white">
      <NB />
      <div className="ml-40 h-3/4 w-[1100px] mt-20 mb-2 pt-0 pb-0 ">
        <div className="mt-3 flex justify-left">
          <div className="w-3/5">
            <Slider {...settings}>
              {groundinfo.images.map((img, index) => (
                <div key={index} className="pic_bg">
                  <div className="h-full w-auto bg-white flex justify-left items-center">
                    <img
                      src={img}
                      alt={"image not found"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-2/6 bg-white h-[470px] text-teal-light-300 pl-20">
            <h1 className="Name-heading">{groundinfo.G_Name}</h1>
            <p className="paragraph_">
              <span class="flex flex-row justify-content mt-2"><FaMapMarkerAlt className="mt-1 mr-2" />{groundinfo.City}</span><br />
            {groundinfo.Address}<br /><br />Rating:  {4.5} {/*groundinfo.Rating*/}
            <StarRating
                totalStars={5}
                updateRating={handleRatingUpdate} 
              />
            </p>
          </div>
        </div>
      </div>
      <div class="ml-40 mr-40">
  <div class="mt-10 text-xl bg-gradient-to-r from-gray-800 via-gray-700 to-transparent py-2 px-4 text-white text-lg">
    Ground Owner Information
  </div>
  <div class="flex items-center ml-10">
    <p class="text-left text-xl text-gray-700 h-200 flex flex-col justify-content mb-10">
        <span class="flex flex-row justify-content mt-2">{groundinfo.G_Name}</span>
        <span class="flex flex-row justify-content mt-2"><FaPhoneAlt className="mt-2 mr-2" />{groundinfo.PerHourCharges}</span>
        <span class="flex flex-row justify-content mt-2"><FaEnvelope className="mt-2 mr-2" />{groundinfo.Address}</span>
        </p>
  </div>  
  <div class="text-xl bg-gradient-to-r from-gray-800 via-gray-700 to-transparent py-2 px-4 text-white text-lg">
    Available Slots
  </div>
  <div class="flex flex-wrap gap-4 mt-4 mb-20">
    {groundinfo.AvailableSlots.map((slot, index) => (
      <div key={index} class="bg-gray-100 p-4 w-64">
        <p class="font-bold">{slot.Date}</p>
        <p>Start Time: {slot.startTime}</p>
        <p>End Time: {slot.endTime}</p>
        <button class="mt-2 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded" onClick={() => handleBookNow(slot)}>
          Book Now
        </button>
      </div>
    ))}

</div>
<div className="text-xl bg-gradient-to-r from-gray-800 via-gray-700 to-transparent py-2 px-4 text-white text-lg">
          Reviews
        </div>
        <div className="flex items-center ml-20 mt-4">
          <textarea
            className="text-gray-800 w-5/6 p-2 border border-gray-300 rounded"
            placeholder="Write your review..."
            value={reviewText}
            onChange={handleReviewChange}
          ></textarea>
        </div>
        <div className="flex items-center ml-20 mt-4 mb-40">
          <button
            className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmitReview}
          >
            Submit Review
          </button>
        </div>
</div>

    </div>
  );
};

export default GroundInformat;
