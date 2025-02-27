// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginSelection from './components/LoginSelection';
import PencariKosLogin from './components/PencariKosLogin';
import PemilikKosLogin from './components/PemilikKosLogin';
import MainApp from './components/MainApp';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSelection />} />
        <Route path="/login-pencari" element={<PencariKosLogin onLogin={handleLogin} />} />
        <Route path="/login-pemilik" element={<PemilikKosLogin onLogin={handleLogin} />} />
        <Route path="/*" element={isAuthenticated ? <MainApp /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
