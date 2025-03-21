import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Header from './Header';
import RentalList from './RentalList';
import '../App.css';
import Footer from './Footer';
import Mabac from './mabac';

const MainApp = ({ setRentals }) => {
  const [filteredRentals, setFilteredRentals] = useState([]);
  const db = getFirestore();

  const handleApplyFilters = (filters) => {
    const filtered = setRentals.filter((rental) => {
      return (
        rental.harga_sewa <= filters.rent_price &&
        rental.jarak_dari_kampus <= filters.distance_from_campus &&
        rental.kebersihan >= filters.cleanliness &&
        rental.fasilitas >= filters.facilities &&
        rental.keamanan >= filters.security
      );
    });
    setFilteredRentals(filtered);
  };

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'akun_pemilik_kos'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRentals(data);
        setFilteredRentals(data);
      } catch (error) {
        console.error('Error fetching rentals:', error);
      }
    };

    fetchRentals();
  }, [db]);

  return (
    <div>
      <Header />
      
      {/* Horizontal Filter Bar */}
      <div className="filter-container">
        <Mabac onApplyFilters={handleApplyFilters} />
      </div>

      <div className="container mt-4">
        <RentalList rentals={filteredRentals} />
      </div>

      <Footer />
    </div>
  );
};

export default MainApp;
