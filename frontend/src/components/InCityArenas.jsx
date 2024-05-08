import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa"; // Import star icon from FontAwesome

const InCity = () => {
  const data = [
    {
      name: `PU Main Ground`,
      img: `/Students/13reasons.jpg`,
     Category: `Cricket`,
    city: "lahore",
    district:"TownShip",
    Area:"C1"
    },
    {
      name: `Township whites`,
      img: `/Students/Twilight.jpg`,
      Category: `Cricket`,
      city: "lahore",
      district:"TownShip",
      Area:"C1"
      },
    {
        name: ``,
        img: `/Students/breakingbad.png`,
        Category: `Cricket`,
    city: "lahore",
    district:"TownShip",
    Area:"C1"

      },
    {
      name: `Nawaz Hockey Stadium`,
      img: `/Students/Dune.jpg`,
      Category: `Hockey`,
    city: "lahore",
    district:"TownShip",
    Area:"C1"
    },
    {
      name: `Alim Dar`,
      img: `/Students/shutter.jpg`,
      Category: `Cricket`,
      city: "lahore",
      district:"TownShip",
      Area:"C1"
  
    },
    {
      name: `Wapda Sports Complex Court`,
      img: `/Students/spiderman2.jpg`,
      Category: `Badminton`,
    city: "lahore",
    district:"TownShip",
    Area:"C1"

    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

  };

  return (
    <div className="h-4/4 w-3/4 m-auto mt-10 mb-2 pb-0">
      <h1 className="text-3xl text-white text-left mb-10 mt-30">In&nbsp;Your&nbsp;City</h1> {/* Centered and bigger h1 */}
      <div className="mt-10">
        <Slider {...settings}>
          {data.map((d) => (
            <div key={d.name} className="bg-black h-[350px] text-white p-1 border border-white rounded-xl">
              <div className="h-48 bg-black flex justify-center items-center rounded-t-xl">
                <img src={d.img} alt="" className="h-40 w-40 rounded-full" />
              </div>
              <div className="flex flex-col justify-center items-center gap-4 p-1">
                <p className="text-xl font-semibold">{d.name}</p>
                <div className="flex items-center">
                  <FaStar size={20} color="yellow" />
                  <span className="ml-2">{d.rating}</span> {/* Display rating value */}
                </div>
               
                <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">Book Now</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default InCity;
