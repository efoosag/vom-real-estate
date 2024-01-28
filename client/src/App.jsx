import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/About'
import CreateListing from './pages/CreateListing'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/sign_in' element={<SignIn/>}/>
        <Route exact path='/sign_up' element={<SignUp/>}/>
        <Route element={<PrivateRoute />}>
          <Route exact path='/profile' element={<Profile/>}/>
          <Route exact path='/create-listing' element={<CreateListing/>}/>
        </Route>        
        <Route exact path='/about' element={<About/>}/>
      </Routes>
    </BrowserRouter>
  )
}
