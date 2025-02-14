import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Images/Home'
import Previewimage from './Images/Previewimage';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Preview/:id' element={<Previewimage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App