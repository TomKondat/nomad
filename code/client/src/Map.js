import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import "./NomadLogo.css";

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCSG8dtnlKzB8JprbHIMtIUUZAL6F4X2Yc",
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Google />;

  function Google() {
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
    return (
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
        <MarkerF position={center} />
      </GoogleMap>
    );
  }
}
export default Map;
