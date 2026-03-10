import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css'
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PetsPage from './pages/PetsPage';
import ProtectedRoute from './components/ProtectedRoute';
// import PetProfilePage from './pages/PetProfilePage';

import NotFound from './pages/NotFound';
// import Navbar from "./components/Navbar";

function App() {
  
  return (
    <>
      <BrowserRouter>
      {/* <nav> 
        <Navbar /> */}
        {/* <Link to="/" className="active">Home</Link>
        <Link to="/pets">Pets</Link> 
        <Link to="/add-pet">Add Pet</Link>
        <Link to="/login" >Login</Link>
        <Link to="/register">Register</Link><Link to="/" className="active"></Link> */}
      {/* </nav> */}
      

       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element= {<RegisterPage />} />
          <Route path="/pets" element={
            <ProtectedRoute>
              <PetsPage />
              {/* <PetProfilePage /> */}
            </ProtectedRoute>
          } />
          {/* <Route path="/pets" element={<PetsPage />} /> */}
           {/* <Route path="/pets/:id" element={<PetProfile />} /> */}
          
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
