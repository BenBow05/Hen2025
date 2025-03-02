import React, { useEffect, useRef, useState } from "react";
import "../styles/report.css"
import '../styles/report.css';
const AddressAutocomplete = ({ onSelect }) => {
  const inputRef = useRef(null);
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!window.google || !window.google.maps) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"],
      componentRestrictions: { country: "us" }
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        setAddress(place.formatted_address);
        onSelect(place);
      }
    });

    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Error getting location:", error);
        setUserLocation({ lat: 37.7749, lng: -122.4194 });
      }
    );
  }, []);

  
  const initializeMap = () => {
    if (!mapRef.current || !userLocation) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 15,
    });

    const marker = new window.google.maps.Marker({
      position: userLocation,
      map,
      draggable: true,
    });

    markerRef.current = marker;

    map.addListener("click", (event) => {
      const clickedLocation = event.latLng;
      marker.setPosition(clickedLocation);
    });
  };

  useEffect(() => {
    if (showMap && userLocation) {
      initializeMap();
    }
  }, [showMap, userLocation]);

  const confirmLocation = () => {
    if (markerRef.current) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: markerRef.current.getPosition() }, (results, status) => {
        if (status === "OK" && results[0]) {
          setAddress(results[0].formatted_address);
          onSelect(results[0]);
          setShowMap(false);
        }
      });
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <input
        ref={inputRef}
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your address"
        style={{ flex: 1, padding: "10px", fontSize: "16px" }}
      />
      <button onClick={() => setShowMap(true)} style={{ padding: "10px", cursor: "pointer" }}>
        📍 Pick on Map
      </button>

      {showMap && userLocation && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "80%",
              height: "80%",
              background: "#fff",
              padding: "20px",
              position: "relative",
              borderRadius: "10px",
            }}
          >
            <h3>Pick a location</h3>
            <div
              ref={mapRef}
              style={{ width: "100%", height: "60vh", borderRadius: "8px" }}
            ></div>
            <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setShowMap(false)} style={{ padding: "10px" }}>Cancel</button>
              <button onClick={confirmLocation} style={{ padding: "10px" }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;
