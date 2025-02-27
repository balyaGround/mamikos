// components/LoginSelection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/amikos.png';
import UserPencariKosModal from './UserPencarikosModal'; // Updated modal import
import PemilikKosModal from './PemilikModal';
const LoginSelection = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalPemilik, setShowModalPemilik] = useState(false);
  
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModalPemilik = () => setShowModalPemilik(true);
  const handleCloseModalPemilik = () => setShowModalPemilik(false);

  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: '#e6f7e6', width: '100vw' }}>
      <div className="mb-4 text-center">
        <img
          src={logo}
          alt="Amikos Logo"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
        <h1 className="mt-3 text-success">Selamat Datang di Amikos</h1>
        <p className="text-muted">Pilih peran Anda untuk melanjutkan</p>
      </div>

      <div className="row w-100 justify-content-center">
        <div className="col-md-5">
          <div
            className="card p-4 shadow-sm text-center mb-4 login-card"
            style={{ backgroundColor: '#ffffff', borderColor: '#90ee90', borderWidth: '2px', cursor: 'pointer' }}
          >
            <h3 className="text-success">Masuk sebagai Pencari Kos</h3>
            <p className="text-muted">Cari dan temukan kos yang sesuai dengan kebutuhan Anda.</p>
            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-outline-success w-45"
                onClick={() => navigate('/login-pencari')}
              >
                Login
              </button>
              <button
                className="btn btn-outline-info w-45"
                onClick={handleShowModal} // Show modal for "Register"
              >
                Register
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-5">
          <div
            className="card p-4 shadow-sm text-center mb-4 login-card"
            style={{ backgroundColor: '#ffffff', borderColor: '#90ee90', borderWidth: '2px', cursor: 'pointer' }}
          >
            <h3 className="text-success">Masuk sebagai Pemilik Kos</h3>
            <p className="text-muted">Kelola kos dan pantau penyewaan dari penyewa.</p>
            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-outline-success w-45"
                onClick={() => navigate('/login-pemilik')}
              >
                Login
              </button>
              <button
                className="btn btn-outline-info w-45"
                onClick={handleShowModalPemilik} // Show modal for "Register"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* UserPencariKosModal component */}
      <UserPencariKosModal show={showModal} handleClose={handleCloseModal} />
      <PemilikKosModal show={showModalPemilik} handleClose={handleCloseModalPemilik} />
    </div>
  );
};

export default LoginSelection;
