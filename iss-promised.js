const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body)['ip']
  return request(`https://ipvigilante.com/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const data = JSON.parse(body);
  const coords = { latitude: data['data']['latitude'], longitude: data['data']['longitude'] };
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords['latitude']}&lon=${coords['longitude']}`);
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes }