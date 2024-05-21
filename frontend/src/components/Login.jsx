import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const[User,setUser]=useState();
  const navigate = useNavigate();

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
     
      const response = await axios.post(
        "http://localhost:4000/User/login",
        { email, Password } ,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response)

      toast.success("Logged In Successfully");
      console.log(response.data.message);

      if(response.data.message==='user')
        {
      const user=await axios.get(
        `http://localhost:4000/User/GetLoggedUser/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const userId = user.data.data._id;
        const userName = user.data.data.FirstName;
      
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
        localStorage.setItem('role', "user");
        
        console.log("user",user.data.data.FirstName);
      navigate('/home'); 
      
      
      }

      
      if(response.data.message==='owner')
        {
      const owner=await axios.get(
        `http://localhost:4000/GroundOwner/login/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      
        const userId = owner.data.data._id;
        const userName = owner.data.data.FirstName;       
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
        localStorage.setItem('role', "owner");
        console.log("Owner message",owner.data.data.FirstName);
      navigate('/OwnerHome');
      }
     

      setEmail("");
      setPassword("");
      
    }
     catch (error) 
    {
      toast.error(error.response.data.message);
    }
  };

  const MoveToSignUpPage = () => {
    navigate("/SignUP");
  };

  const containerStyle = {
    width: "300px",
  };
  const BannerStyle = {
    marginLeft: "200px",
  };

  return (
    <section className="login" id="login">
      <div className="container  ">
        <div style={BannerStyle} className="banner ">
          <div style={containerStyle} className="login_form_box">
            <h3>Login</h3>
            <form>
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <h5>
                Don't have an account?{" "}
                <span
                  onClick={MoveToSignUpPage}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  Sign Up
                </span>{" "}
              </h5>
              <button type="button" onClick={handleReservation}>
                Login{" "}
                <span>
                  <HiOutlineArrowNarrowRight />
                </span>{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
