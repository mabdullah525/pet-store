import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<h1>
        Hello World
      </h1>} />
      <Route path='/login' element={<h1>
        login
      </h1>} />




    </Routes>
  )
}

export default App