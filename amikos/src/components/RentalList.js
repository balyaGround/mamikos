import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Rentallist.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaHome, FaShieldAlt, FaMapMarkerAlt, FaMoneyBillWave, FaStar } from "react-icons/fa";

const RentalList = ({ rentals }) => {
  if (rentals.length === 0) {
    return <div>No rentals available.</div>;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Shows 3 cards at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="rental-fullwidth">
      <h2 className="rental-title">Temukan Kos Terbaikmu!</h2>
      <Slider {...settings} className="rental-slider">
        {rentals.map((rental) => (
          <div key={rental.id} className="rental-item">
            <div className="rental-card">
              {/* Left Side - Image */}
              {rental.foto && (
                <div className="rental-image">
                  <img src={rental.foto} alt={rental.nama_tempat} />
                </div>
              )}

              {/* Right Side - Description */}
              <div className="rental-details">
                <h3 className="rental-name">{rental.nama_tempat || "Nama Tidak Tersedia"}</h3>
                <p className="rental-info">
                  <FaStar className="rental-icon" /> <span>Kebersihan:</span> {rental.kebersihan || 0} <br />
                  <FaShieldAlt className="rental-icon" /> <span>Keamanan:</span> {rental.keamanan || 0} <br />
                  <FaMapMarkerAlt className="rental-icon" /> <span>Jarak:</span> {rental.jarak_dari_kampus || 0} km <br />
                  <FaHome className="rental-icon" /> <span>Fasilitas:</span> {rental.fasilitas || 0} <br />
                  <FaMoneyBillWave className="rental-icon" /> <span>Harga:</span> Rp {rental.harga_sewa ? rental.harga_sewa.toLocaleString() : 'Tidak Tersedia'} 
                </p>
                <Link to={`/purchase/${rental.id}`} className="rent-btn">Rent Now</Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RentalList;
