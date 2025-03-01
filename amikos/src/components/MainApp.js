// MainApp.js
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Header from './Header';
import RentalList from './RentalList';
import '../App.css';
import Footer from './Footer';
import Mabac from './mabac';
const MainApp = ({ setRentals }) => { // State to hold rental data
  const [filteredRentals, setFilteredRentals] = useState([]); // State for filtered rentals

  const db = getFirestore(); // Initialize Firestore

  const handleApplyFilters = (filters) => {
    // Filter logic based on MABAC criteria
    const filtered = setRentals.filter((rental) => {
      return (
        rental.harga_sewa <= filters.rent_price &&
        rental.jarak_dari_kampus <= filters.distance_from_campus &&
        rental.kebersihan >= filters.cleanliness &&
        rental.fasilitas >= filters.facilities &&
        rental.keamanan >= filters.security
      );
    });
    setFilteredRentals(filtered); // Set the filtered rentals
  };

  // Fetch rentals from Firestore when the component mounts
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'akun_pemilik_kos'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRentals(data);
        setFilteredRentals(data); // Initially display all rentals
      } catch (error) {
        console.error('Error fetching rentals:', error);
      }
    };

    fetchRentals();
  }, [db]);

  return (
    <div>
    <Header />
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <Mabac onApplyFilters={handleApplyFilters} />
        </div>
        <div className="col-md-9">
          <RentalList rentals={filteredRentals} />
        </div>
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default MainApp;
