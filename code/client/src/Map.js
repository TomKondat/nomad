import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import "./styles.css";
import Geocode from "react-geocode";

function Map(props) {
  const { address } = props;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const [coordinates, setCoordinates] = useState({
    lat: 31.5090643,
    lng: 34.597014,
  });

  useEffect(() => {
    LoadGeocoding(address);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  async function LoadGeocoding(address) {
    Geocode.setApiKey("AIzaSyCSG8dtnlKzB8JprbHIMtIUUZAL6F4X2Yc");
    Geocode.setLanguage("en");
    Geocode.setRegion("il");

    const response = await Geocode.fromAddress(address);
    const { lat, lng } = response.results[0].geometry.location;
    setCoordinates({ lat: lat, lng: lng });
  }

  return (
    <GoogleMap
      zoom={13}
      center={coordinates}
      mapContainerClassName="map-container"
    >
      <MarkerF position={coordinates} />
    </GoogleMap>
  );
}

export default Map;
