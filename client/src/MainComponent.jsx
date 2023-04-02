import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Header from './Header/Header'

function MainComponent() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
  )
}

export default MainComponent
