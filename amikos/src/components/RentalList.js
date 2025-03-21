import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaLock, FaMapMarkerAlt, FaMoneyBillWave, FaTools } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../styles/Rentallist.css';

const RentalList = ({ rentals }) => {
  if (!rentals || rentals.length === 0) {
    return <div className="no-rentals">No rentals available.</div>;
  }

  const settings = {
    dots: false,
    infinite: false, // Disable infinite scroll when filtering
    speed: 500,
    slidesToShow: Math.min(rentals.length, 3), // Adjust based on filtered results
    slidesToScroll: 1,
    autoplay: rentals.length > 3, // Only autoplay if enough rentals exist
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(rentals.length, 2) } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="rental-fullwidth">
      <h2 className="rental-title">Temukan Kos Terbaikmu!</h2>
      <Slider key={rentals.length} {...settings} className="rental-slider">
        {rentals.map((rental) => (
          <div key={rental.id} className="rental-item">
            <div className="rental-card">
              
              {/* Rent Button on Top Right */}
              <Link to={`/purchase/${rental.id}`} className="rent-btn">Rent Now</Link>

              {/* Image */}
              {rental.foto && (
                <div className="rental-image">
                  <img src={rental.foto} alt={rental.nama_tempat} />
                </div>
              )}

              {/* Details */}
              <div className="rental-details">
                <h3 className="rental-name">{rental.nama_tempat || "Nama Tidak Tersedia"}</h3>
                <p className="rental-info">
                  <FaHome color="#2f9948" /> <span>Kebersihan:</span> {rental.kebersihan || 0} <br />
                  <FaLock color="#2f9948" /> <span>Keamanan:</span> {rental.keamanan || 0} <br />
                  <FaMapMarkerAlt color="#2f9948" /> <span>Jarak:</span> {rental.jarak_dari_kampus || 0} km <br />
                  <FaMoneyBillWave color="#2f9948" /> <span>Harga:</span> Rp {rental.harga_sewa ? rental.harga_sewa.toLocaleString() : 'Tidak Tersedia'} <br />
                  <FaTools color="#2f9948" /> <span>Fasilitas:</span> {rental.fasilitas || 0}
                </p>
              </div>

            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RentalList;
