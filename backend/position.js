const r = 6378.137;//赤道半径

module.exports = (lng1, lat1, lng2, lat2) => {
  let d, phai; //dが距離, phaiが方位角

  d = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1));
  phai = 90 - Math.atan(Math.sin(lng2 - lng1) / (Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(lng2 - lng1)));
  phai = isNaN(phai) ? 0 : phai

  return [d, phai]
}
