import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateDoc from './components/CreateDoc'
import DetailPage from './components/DetailPage'
import EditDoc from './components/EditDoc'
import LandingPage from './components/LandingPage'
import Header from './components/Header'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/detailgvn7dqcu/:id" element={<DetailPage />} />
          <Route path="/addgvn7dqcu" element={<CreateDoc />} />
          <Route path="/editgvn7dqcu/:id" element={<EditDoc />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App