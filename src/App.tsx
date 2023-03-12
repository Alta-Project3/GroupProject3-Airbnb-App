import React,{ useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import Login from './Page/login'
import Register from './Page/register'
import Home from './Page/home'
import ProfileUSer from './Page/profileUser'
import ProfileHost from './Page/profileHost'
import DetailStay from './Page/detailStay'
import Payment from './Page/payment'
import SetBnb from './Page/setBnb'
import EditBnb from './Page/editbnb'
import Listing from './Page/listing'
import Trip from './Page/Trip'
import EditProfile from './Page/editProfile'



function App() {

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/profile_user' element={<ProfileUSer/>} />
          <Route path='/profile_host' element={<ProfileHost/>} />
          <Route path='/edit_profile' element={<EditProfile/>} />
          <Route path='/detail_stay' element={<DetailStay/>} />
          <Route path='/payment' element={<Payment/>} />
          <Route path='/set_bnb' element={<SetBnb/>} />
          <Route path='/edit_bnb' element={<EditBnb/>} />
          <Route path='/list_bnb' element={<Listing/>} />
          <Route path='/trip' element={<Trip/>} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  )
}

export default App
