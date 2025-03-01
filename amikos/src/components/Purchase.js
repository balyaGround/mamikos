import React , { useState }  from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import "../App.css";

const Purchase = ({ rentals = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const rental = rentals.length > 0 ? rentals.find((r) => r.id === id) : null;
  const [confirming, setConfirming] = useState(false);
  const db = getFirestore();
  if (!rental) {
    return <div>Rental not found or still loading...</div>;
  }

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
      navigate('/home');
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('Failed to book. Please try again.');
    } finally {
      setConfirming(false);
    }
  };


  return (
    <div className="container mt-5">
      <h2 className='text-success'>Confirm Booking</h2>
      <div className="card">
        {rental.foto && <img src={rental.foto} alt={rental.nama_tempat} className="card-img-top rental-image" />}
        <div className="card-body">
          <h5 className="card-title text-success">{rental.nama_tempat}</h5>
          <p className="card-text">
            Harga Sewa: Rp {rental.harga_sewa.toLocaleString()} <br />
            Jarak dari Kampus: {rental.jarak_dari_kampus} km <br />
            Kebersihan: {rental.kebersihan} <br />
            Keamanan: {rental.keamanan} <br />
            Fasilitas: {rental.fasilitas}
          </p>
          <button
            className="btn btn-success"
            onClick={handleConfirmBooking}
            disabled={confirming}
          >
            {confirming ? 'Processing...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Purchase;