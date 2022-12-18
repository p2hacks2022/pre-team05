const r = 6378.137;//赤道半径

const getRad = (x) => {
  return (x) * (Math.PI / 180)
}

const getDeg = (x) => {
  return (Math.PI / 180) * (x)
}

const getDistance = (lng1, lat1, lng2, lat2) => {
  // from https://hamasyou.com/blog/2010/09/07/post-2/
  let distance = 0;
  let precision = 7
  if ((Math.abs(lat1 - lat2) < 0.00001) && (Math.abs(lng1 - lng2) < 0.00001)) {
    distance = 0;
  } else {
    let A = 6378140;
    let B = 6356755;
    let F = (A - B) / A;

    let P1 = Math.atan((B / A) * Math.tan(lat1));
    let P2 = Math.atan((B / A) * Math.tan(lat2));

    let X = Math.acos(Math.sin(P1) * Math.sin(P2) + Math.cos(P1) * Math.cos(P2) * Math.cos(lng1 - lng2));
    let L = (F / 8) * ((Math.sin(X) - X) * Math.pow((Math.sin(P1) + Math.sin(P2)), 2) / Math.pow(Math.cos(X / 2), 2) - (Math.sin(X) - X) * Math.pow(Math.sin(P1) - Math.sin(P2), 2) / Math.pow(Math.sin(X), 2));

    distance = A * (X + L);
    let decimal_no = Math.pow(10, precision);
    distance = Math.round(decimal_no * distance / 1) / decimal_no;   // kmに変換するときは(1000で割る)
  }
  return distance;
}

const getDirection = (lng1, lat1, lng2, lat2) => {
  // from https://hamasyou.com/blog/2010/09/07/post-2/
  let Y = Math.cos(lng2) * Math.sin(lat2 - lat1);
  let X = Math.cos(lng1) * Math.sin(lng2) - Math.sin(lng1) * Math.cos(lng2) * Math.cos(lat2 - lat1);
  let dirE0 = getDeg(Math.atan2(Y, X));
  if (dirE0 < 0) {
    dirE0 = dirE0 + 360;
  }
  let dirN0 = (dirE0 + 90) % 360;
  return dirN0;
}

module.exports = (lng1, lat1, lng2, lat2) => {
  let d, phai; //dが距離, phaiが方位角
  lng1 = getRad(lng1)
  lat1 = getRad(lat1)
  lng2 = getRad(lng2)
  lat2 = getRad(lat2)

  // d = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1));
  // phai = 90 - Math.atan2(Math.sin(lng2 - lng1), (Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(lng2 - lng1)));
  // phai = isNaN(phai) ? 0 : phai

  d = getDistance(lng1, lat1, lng2, lat2)
  phai = getDirection(lng1, lat1, lng2, lat2)

  return [d, phai]
}
