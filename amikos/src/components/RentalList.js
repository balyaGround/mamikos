// RentalList.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaBroom, FaShieldAlt, FaMapMarkerAlt, FaMoneyBillWave, FaStar } from "react-icons/fa";

const RentalList = ({ rentals }) => {
  if (rentals.length === 0) {
    return <div>No rentals available.</div>;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Number of cards visible at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="container rental-container">
      <h2 className="menu-title text-success">Temukan Kos Terbaikmu !</h2>
      <Slider {...settings} className="rental-slider">
        {rentals.map((rental) => (
          <div key={rental.id} className="menu-item">
            <div className="menu-card">
              {/* Image */}
              {rental.foto && (
                <div className="menu-image">
                  <img src={rental.foto} alt={rental.nama_tempat} />
                </div>
              )}
              
              {/* Details */}
              <div className="menu-details">
                <h3 className="menu-card-title">{rental.nama_tempat || "Nama Tidak Tersedia"}</h3>
               <p className="menu-description">
                  <span><FaBroom className="icon" /> Kebersihan:</span> {rental.kebersihan || 0} <br />
                  <span><FaShieldAlt className="icon" /> Keamanan:</span> {rental.keamanan || 0} <br />
                  <span><FaMapMarkerAlt className="icon" /> Jarak:</span> {rental.jarak_dari_kampus || 0} km <br />
                  <span><FaMoneyBillWave className="icon" /> Harga:</span> Rp {rental.harga_sewa ? rental.harga_sewa.toLocaleString() : 'Tidak Tersedia'} <br />
                  <span><FaStar className="icon" /> Fasilitas:</span> {rental.fasilitas || 0}
                </p>
                <Link to={`/purchase/${rental.id}`} className="rent-button">
                  Rent Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};



export default RentalList;
