import React from 'react'
import Slider_ from '../../components/Slider'
import NewRelease from '../../components/NewRelease'
import NB from '../../components/Navbar'
import { useLocation } from 'react-router-dom';

const Home = () => {
  return (
    <>   
      <NB />
      <NewRelease/>
      <Slider_/>
    </>
  );
};
export default Home;