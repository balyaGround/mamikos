import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found for your property.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4 shadow-lg">
              <h2 className="text-lg font-semibold">{booking.nama_tempat}</h2>
              <p className="text-gray-600">Rental ID: {booking.rentalId}</p>
              <p className="text-gray-600">Harga: Rp {booking.harga_sewa}</p>
              <p className="text-gray-600">
                Booked At: {new Date(booking.bookedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
