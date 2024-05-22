import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa"; // Importing the location icon from react-icons library
import NB from "../../components/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarRating from "../../components/Rating";

const GroundInformat = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [ground, setGround] = useState([]);
  const navigate = useNavigate();
  //popup
  const [showModal, setShowModal] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);
  //ownerdetails
  const [ownerDetails, setOwnerDetails] = useState(null);
  //review display
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [reviews, setReviews] = useState([]);

  const { state } = useLocation();
  console.log("Sate", state);
  const groundinfo = state && state.ground ? state.ground : {};

  useEffect(() => {
    
    const fetchOwnerDetails = async () => {
      try {
        console.log("Email:", groundinfo.GroundOwnerEmail);
        const response = await axios.get(
          `http://localhost:4000/GroundOwner/getOwner/${groundinfo.GroundOwnerEmail}`
        );
        setOwnerDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching owner details:", error);
      }
    };
    const fetchReviews = async () => {
      try {
        const reviewsWithUserNames = await Promise.all(groundinfo.Reviews.map(async (review) => {
          const userResponse = await axios.get(`http://localhost:4000/User/GetUserByID/${review.UserId}`);
          console.log('reviews user response',userResponse);
          return {
            ...review,
            userName: userResponse.data.data ? `${userResponse.data.data.FirstName} ${userResponse.data.data.LastName}` : 'Unknown User',
          };
        }));
        setReviews(reviewsWithUserNames);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (groundinfo.GroundOwnerEmail) {
      fetchOwnerDetails();}

      if (groundinfo._id) {
        fetchReviews();
    }
  }, [groundinfo.GroundOwnerEmail]);
  console.log("Owner:", ownerDetails);
  const [reviewText, setReviewText] = useState("");

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleRatingUpdate = (rating) => {
    console.log({ rating });
  };

  const handleBookNow = async (slot) => {
    setBookingInfo(slot);
    setShowModal(true);
    const userId = localStorage.getItem("userId");
    const slotId = slot._id;

    try {
      const response = await axios.post(
        `http://localhost:4000/GroundOwner/BookSlot`,
        { slotId, userId }
      );
    } catch (error) {
      console.error("Error fetching owner details:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmitReview = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/GroundOwner/AddReview`,
        {
          groundId: groundinfo._id,
          review: {
            Date: new Date().toISOString().split("T")[0],
            UserId: localStorage.getItem("userId"),
            Review: reviewText,
          },
        }
      );
      setReviewText("");
    } catch (error) {
      console.log("Error entering review data:", error);
    }
  };

  const handleLoadMoreReviews = () => {
    setReviewsToShow(reviewsToShow + 3);
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
            <h1 className="Name-heading h-1/3">{groundinfo.G_Name}</h1>
            <p className="paragraph_ h-2/3">
              <span class="flex flex-row justify-content mt-2">
                <FaMapMarkerAlt className="mt-1 mr-2" />
                {groundinfo.City}
              </span>
              <br />
              {groundinfo.Address}
              <br />
              <br />
              Rating: {4.5} {/*groundinfo.Rating*/}
              <StarRating totalStars={5} updateRating={handleRatingUpdate} />
            </p>
          </div>
        </div>
      </div>
      <div class="ml-40 mr-40">
        <div class="mt-10 text-xl bg-gradient-to-r from-gray-800 via-gray-700 to-transparent py-2 px-4 text-white text-lg">
          Ground Owner Information
        </div>
        {ownerDetails && (
          <div class="flex items-center ml-10">
            <p class="text-left text-xl text-gray-700 h-200 flex flex-col justify-content mb-10">
              <span class="flex flex-row justify-content mt-2">
                {ownerDetails.FirstName} {ownerDetails.LastName}
              </span>
              <span class="flex flex-row justify-content mt-2">
                <FaPhoneAlt className="mt-2 mr-2" />
                {ownerDetails.PhoneNo}
              </span>
              <span class="flex flex-row justify-content mt-2">
                <FaEnvelope className="mt-2 mr-2" />
                {ownerDetails.email}
              </span>
            </p>
          </div>
        )}
        <div class="text-xl bg-gradient-to-r from-gray-800 via-gray-700 to-transparent py-2 px-4 text-white text-lg">
          Available Slots
        </div>
        <div class="flex flex-wrap gap-4 mt-4 mb-20">
          {groundinfo.Slots.filter((slot) => slot.available).map(
            (slot, index) => (
              <div key={index} class="bg-gray-100 p-4 w-64">
                <p class="font-bold">{slot.Date}</p>
                <p>Start Time: {slot.startTime}</p>
                <p>End Time: {slot.endTime}</p>
                <button
                  class="mt-2 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleBookNow(slot)}
                >
                  Book Now
                </button>
              </div>
            )
          )}
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
        <div className="flex flex-col ml-20 mt-4 mb-40">
          {reviews.slice(0, reviewsToShow).map((review, index) => (
            <div key={index} className="bg-gray-100 p-4 mb-2">
              <p className="font-bold">{review.userName}</p>
              <p className="font-bold text-m">{review.Date}</p>
              <p>{review.Review}</p>
            </div>
          ))}
          {reviewsToShow < reviews.length && (
            <button
              className="mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
              onClick={handleLoadMoreReviews}
            >
              Load More
            </button>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4">
              Ground Booked Successfully
            </h2>
            {bookingInfo && (
              <div>
                <p>Price: {groundinfo.PerHourCharges}</p>
                <p>Date: {bookingInfo.Date}</p>
                <p>
                  Time: {bookingInfo.startTime} - {bookingInfo.endTime}
                </p>
              </div>
            )}
            <button
              className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroundInformat;
