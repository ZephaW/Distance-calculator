import React, { useState } from "react";
import "./style.css";

function haversine(coord1, coord2) {
  
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const earthRadiusKm = 6371;

  const dLat = toRadians(coord2.latitude - coord1.latitude);
  const dLon = toRadians(coord2.longitude - coord1.longitude);

  const lat1 = toRadians(coord1.latitude);
  const lat2 = toRadians(coord2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;
  return distance;
}

function App() {
  const [startLocation, setStartLocation] = useState({
    latitude: 0,
    longitude: 0
  });
  const [finalDestination, setFinalDestination] = useState({
    latitude: 0,
    longitude: 0
  });

  const handleStartLocationChange = async (event) => {
    const { value } = event.target;
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${value}&apiKey=3a628d5e95704fd8917c5dc38abde281`
    );
    const data = await response.json();
    const { lat, lon } = data.features[0].geometry;
    setStartLocation({
      latitude: parseFloat(lat),
      longitude: parseFloat(lon)
    });
  };

  const handleFinalDestinationChange = async (event) => {
    const { value } = event.target;
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${value}&apiKey=3a628d5e95704fd8917c5dc38abde281`
    );
    const data = await response.json();
    const { lat, lon } = data.features[0].geometry;
    setFinalDestination({
      latitude: parseFloat(lat),
      longitude: parseFloat(lon)
    });
  };

  const calculateDistance = () => {
    const { latitude: lat1, longitude: lon1 } = startLocation;
    const { latitude: lat2, longitude: lon2 } = finalDestination;
    const distance = haversine(
      { latitude: lat1, longitude: lon1 },
      { latitude: lat2, longitude: lon2 }
    );
    alert(`The distance: ${distance.toFixed(2)} km.`);
  };

  return (
    <div>
      <h1>DISTANCE CALCULATOR</h1>
      <input
        type="text"
        placeholder="Input A (Latitude, Longitude)"
        onChange={handleStartLocationChange}
      />
      <input
        type="text"
        placeholder="Input B (Latitude, Longitude)"
        onChange={handleFinalDestinationChange}
      />
      <button onClick={calculateDistance}>Calculate</button>
    </div>
  );
}

export default App;
