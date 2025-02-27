// PencariKosLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const PemilikKosLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      // Query Firestore to find a document where email and password match
      const q = query(
        collection(db, 'akun_pemilik_kos'),
        where('email', '==', email),
        where('password', '==', password)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setError('Invalid email or password');
      } else {
        // If a match is found, login is successful
        onLogin(); // Set authentication status in App.js
        navigate('/main'); // Redirect to the main app
      }
    } catch (err) {
      setError('Error logging in, please try again');
      console.error('Error checking login:', err);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#e6f7e6' }}>
      <div className="card p-5 shadow-sm login-card" style={{ width: '400px' }}>
        <h3 className="text-success text-center mb-4">Login sebagai Pemilik Kos</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-3"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-info w-100 rounded-3">Login</button>
        </form>
      </div>
    </div>
  );
};

export default PemilikKosLogin;
