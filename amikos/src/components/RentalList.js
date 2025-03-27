import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaLock, FaMapMarkerAlt, FaMoneyBillWave, FaTools } from "react-icons/fa";
import Slider from "react-slick";
import StarRating from "./StarRating";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Rentallist.css";

const RentalList = ({ rentals, showLoginAlert, isAuthenticated }) => {
  if (!rentals || rentals.length === 0) {
    return <div className="no-rentals">🚫 Tidak ada kos yang tersedia.</div>;
  }

  const settings = {
    dots: true,
    infinite: rentals.length > 3,
    speed: 500,
    slidesToShow: Math.min(rentals.length, 3),
    slidesToScroll: 1,
    autoplay: rentals.length > 3,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(rentals.length, 2) } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="rental-fullwidth">
      <h2 className="rental-title">🏠 Temukan Kos Terbaikmu!</h2>

      <Slider key={rentals.length} {...settings} className="rental-slider">
        {rentals.map((rental) => {
          const {
            id,
            foto,
            nama_tempat = "Nama Tidak Tersedia",
            kebersihan = 1,
            keamanan = false,
            jarak_dari_kampus = 0,
            harga_sewa = 0,
            fasilitas = [],
          } = rental;

          return (
            <div key={id} className="rental-item">
              <div className="rental-card">

                {/* Tombol Rent di Pojok Kanan Atas */}
                {isAuthenticated ? (
                  <Link to={`/purchase/${id}`} className="rent-btn">
                    Rent Now
                  </Link>
                ) : (
                  <p className="rent-btn" onClick={showLoginAlert}>
                    Rent Now
                  </p>
                )}

                {/* Gambar Kos */}
                {foto && (
                  <div className="rental-image">
                    <img src={foto} alt={nama_tempat} />
                  </div>
                )}

                {/* Informasi Kos */}
                <div className="rental-details">
                  <h3 className="rental-name">{nama_tempat}</h3>

                  {/* Kebersihan dengan Bintang */}
                  <div className="rental-info">
                    <FaHome color="#2f9948" /> <span>Kebersihan:</span>
                    <StarRating rating={kebersihan} />
                  </div>

                  {/* Keamanan: Satpam atau Tidak */}
                  <div className="rental-info">
                    <FaLock color="#2f9948" /> <span>Keamanan:</span>
                    {keamanan ? " ✅ Ada Satpam" : " ❌ Tidak Ada Satpam"}
                  </div>

                  {/* Jarak dari Kampus */}
                  <div className="rental-info">
                    <FaMapMarkerAlt color="#2f9948" /> <span>Jarak:</span> {jarak_dari_kampus} km
                  </div>

                  {/* Harga Sewa */}
                  <div className="rental-info">
                    <FaMoneyBillWave color="#2f9948" /> <span>Harga:</span> Rp {harga_sewa.toLocaleString()}
                  </div>

                  {/* Fasilitas Kos */}
                  <div className="rental-info">
                    <FaTools color="#2f9948" /> <span>Fasilitas:</span>
                    <div className="facilities-container">
                      {Array.isArray(fasilitas) && fasilitas.length > 0 ? (
                        fasilitas.map((item, index) => (
                          <div key={index} className="facilities-item">
                            {item}
                          </div>
                        ))
                      ) : (
                        <div className="facilities-item">Tidak ada fasilitas</div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default RentalList;
