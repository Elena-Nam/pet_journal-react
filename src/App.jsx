import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PetsPage from './pages/PetsPage';
import ProtectedRoute from './components/ProtectedRoute';
import PetProfilePage from './pages/PetProfilePage';
import NotFound from './pages/NotFound';


function App() {
  return (
    <>
      <BrowserRouter>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element= {<RegisterPage />} />
           <Route path="/pets" element={
            <ProtectedRoute>
              <PetsPage />
            </ProtectedRoute> }
           /> 
          <Route path="/pets/:id" element={<PetProfilePage />} /> 
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
