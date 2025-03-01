// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginSelection from './components/LoginSelection';
import PencariKosLogin from './components/PencariKosLogin';
import PemilikKosLogin from './components/PemilikKosLogin';
import MainApp from './components/MainApp';
import BookingsPage from './components/BookingPage';
import Purchase from './components/Purchase';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const [rentals, setRentals] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSelection />} />
        <Route path="/login-pencari" element={<PencariKosLogin onLogin={handleLogin} />} />
        <Route path="/login-pemilik" element={<PemilikKosLogin onLogin={handleLogin} />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/home" element={isAuthenticated ? <MainApp setRentals={setRentals}/> : <Navigate to="/" />} />
        <Route path="/purchase/:id" element={<Purchase rentals={rentals} />} />
      </Routes>
    </Router>
  );
};

export default App;
