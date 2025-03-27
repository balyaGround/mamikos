import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Header from "./Header";
import RentalList from "./RentalList";
import "../App.css";
import Footer from "./Footer";
import Mabac from "./MabacFilter";

const MainApp = ({ showLoginAlert, isAuthenticated }) => {
  const [rentals, setRentals] = useState([]); // Store all rentals
  const [filteredRentals, setFilteredRentals] = useState([]); // Store filtered rentals
  const db = getFirestore();

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "akun_pemilik_kos"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          harga_sewa: Number(doc.data().harga_sewa), // 🔥 Pastikan angka
          jarak_dari_kampus: Number(doc.data().jarak_dari_kampus), // 🔥 Fix string jadi angka
          kebersihan: Number(doc.data().kebersihan), // 🔥 Fix jadi angka
          keamanan: Boolean(doc.data().keamanan), // 🔥 Fix jadi boolean
        }));

        console.log("📌 Data setelah konversi:", data);
        setRentals(data);
        setFilteredRentals(data);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, [db]);

  const applyMABACFilter = (filters) => {
    console.log("📌 Filters yang masuk:", filters);

    let filtered = rentals.filter((rental) => {
      console.log("🔥 Cek Rental:", rental);

      const rentMatch = filters.rent_price === "" || rental.harga_sewa <= Number(filters.rent_price);
      const distanceMatch = filters.distance_from_campus === "" || rental.jarak_dari_kampus <= Number(filters.distance_from_campus);
      const cleanMatch = filters.cleanliness === "" || rental.kebersihan >= Number(filters.cleanliness);
      const facilitiesMatch = filters.facilities === "" || rental.fasilitas.length >= Number(filters.facilities);
      const securityMatch = filters.security === "" || (filters.security === "true" ? rental.keamanan === true : rental.keamanan === false);

      console.log(`✔ ${rental.nama_tempat}: Rent(${rentMatch}), Distance(${distanceMatch}), Clean(${cleanMatch}), Facilities(${facilitiesMatch}), Security(${securityMatch})`);

      return rentMatch && distanceMatch && cleanMatch && facilitiesMatch && securityMatch;
    });

    console.log("📌 Data setelah filter awal:", filtered);
    setFilteredRentals(filtered);
  };

  return (
    <div>
      <Header />
      <div className="filter-container">
        <Mabac onApplyFilters={applyMABACFilter} />
      </div>
      <div className="container mt-4">
        <RentalList rentals={filteredRentals} showLoginAlert={showLoginAlert} isAuthenticated={isAuthenticated} />
      </div>
      <Footer />
    </div>
  );
};

export default MainApp;
