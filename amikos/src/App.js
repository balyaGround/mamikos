import React, { useState} from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginSelection from "./components/LoginSelection";
import PencariKosLogin from "./components/PencariKosLogin";
import PemilikKosLogin from "./components/PemilikKosLogin";
import MainApp from "./components/MainApp";
import BookingsPage from "./components/BookingPage";
import Purchase from "./components/Purchase";
import Swal from "sweetalert2"; 
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rentals, setRentals] = useState([]);

  // Function to handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
 // Function to show an alert when trying to rent without login
 const showLoginAlert = () => {
  Swal.fire({
    title: "Oops!",
    text: "You must log in first to rent a property.",
    icon: "warning",
    confirmButtonText: "Got it!",
    confirmButtonColor: "#2f9948",
  });
};
  return (
    <Router>
      <Routes>
        {/* Home is now MainApp */}
        <Route path="/" element={<MainApp setRentals={setRentals} 
    rentals={rentals} 
    showLoginAlert={showLoginAlert} 
    isAuthenticated={isAuthenticated} />} />

        {/* Login Pages */}
        <Route path="/login" element={<LoginSelection />} />
        <Route path="/login-pencari" element={<PencariKosLogin onLogin={handleLogin} />} />
        <Route path="/login-pemilik" element={<PemilikKosLogin onLogin={handleLogin} />} />

        {/* Bookings Page (Only if logged in) */}
        <Route path="/bookings" element={isAuthenticated ? <BookingsPage /> : <LoginSelection />} />
        {/* Purchase Page (Only if logged in) */}
        <Route path="/purchase/:id" element={isAuthenticated ? <Purchase rentals={rentals} /> : <LoginSelection />} />
      </Routes>
    </Router>
  );
};

export default App;
