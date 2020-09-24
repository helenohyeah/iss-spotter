const { fetchMyIP } = require('./iss.js');

fetchMyIP((err, ip) => {
  if(err) {
    console.log('Error: ', err);
    return;
  }
  console.log('IP: ', ip);
});