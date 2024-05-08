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
          <Route path='*' element={<NotFound/>}/>

        </Routes>
        <Toaster/>
      </Router>
    </>
  )
}

export default App
