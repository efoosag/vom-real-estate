import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './components/Header'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/sign_in' element={<SignIn/>}/>
        <Route exact path='/sign_up' element={<SignUp/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/about' element={<About/>}/>
      </Routes>
    </BrowserRouter>
  )
}
