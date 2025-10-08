import React from 'react'
import { Route, Routes } from 'react-router-dom'
// Pages
import Register from './pages/Register.jsx'
import Login from './pages/login.jsx'

// Components

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<h1>Hello World</h1>} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App