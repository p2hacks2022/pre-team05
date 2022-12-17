const r = 6378.137;//赤道半径

export default function(x1, y1, x2, y2) {
  let d, phai; //dが距離, phaiが方位角

  d = r * Math.acos(Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1));
  phai = 90 - Math.atan(Math.sin(x1 - x2) / (Math.cos(y1) * Math.tan(y2) - Math.sin(y1) * Math.cos(x2 - x1)));

  return d, phai
}
