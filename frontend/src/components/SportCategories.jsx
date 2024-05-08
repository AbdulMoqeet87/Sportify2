import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa"; // Import star icon from FontAwesome

const SCategories = () => {
  const data = [
    {
      name: `Cricket`,
      img: `/images/Cricket.jpg`,
    },
    {
        name: `Foot Ball`,
        img: `/images/FootBall.jpg`,
      },
    {
        name: `Hockey`,
        img: `/images/Hockey.jpg`,
        },
    {
        name: `Badminton`,
        img: `/images/Badminton.jpg`,
      },
    {
        name: `Table Tennis`,
        img: `/images/TableTennis.jpg`,
      },
    {
        name: `Foos Ball`,
        img: `/images/FoosBall.jpg`,
      },
      
  ];
const SetStyles=()=>
{
  return {textShadow: '4px 4px black, -1px -1px black, 1px -1px black, -1px 1px black'
};
}

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

  };

  return (
    <div className="h-3/4 w-[800px]  mt-10 mb-2 pt-0 pl-0 ml-80 mr-80 ">
      <h1 className="text-3xl text-white text-center mb-10 mt-30">Select&nbsp;&nbsp;Category</h1> {/* Centered and bigger h1 */}
      <div className="mt-10  ">
        <Slider {...settings}>
          {data.map((d) => (
            <div key={d.name} className="bg-black h-[450px] text-white  border border-white rounded-xl">
              <div className="flex flex-col justify-center items-center gap-4 p-1 h-100 bg-black flex justify-center items-center bg-cover bg-center h-full w-full" style={{backgroundImage: `url(${d.img})`}}>
           
                <p style={SetStyles()} className=" text-6xl font-semibold " >{d.name}</p>                
                <button className="bg-black -500 text-white text-lg px-6 py-1 rounded-xl">Select</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SCategories;
