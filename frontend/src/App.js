import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Success from './Pages/Success/Success';
import SearchResults from './Pages/SearchResults/SearchResults';
import SignInPg from './Pages/Login/Login';
import SignUp from './Pages/SignUP/Signup';
import './App.css'

import Avail_Locations from './Pages/AvailableArenas/AvailableLocations';
import SportCatagories_ from './Pages/SelectCategory/Catagories';
import Arenas from './Pages/Arenas/AvailableArenas';
import UserInformation from './Pages/UserInformation/Userinfo';
import GroundInformation from './Pages/GroundInfo/GroundInformation';
import Tournament from './Pages/TournamentDeatils/TournamentDetails';
import TournamentForm from './Pages/Tournament/TournamentForm'
import OwnerHome from './Pages/GroundOwnerHome/OwnerHome';
import Ground from './Pages/AddGround/AddGorund';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          
          {/* <Route path='/' element={<Home/>}/>  */}
          <Route path='/' element={<Tournament/>}/>
          <Route path='/home' element={<Home/>}/> 
          <Route path='/Arenas' element={<Arenas/>}/> 
          <Route path='/categories' element={<SportCatagories_/>}/> 
          <Route path='/SignUP' element={<SignUp/>}/> 
          <Route path='/login' element={<SignInPg/>}/> 
          <Route path='/success' element={<Success/>}/>
          <Route path='/searchResults' element={<SearchResults/>}/>
          <Route path='/UserInfo' element={<UserInformation/>}/>
          <Route path='/GroundInfo' element={<GroundInformation/>}/>
          <Route path='/OwnerHome' element={<OwnerHome/>}/>
          <Route path='/Tournament' element={<Tournament/>}/>
          <Route path='/TournamentForm' element={<TournamentForm/>}/>
          <Route path='/AddGround' element={<Ground/>}/>
          
          <Route path='*' element={<NotFound/>}/>

        </Routes>
        <Toaster/>
      </Router>
    </>
  )
}

export default App