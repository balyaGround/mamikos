const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); 
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST'], // Allowed methods
  }));
  
// Update the path to datakos.json
const dataFilePath = path.join(__dirname, 'database', 'datakos.json');
// Weights for MABAC calculation
const weights = {
    rent_price: 0.25,
    distance_from_campus: 0.2,
    cleanliness: 0.15,
    facilities: 0.2,
    security: 0.2
  };
  
  // Normalization ranges (based on dummy data)
  const normalizationRanges = {
    rent_price: { min: 2400000, max: 6000000 },
    distance_from_campus: { min: 0.5, max: 5 },
    cleanliness: { min: 6, max: 10 },
    facilities: { min: 7, max: 10 },
    security: { min: 6, max: 10 }
  };
  
  // Function to normalize a value
  function normalize(value, range) {
    return (value - range.min) / (range.max - range.min);
  }
  
  // Function to calculate weighted score using MABAC
  function calculateMABACScore(rental) {
    const normalizedRentPrice = normalize(rental.rent_price, normalizationRanges.rent_price);
    const normalizedDistance = normalize(rental.distance_from_campus, normalizationRanges.distance_from_campus);
    const normalizedCleanliness = normalize(rental.cleanliness, normalizationRanges.cleanliness);
    const normalizedFacilities = normalize(rental.facilities, normalizationRanges.facilities);
    const normalizedSecurity = normalize(rental.security, normalizationRanges.security);
  
    return (
      normalizedRentPrice * weights.rent_price +
      normalizedDistance * weights.distance_from_campus +
      normalizedCleanliness * weights.cleanliness +
      normalizedFacilities * weights.facilities +
      normalizedSecurity * weights.security
    );
  }
  
// Endpoint to get all rental data
app.get('/api/rentals', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }
        res.send(JSON.parse(data));
    });
});

// MABAC endpoint to filter and rank rentals
app.post('/api/mabac', (req, res) => {
    const preferences = req.body;
  
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).send('Error reading file');
      }
  
      const rentals = JSON.parse(data);
  
      // Filter rentals based on user input
      const filteredRentals = rentals.filter((rental) => {
        return (
          rental.rent_price <= preferences.rent_price &&
          rental.distance_from_campus <= preferences.distance_from_campus &&
          rental.cleanliness >= preferences.cleanliness &&
          rental.facilities >= preferences.facilities &&
          rental.security >= preferences.security
        );
      });
  
      // Calculate the MABAC score for each rental
      const scoredRentals = filteredRentals.map(rental => ({
        ...rental,
        mabacScore: calculateMABACScore(rental)
      }));
  
      // Sort rentals by the MABAC score in descending order (higher is better)
      scoredRentals.sort((a, b) => b.mabacScore - a.mabacScore);
  
      res.send(scoredRentals);
    });
  });
  

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
