// RentalList.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
const RentalList = ({ rentals }) => {
  if (rentals.length === 0) {
    return <div>No rentals available.</div>;
  }

  return (
    <div className="row">
      <h2 className='text-success'>List Amikos</h2>
      {rentals.map((rental) => (
        <div key={rental.id} className="col-md-4 mb-4">
          <div className="card">
            {rental.foto && (
              <img 
              src={rental.foto} 
              alt={rental.nama_tempat} 
              className="card-img-top rental-image"
            />
            )}
            <div className="card-body">
              <h5 className="card-title text-success">{rental.nama_tempat || "Nama Tidak Tersedia"}</h5>
              <p className="card-text">
                Kebersihan: {rental.kebersihan || 0} <br />
                Keamanan: {rental.keamanan || 0} <br />
                Jarak dari Kampus: {rental.jarak_dari_kampus || 0} km <br />
                Harga Sewa: Rp {rental.harga_sewa ? rental.harga_sewa.toLocaleString() : 'Tidak Tersedia'} <br />
                Fasilitas: {rental.fasilitas || 0}
              </p>
              <Link to={`/purchase/${rental.id}`} className="btn btn-success">Rent Now</Link>
            
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentalList;
