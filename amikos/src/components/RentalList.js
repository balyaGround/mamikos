import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaLock, FaMapMarkerAlt, FaMoneyBillWave, FaTools } from 'react-icons/fa';
import Slider from "react-slick";
import StarRating from "./StarRating";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/Rentallist.css';

const RentalList = ({ rentals, showLoginAlert, isAuthenticated }) => {
  if (!rentals || rentals.length === 0) {
    return <div className="no-rentals">No rentals available.</div>;
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(rentals.length, 3),
    slidesToScroll: 1,
    autoplay: rentals.length > 3,
    autoplaySpeed: 1500,
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
              {isAuthenticated ? (
                <Link to={`/purchase/${rental.id}`} className="rent-btn">Rent Now</Link>
              ) : (
                <p className="rent-btn" onClick={showLoginAlert}>Rent Now</p>
              )}

              {/* Image */}
              {rental.foto && (
                <div className="rental-image">
                  <img src={rental.foto} alt={rental.nama_tempat} />
                </div>
              )}

              {/* Details */}
              <div className="rental-details">
                <h3 className="rental-name">{rental.nama_tempat || "Nama Tidak Tersedia"}</h3>
                
                {/* Kebersihan dengan Bintang */}
                <div className="rental-info">
                  <FaHome color="#2f9948" /> <span>Kebersihan:</span>
                  <StarRating rating={rental.kebersihan || 1} />
                </div>

                {/* Keamanan dengan Satpam atau Tidak */}
                <div className="rental-info">
                  <FaLock color="#2f9948" /> <span>Keamanan:</span> 
                  {rental.keamanan ? " Ada Satpam ✅" : " Tidak Ada Satpam ❌"}
                </div>

                {/* Jarak dari Kampus */}
                <div className="rental-info">
                  <FaMapMarkerAlt color="#2f9948" /> <span>Jarak:</span> {rental.jarak_dari_kampus || 0} km
                </div>

                {/* Harga Sewa */}
                <div className="rental-info">
                  <FaMoneyBillWave color="#2f9948" /> <span>Harga:</span> Rp {rental.harga_sewa ? rental.harga_sewa.toLocaleString() : 'Tidak Tersedia'}
                </div>

                {/* Fasilitas dengan tampilan lebih rapi */}
                <div className="rental-info">
                  <FaTools color="#2f9948" /> <span>Fasilitas:</span>
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

            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RentalList;
