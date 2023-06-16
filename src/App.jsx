import React, { useState } from "react";
import haversine from "haversine";
import Geocode from "react-geocode";
import "./style.css";

function App() {
  const [startLocation, setStartLocation] = useState({
    latitude: 0,
    longitude: 0
  });
  const [finalDestination, setFinalDestination] = useState({
    latitude: 0,
    longitude: 0
  });

  Geocode.setApiKey("AIzaSyCUxfBy-i0-ZxzGZKOOU_vJjtETNKwS1fk");

  const handleStartLocationChange = (event) => {
    const { value } = event.target;
    Geocode.fromAddress(value).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setStartLocation({ latitude: lat, longitude: lng });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const handleFinalDestinationChange = (event) => {
    const { value } = event.target;
    Geocode.fromAddress(value).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setFinalDestination({ latitude: lat, longitude: lng });
      },
      (error) => {
        console.error(error);
      }
    );
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
        placeholder="Input A (Latitude, longitude)"
        onChange={handleStartLocationChange}
      />
      <input
        type="text"
        placeholder="Input B (Latitude, longitude)"
        onChange={handleFinalDestinationChange}
      />
      <button onClick={calculateDistance}>Calculate Distance</button>
    </div>
  );
}

export default App;
