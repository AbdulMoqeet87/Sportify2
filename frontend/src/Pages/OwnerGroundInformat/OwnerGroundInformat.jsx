import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import NB from "../../components/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarRating from "../../components/Rating";

const OwnerGroundInformat = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [reviews, setReviews] = useState([]);
  const [groundinfo, setGroundInfo] = useState(null);
  const [rating, setRating] = useState({});
  const [slots, setSlots] = useState([]);
  const { state } = useLocation();
  console.log("Sate In front", state);
  const groundId = state && state.id ? state.id : "";
  console.log("ground", groundId);

  useEffect(() => {
    console.log("Inside useEffect with groundId:", groundId);
    fetchData(groundId);
  }, []);

  const fetchData = async (gId) => {
    try {
      const groundResponse = await axios.get(`http://localhost:4000/GroundOwner/GetGroundById/${gId}`);
      setGroundInfo(groundResponse.data.ground);
      setSlots(groundResponse.data.ground.Slots);
      setRating(groundResponse.data.ground.Rating.MeanRating);
      setReviews(groundResponse.data.ground.Reviews);

      const ownerResponse = await axios.get(`http://localhost:4000/GroundOwner/getOwner/${groundResponse.data.ground.GroundOwnerEmail}`);
      setOwnerDetails(ownerResponse.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log("Owner:", ownerDetails);
  const [reviewText, setReviewText] = useState("");

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleBookNow = async (slot) => {
    // Booking logic here
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const user = localStorage.getItem("userName");
  console.log("UserNameLS", user);

  const handleSubmitReview = async () => {
    // Review submission logic here
  };

  const handleLoadMoreReviews = () => {
    setReviewsToShow(reviewsToShow + 3);
  };

  const handleShowLessReviews = () => {
    if (groundinfo.Reviews.length >= 3) {
      setReviewsToShow(3);
    }
  };

  const handleRatingUpdate = async (rating) => {
    // Rating update logic here
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
    groundinfo && (
      <div className="bg-white">
        <NB />
        <div className="ml-40 h-3/4 w-[1100px] mt-20 mb-2 pt-0 pb-0">
          <div className="mt-3 flex justify-left">
            <div className="w-3/5">
              <Slider {...settings}>
                {groundinfo.images.map((img, index) => (
                  <div key={index} className="pic_bg">
                    <div className="h-full w-auto bg-white flex justify-left items-center">
                      <img
                        src={"/images/"+img}
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
              <button
                 className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-0 mb-14"
                onClick={() => navigate('/Tournament', { state: { id: groundinfo._id } })}
              >
                Post Tournament
              </button>
              <p className="paragraph_ h-1/3">
                <span className="flex flex-row justify-content mt-1 mb-0">
                  <FaMapMarkerAlt className="mt-0 mr-2" />
                  {groundinfo.City}
                </span>
                {groundinfo.Address}
                <br />
                <br />
                Rating: {rating}
                <StarRating totalStars={5} updateRating={handleRatingUpdate} />
              </p>
            </div>
          </div>
        </div>
        <div className="ml-40 mr-40">
          <div className="mt-10 text-xl bg-gradient-to-r from-gray-800 via-gray-700 to-transparent py-2 px-4 text-white text-lg">
            Ground Owner Information
          </div>
          {ownerDetails && (
            <div className="flex items-center ml-10">
              <p className="text-left text-xl text-gray-700 h-200 flex flex-col justify-content mb-10">
                <span className="flex flex-row justify-content mt-2">
                  {ownerDetails.FirstName} {ownerDetails.LastName}
                </span>
                <span className="flex flex-row justify-content mt-2">
                  <FaPhoneAlt className="mt-2 mr-2" />
                  {ownerDetails.PhoneNo}
                </span>
                <span className="flex flex-row justify-content mt-2">
                  <FaEnvelope className="mt-2 mr-2" />
                  {ownerDetails.email}
                </span>
              </p>
            </div>
          )}
          <div className="text-xl bg-gradient-to-r from-gray-800 via-gray-700 to-transparent py-2 px-4 text-white text-lg">
            Available Slots
          </div>
          <div className="flex flex-wrap gap-4 mt-4 mb-20">
            {slots.filter((slot) => slot.available).map((slot, index) => (
              <div key={index} className="bg-gray-100 p-4 w-64">
                <p className="font-bold">{slot.Date}</p>
                <p>Start Time: {slot.startTime}</p>
                <p>End Time: {slot.endTime}</p>
                <button
                  className="mt-2 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleBookNow(slot)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
          <div className="text-xl bg-gradient-to-r from-gray-800 via-gray-700 to-transparent py-2 px-4 text-white text-lg">
            Reviews
          </div>
          <div className="flex flex-col ml-20 mt-4 mb-40">
            {reviews.slice(0, reviewsToShow).map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 mb-2">
                <p className="font-bold">{review.UserName}</p>
                <p className="font-bold text-m">{review.Date}</p>
                <p>{review.Review}</p>
              </div>
            ))}
            {reviewsToShow < groundinfo.Reviews.length && (
              <button
                className="mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                onClick={handleLoadMoreReviews}
              >
                Load More
              </button>
            )}
            {reviewsToShow >= groundinfo.Reviews.length && (
              <button
                className="mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                onClick={handleShowLessReviews}
              >
                Show Less
              </button>
            )}
          </div>
        </div>
        {showModal && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-xl font-bold mb-4">Ground Booked Successfully</h2>
              {bookingInfo && (
                <div>
                  <p>Price: {groundinfo.PerHourCharges}</p>
                  <p>Date: {bookingInfo.Date}</p>
                  <p>Time: {bookingInfo.startTime} - {bookingInfo.endTime}</p>
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
    )
  );
};

export default OwnerGroundInformat;
