import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { FaMapMarkerAlt, FaMoneyBillWave, FaShieldAlt, FaStar, FaCheckCircle } from 'react-icons/fa';

import '../styles/Purchase.css';
const Purchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rental, setRental] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const docRef = doc(db, 'akun_pemilik_kos', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRental({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("Rental not found");
        }
      } catch (error) {
        console.error("Error fetching rental:", error);
      }
    };
    fetchRental();
  }, [id, db]);

  const handleConfirmBooking = async () => {
    setConfirming(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        rentalId: rental.id,
        nama_tempat: rental.nama_tempat,
        harga_sewa: rental.harga_sewa,
        bookedAt: new Date().toISOString(),
      });
      alert('Booking confirmed! Redirecting to main page...');
      navigate('/');
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('Failed to book. Please try again.');
    } finally {
      setConfirming(false);
    }
  };

  if (!rental) {
    return <div className="loading-message">Loading rental details...</div>;
  }

  return (
    <div className="purchase-container">
      <div className="purchase-card">
        {/* Rental Image */}
        {rental.foto && (
          <div className="rental-image-container">
            <img src={rental.foto} alt={rental.nama_tempat} className="rental-image" />
            <button className="confirm-button" onClick={handleConfirmBooking} disabled={confirming}>
              {confirming ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        )}

        {/* Rental Details */}
        <div className="rental-details">
          <h2 className="rental-title">
            <FaCheckCircle className="success-icon" /> {rental.nama_tempat}
          </h2>

          <div className="rental-info">
            <p><FaMoneyBillWave className="info-icon" /> <strong>Harga Sewa:</strong> Rp {rental.harga_sewa.toLocaleString()}</p>
            <p><FaMapMarkerAlt className="info-icon" /> <strong>Jarak:</strong> {rental.jarak_dari_kampus} km dari kampus</p>
            <p><FaStar className="info-icon" /> <strong>Kebersihan:</strong> {rental.kebersihan}/5</p>
            <p><FaShieldAlt className="info-icon" /> <strong>Keamanan:</strong> {rental.keamanan}/5</p>
            <p><FaCheckCircle className="info-icon" /> <strong>Fasilitas:</strong> {rental.fasilitas}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
