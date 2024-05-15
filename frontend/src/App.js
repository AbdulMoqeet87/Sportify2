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
import TournamentForm from './Pages/TournamentDetails';
import Arenas from './Pages/Arenas/AvailableArenas';
<<<<<<< HEAD
import UserInformation from './Pages/UserInformation/Userinfo';
=======
import GroundInformation from './Pages/GroundInfo/GroundInformation';
>>>>>>> 36d35ef037fb98753d4181d2054377b5fafa957f

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          
          {/* <Route path='/' element={<Home/>}/>  */}
          <Route path='/' element={<TournamentForm/>}/>
          <Route path='/home' element={<Home/>}/> 
          <Route path='/Arenas' element={<Arenas/>}/> 
          <Route path='/categories' element={<SportCatagories_/>}/> 
          <Route path='/SignUP' element={<SignUp/>}/> 
          <Route path='/login' element={<SignInPg/>}/> 
          <Route path='/success' element={<Success/>}/>
          <Route path='/searchResults' element={<SearchResults/>}/>
<<<<<<< HEAD
          <Route path='/UserInfo' element={<UserInformation/>}/>
=======
          <Route path='/GroundInfo' element={<GroundInformation/>}/>
>>>>>>> 36d35ef037fb98753d4181d2054377b5fafa957f

          <Route path='*' element={<NotFound/>}/>

        </Routes>
        <Toaster/>
      </Router>
    </>
  )
}

export default App
