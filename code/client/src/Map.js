import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import "./styles.css";

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Google />;

  function Google() {
    const center = useMemo(() => ({ lat: 31.5090643, lng: 34.597014 }), []);
    return (
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="map-container"
      >
        <MarkerF position={center} />
      </GoogleMap>
    );
  }
}
export default Map;
