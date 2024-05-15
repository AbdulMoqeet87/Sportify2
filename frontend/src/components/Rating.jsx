import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ totalStars, updateRating }) => {
  const [hover, setHover] = useState(0);
  const [selected, setSelected] = useState(0);

  const handleStarClick = (value) => {
    setSelected(value);
    updateRating(value);
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hover || selected);
        const isHovered = starValue <= hover;

        return (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={starValue}
              onClick={() => handleStarClick(starValue)}
              style={{ display: 'none' }} // Hide the radio buttons
            />
            <FaStar
              className={`star ${isFilled ? 'text-yellow-400' : 'text-gray-400'}`}
              size={24}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleStarClick(starValue)} 
              style={{
                filter: `drop-shadow(0.5px 0.5px 0.5px black)`, 
                textShadow: `${isHovered ? '0 0 0.8px black' : 'none'}`, 
              }}
              aria-hidden="true"
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
