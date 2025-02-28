import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../App.css"; 

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pemilikKosData = JSON.parse(localStorage.getItem("pemilik_kos"));
    if (!pemilikKosData) {
      alert("You must log in first!");
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      const q = query(collection(db, "bookings"), where("nama_tempat", "==", pemilikKosData.nama_tempat));
      const querySnapshot = await getDocs(q);
      const bookingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookingsData);
    };

    fetchBookings();
  }, [navigate]);

  return (
    <div className="container my-5">
      <h1 className="text-gray-800 text-center">Your Bookings</h1>

      {/* ✅ Back to Login Button */}
      <div className="text-center my-3">
        <button onClick={() => navigate("/")} className="btn btn-success">
          🔙 Back to Login
        </button>
      </div>

      {bookings.length === 0 ? (
        <p className="text-gray-600 text-center">No bookings found for your property.</p>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking.id} className="col-md-4">
              <div className="booking-card card p-3">
                <h2 className="text-gray-800">{booking.nama_tempat}</h2>
                <p className="text-gray-600">Rental ID: <strong>{booking.rentalId}</strong></p>
                <p className="text-gray-600">Harga: <strong className="text-success">Rp {booking.harga_sewa}</strong></p>
                <p className="text-gray-600">Booked At: <strong>{new Date(booking.bookedAt).toLocaleString()}</strong></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
