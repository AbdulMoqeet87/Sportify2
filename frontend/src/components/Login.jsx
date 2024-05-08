import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/User/login",
        { UserName, Password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setUserName("");
      setPassword("");
      navigate("/home");
    } catch (error) {
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
                  placeholder="User Name"
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
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
