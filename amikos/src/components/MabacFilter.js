import React, { useState } from "react";
import "../styles/Mabac.css";

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
    onApplyFilters(filters);
  };

  return (
    <div className="mabac-filter-container">
      <h2 className="text-success">MABAC Filter</h2>
      <form className="mabac-filter" onSubmit={handleSubmit}>
        {[
          { name: "rent_price", label: "Max Rent Price" },
          { name: "distance_from_campus", label: "Max Distance (km)" },
          { name: "cleanliness", label: "Min Cleanliness (1-5)" },
          { name: "facilities", label: "Min Facilities Count" },
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

        {/* Security: Satpam atau Tidak */}
        <div className="input-group">
          <label htmlFor="security">Keamanan</label>
          <select id="security" name="security" value={filters.security} onChange={handleChange}>
            <option value="">Semua</option>
            <option value="true">Ada Satpam</option>
            <option value="false">Tidak Ada Satpam</option>
          </select>
        </div>

        <button type="submit">Apply MABAC</button>
      </form>
    </div>
  );
};

export default Mabac;
