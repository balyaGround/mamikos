import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { FaMapMarkerAlt, FaMoneyBillWave, FaShieldAlt, FaCheckCircle, FaTools } from 'react-icons/fa';
import Swal from 'sweetalert2';
import StarRating from './StarRating'; // Import komponen rating bintang

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

      Swal.fire({
        title: 'Booking Berhasil!',
        text: `Kamu telah berhasil memesan ${rental.nama_tempat}.`,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#28a745'
      }).then(() => {
        navigate('/');
      });

    } catch (error) {
      console.error('Error confirming booking:', error);
      Swal.fire({
        title: 'Gagal!',
        text: 'Terjadi kesalahan saat booking. Silakan coba lagi.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33'
      });
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
            <p><FaShieldAlt className="info-icon" /> <strong>Keamanan:</strong> {rental.keamanan ? "Ada Satpam ✅" : "Tidak Ada Satpam ❌"}</p>
            
            {/* Kebersihan menggunakan rating bintang */}
            <div className="rental-info">
              <span className="info-icon">⭐</span> <strong>Kebersihan:</strong>
              <StarRating rating={rental.kebersihan || 1} />
            </div>

            {/* Fasilitas */}
            <div className="rental-info">
              <FaTools className="info-icon" /> <strong>Fasilitas:</strong>
              <div className="facilities-container">
                {Array.isArray(rental.fasilitas) && rental.fasilitas.length > 0 ? (
                  rental.fasilitas.map((item, index) => (
                    <div key={index} className="facilities-item">{item}</div>
                  ))
                ) : (
                  <div className="facilities-item">Tidak ada fasilitas</div>
                )}
              </div>
            </div>
          </div>

          {/* Confirm Booking Button */}
          <button className="confirm-button" onClick={handleConfirmBooking} disabled={confirming}>
            {confirming ? 'Processing...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
