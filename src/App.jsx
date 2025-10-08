import React from 'react'
import { Route, Routes } from 'react-router-dom'
// Pages
import Register from './pages/Register.jsx'
import Login from './pages/login.jsx'

// Components
import Topbar from './components/Topbar.jsx'

const App = () => {
  return (
    <div>
      <Topbar />
      <Routes>
        <Route path='/' element={<h1>Hello World</h1>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App