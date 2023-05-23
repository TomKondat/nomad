import React from "react";
import { useState, useEffect } from "react";

function LoadGeoLocation() {
  const [currLocationJs, setCurrLocationJs] = useState({});

  useEffect(() => {
    getLocationJs();
  }, []);

  const getLocationJs = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      setCurrLocationJs({ latitude, longitude });
    });
  };
}

export default LoadGeoLocation;
