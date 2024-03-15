export function getCoordinates(address) {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: address }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          // Resolve with the location object containing latitude and longitude
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          resolve({ lat, lng });
        } else {
          console.error("No results found");
          // Resolve with null if no results are found
          resolve(null);
        }
      } else {
        console.error("Geocoder failed due to: " + status);
        // Resolve with null if geocoding fails
        resolve(null);
      }
    });
  });
}
