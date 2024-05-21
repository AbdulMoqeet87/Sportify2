import React from "react";
import { IoAddCircle } from "react-icons/io5";

const OwnHome = () => {
  return (
    <div className="absolute top-10 right-0 p-8">
      <button
        onClick={() => {
          /* Add your click handler logic here */
        }}
        className="text-black"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="text-blue-950 flex flex-row text-xl">
          <IoAddCircle className="text-3xl w-12 h-12" />
        </span>
      </button>
    </div>
  );
};

export default OwnHome;
