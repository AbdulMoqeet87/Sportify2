import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [PhoneNo, setPhone] = useState("");
  const navigate = useNavigate();

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/User/signup/",
        { FirstName, LastName, email,UserName, PhoneNo,Password},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setPhone(" ");
      setEmail("");
      setUserName("");
      setPassword("");
      navigate("/login");
    } 
    catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const MoveToSignUpPage =()=>{
    navigate("/login");
  }


return (
  <section className="reservation" id="reservation">
    <div className="container pb-100">
      <div className="banner">
      </div>
      <div className="banner" >
        <div className="reservation_form_box">
          <h3>Sign Up</h3>
         
          <form>
            <div className="flex-col">
              <input
                type="text"
                placeholder="First Name"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              
              <input
                type="text"
                placeholder="Last Name"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
             <input
                type="text"
                placeholder="User Name"
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="email_tag"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
               <input
                type="password"
                placeholder="Password"
                
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="number"
                placeholder=" Number"
                value={PhoneNo}
                
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <h5 >Already have an account?  <span onClick={MoveToSignUpPage}  className="text-blue-500 hover:underline cursor-pointer">
             Login </span> </h5>
            <button type="submit" onClick={handleReservation}>                
              Sign Up{" "}
              <span>
                <HiOutlineArrowNarrowRight />
                </span>            
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);
};


 
export default Reservation;