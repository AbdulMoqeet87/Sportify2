import React from'react';
import { useNavigate } from 'react-router-dom';


const Index = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };
  
  const handleSignUpClick = () => {
    navigate('/SignUp');
  };
  return (
    <div className='indexPage '>
    <button onClick={handleSignInClick} type="submit" className=" p-8 bg-transparent text-white rounded-full ml-60 h-[30px] border border-white">
    Sign In</button>
    <button onClick={handleSignUpClick} type="submit"  className="p-8 bg-transparent text-white rounded-full ml-20 h-[30px] border border-white">
    Sign Up</button>
    </div>

  );
};

export default Index;
