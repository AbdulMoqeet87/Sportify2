import React from 'react'
import Slider_ from '../../components/Slider'
import NewRelease from '../../components/NewRelease'
import NB from '../../components/Navbar'
import { useLocation } from 'react-router-dom';

const Home = () => {

  //   const { state } = useLocation();
// console.log(state);
  // Print the entire state object to the console
  // const name =  state&&state.User.FirstName?state.User.FirstName:"User";
  // console.log("name",name);
  return (
    <>   
      <NB />
      <NewRelease/>
      <Slider_/>
    </>
  );
};
export default Home;