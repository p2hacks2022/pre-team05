const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

const getLatLong = (socket) => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      let crd = pos.coords;

      /*
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      */
      let Long = crd.latitude;
      let Lat = crd.longitude;
      /*
      console.log("Long = " + Long);
      console.log("Lat = " + Lat);
      */
      console.log('Push!')
      socket.emit('position', Lat, Long)
    },
    (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }, options)
}


export default getLatLong
