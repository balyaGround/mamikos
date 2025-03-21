import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Header from "./Header";
import RentalList from "./RentalList";
import "../App.css";
import Footer from "./Footer";
import Mabac from "./MabacFilter";

const MainApp = ({ showLoginAlert, isAuthenticated })  => {
  const [rentals, setRentals] = useState([]); // Store all rentals
  const [filteredRentals, setFilteredRentals] = useState([]); // Store filtered rentals
  const db = getFirestore();

  // Define weights (adjust as needed)
  const weights = {
    rent_price: 0.2,
    distance_from_campus: 0.2,
    cleanliness: 0.2,
    facilities: 0.2,
    security: 0.2,
  };

  // MABAC Filtering Logic
  const applyMABACFilter = (filters) => {
    const filtered = rentals.filter((rental) => { // ✅ Use rentals, NOT setRentals
      return (
        (filters.rent_price === "" || rental.harga_sewa <= filters.rent_price) &&
        (filters.distance_from_campus === "" || rental.jarak_dari_kampus <= filters.distance_from_campus) &&
        (filters.cleanliness === "" || rental.kebersihan >= filters.cleanliness) &&
        (filters.facilities === "" || rental.fasilitas >= filters.facilities) &&
        (filters.security === "" || rental.keamanan >= filters.security)
      );
    });

    if (filtered.length === 0) {
      setFilteredRentals([]);
      return;
    }

    // Step 1: Normalize Data
    let maxValues = {
      rent_price: Math.max(...filtered.map((r) => r.harga_sewa)),
      distance_from_campus: Math.max(...filtered.map((r) => r.jarak_dari_kampus)),
      cleanliness: Math.max(...filtered.map((r) => r.kebersihan)),
      facilities: Math.max(...filtered.map((r) => r.fasilitas)),
      security: Math.max(...filtered.map((r) => r.keamanan)),
    };

    let normalizedData = filtered.map((rental) => ({
      ...rental,
      normalized: {
        rent_price: maxValues.rent_price ? rental.harga_sewa / maxValues.rent_price : 0,
        distance_from_campus: maxValues.distance_from_campus
          ? rental.jarak_dari_kampus / maxValues.distance_from_campus
          : 0,
        cleanliness: maxValues.cleanliness ? rental.kebersihan / maxValues.cleanliness : 0,
        facilities: maxValues.facilities ? rental.fasilitas / maxValues.facilities : 0,
        security: maxValues.security ? rental.keamanan / maxValues.security : 0,
      },
    }));

    // Step 2: Apply Weights
    let weightedData = normalizedData.map((rental) => ({
      ...rental,
      weighted_score:
        (1 - rental.normalized.rent_price) * weights.rent_price +
        (1 - rental.normalized.distance_from_campus) * weights.distance_from_campus +
        rental.normalized.cleanliness * weights.cleanliness +
        rental.normalized.facilities * weights.facilities +
        rental.normalized.security * weights.security,
    }));

    // Step 3: Rank Rentals Based on Score
    weightedData.sort((a, b) => b.weighted_score - a.weighted_score);

    // Update State with Filtered Rentals
    setFilteredRentals(weightedData);
  };

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "akun_pemilik_kos"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRentals(data); // ✅ Store original rental data
        setFilteredRentals(data); // ✅ Initially show all rentals
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, [db]);

  return (
    <div>
      <Header />

      {/* Horizontal Filter Bar */}
      <div className="filter-container">
        <Mabac onApplyFilters={applyMABACFilter} />
      </div>

      <div className="container mt-4">
        <RentalList rentals={filteredRentals}  showLoginAlert={showLoginAlert} isAuthenticated={isAuthenticated} />
      </div>

      <Footer />
    </div>
  );
};

export default MainApp;
