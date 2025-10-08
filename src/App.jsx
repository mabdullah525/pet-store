import React from 'react'
import { Route, Routes } from 'react-router-dom'
// Pages
import Register from './pages/Register.jsx'
import Login from './pages/login.jsx'

// Components
import Topbar from './components/Topbar.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<h1>Hello World</h1>} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/topbar' element={<Topbar />} />
    </Routes>
  )
}

export default App