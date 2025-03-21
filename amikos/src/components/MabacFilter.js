import React, { useState } from "react";
import '../styles/Mabac.css'
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
        {[
          { name: "rent_price", label: "Max Rent Price" },
          { name: "distance_from_campus", label: "Max Distance" },
          { name: "cleanliness", label: "Min Cleanliness" },
          { name: "facilities", label: "Min Facilities" },
          { name: "security", label: "Min Security" },
        ].map((field) => (
          <div className="input-group" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type="number"
              id={field.name}
              name={field.name}
              value={filters[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Apply MABAC</button>
      </form>
    </div>
  );
};

export default Mabac;
