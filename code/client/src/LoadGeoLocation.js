export async function LoadGeoLocation() {
  let coords = navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    return { lat: latitude, lng: longitude };
  });
  return coords;
}
