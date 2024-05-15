import React from 'react'
import NB from '../../components/Navbar'
import { useLocation } from 'react-router-dom';
import UserInfo from '../../components/UserInfo';

const UserInformation = () => {

  return (
    <>   
      <NB />
      <UserInfo/>
    </>
  );
};
export default UserInformation;