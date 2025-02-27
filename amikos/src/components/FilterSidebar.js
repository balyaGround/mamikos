import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/FilterSidebar.css';

const FilterSidebar = ({ onApply }) => {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([100, 1000]);
  const [facilities, setFacilities] = useState({
    wifi: false,
    parking: false,
    gym: false,
  });

  const handleApply = () => {
    const filters = {
      location,
      priceRange,
      facilities
    };
    onApply(filters);
  };

  return (
    <div className="p-3 bg-light border">
      <h5>Filter by</h5>
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price Range</Form.Label>
        <Form.Range
          min="100"
          max="5000"
          value={priceRange}
          onChange={(e) => setPriceRange([100, e.target.value])}
        />
        <p>${priceRange[0]} - ${priceRange[1]}</p>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Facilities</Form.Label>
        <Form.Check
          type="checkbox"
          label="WiFi"
          checked={facilities.wifi}
          onChange={() => setFacilities({ ...facilities, wifi: !facilities.wifi })}
        />
        <Form.Check
          type="checkbox"
          label="Parking"
          checked={facilities.parking}
          onChange={() => setFacilities({ ...facilities, parking: !facilities.parking })}
        />
        <Form.Check
          type="checkbox"
          label="Gym"
          checked={facilities.gym}
          onChange={() => setFacilities({ ...facilities, gym: !facilities.gym })}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleApply}>
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
