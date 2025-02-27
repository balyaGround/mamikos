// Mabac.js
import React, { useState } from 'react';

const Mabac = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    rent_price: 2000000,
    distance_from_campus:1,
    cleanliness: 6,
    facilities: 7,
    security: 6,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: Number(value), // Convert string input to number
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(filters); // Call the function passed from App component
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-success">MABAC Filters</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="rent_price" className="form-label">Harga Sewa</label>
            <input
              type="float"
              id="rent_price"
              name="rent_price"
              value={filters.rent_price}
              onChange={handleChange}
              className="form-control"
              min="0.0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="distance_from_campus" className="form-label">Jarak ke Kampus (km)</label>
            <input
              type="number"
              id="distance_from_campus"
              name="distance_from_campus"
              value={filters.distance_from_campus}
              onChange={handleChange}
              className="form-control"
              min="0"
              step="0.1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cleanliness" className="form-label">Kebersihan (1-10)</label>
            <input
              type="fnumber"
              id="cleanliness"
              name="cleanliness"
              value={filters.cleanliness}
              onChange={handleChange}
              className="form-control"
              min="1"
              max="10"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="facilities" className="form-label">Fasilitas (1-10)</label>
            <input
              type="number"
              id="facilities"
              name="facilities"
              value={filters.facilities}
              onChange={handleChange}
              className="form-control"
              min="1"
              max="10"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="security" className="form-label">Keamanan (1-10)</label>
            <input
              type="number"
              id="security"
              name="security"
              value={filters.security}
              onChange={handleChange}
              className="form-control"
              min="1"
              max="10"
            />
          </div>
          <button type="submit" className="btn btn-outline-success ms-4">Apply Filters</button>
        </form>
      </div>
    </div>
  );
};

export default Mabac;
