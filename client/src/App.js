import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateDoc from './components/CreateDoc'
import DetailPage from './components/DetailPage'
import EditDoc from './components/EditDoc'
import LandingPage from './components/LandingPage'
import Header from './components/Header'
import Discarded from './components/Discarded'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/add" element={<CreateDoc />} />
          <Route path="/edit/:id" element={<EditDoc />} />
          <Route path="/discarded" element={<Discarded />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App