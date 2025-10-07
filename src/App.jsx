import React from 'react'
import { Route, Routes } from 'react-router-dom'
// Pages
import Register from './pages/Register.jsx'

// Components

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<h1>Hello World</h1>} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default App