import React, { useState } from "react";

const Mabac = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    rent_price: "",
    distance_from_campus: "",
    cleanliness: "",
    facilities: "",
    security: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(filters); // Send filters to MainApp
  };

  return (
    <div className="mabac-filter-container">
      <h2 className="text-success">MABAC Filter</h2>
      <form className="mabac-filter" onSubmit={handleSubmit}>
        <input
          type="number"
          name="rent_price"
          placeholder="Max Rent Price"
          value={filters.rent_price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="distance_from_campus"
          placeholder="Max Distance"
          value={filters.distance_from_campus}
          onChange={handleChange}
        />
        <input
          type="number"
          name="cleanliness"
          placeholder="Min Cleanliness"
          value={filters.cleanliness}
          onChange={handleChange}
        />
        <input
          type="number"
          name="facilities"
          placeholder="Min Facilities"
          value={filters.facilities}
          onChange={handleChange}
        />
        <input
          type="number"
          name="security"
          placeholder="Min Security"
          value={filters.security}
          onChange={handleChange}
        />
        <button type="submit">Apply MABAC</button>
      </form>
    </div>
  );
};

export default Mabac;
