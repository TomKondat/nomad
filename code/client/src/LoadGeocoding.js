import Geocode from "react-geocode";
export async function LoadGeocoding(address) {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setRegion("il");

  const response = await Geocode.fromAddress(address);
  const { lat, lng } = response.results[0].geometry.location;

  //GEOLOCATION
  return new Promise((resolve, reject) => {
    //GEOLOCATION
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const lat1 = latitude; // Latitude of current location
      const lon1 = longitude; // Longitude of current location
      const distance = calculateDistance(lat, lng, lat1, lon1);

      resolve(distance);
    }, reject);
  });
}

// Function to calculate the distance between two sets of coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}
function deg2rad(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}
