var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  var crd;
  var test_latitude;
  var test_longitude;

  var collect_lat

  function ReternLat(lat){
    collect_lat = lat;
    console.log("ReternLat -> collect_lat = "+collect_lat);
    return collect_lat;
  }
  
  function success(pos) {
    crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    ReternLat(crd.latitude);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);
  console.log("crd = "+crd)
  console.log("collect_lat = "+collect_lat)
  console.log("navigator~~ = "+navigator)
  console.log("--fin--")

  export default crd
