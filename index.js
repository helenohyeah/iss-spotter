const { fetchMyIP, fetchCoordsByIp } = require('./iss.js');

fetchMyIP((err, ip) => {
  if (err) {
    console.log('Error: ', err);
    return;
  }
  console.log('IP: ', ip);
});

fetchCoordsByIp(('70.24.49.72', (err, data) => {
  console.log('err: ', err);
  console.log('data: ', data);
}))