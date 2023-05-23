import React, { useEffect } from "react";
import { useState } from "react";

function LoadGeoLocation() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, []);

  return <div></div>;
}
