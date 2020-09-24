const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    // error if invalid domain, user is offline etc.
    if (err) {
      callback(err, null);
      return;
    }
    // error if code is not 200, assume server error
    if (response.statusCode !== 200) {
      const msg = (`Status Code: ${response.statusCode} when fetching IP. Response: ${body}`);
      callback(Error(msg), null);
      return;
    }
    // all good, data recieved
    const ip = JSON.parse(body);
    callback(err, ip);
  });
};

const fetchCoordsByIp = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (err, response, body) => {
    // error if invalid domain, user is offline etc.
    if (err) {
      callback(err, null);
      return;
    }
    // error if code is not 200, assume server error
    if (response.statusCode !== 200) {
      const msg = (`Status Code: ${response.statusCode} when fetching coordinates. Response: ${body}`);
      callback(Error(msg), null);
      return;
    }
    // all good, data recieved
    const data = JSON.parse(body);
    const coords = { latitude: data['data']['latitude'], longitude: data['data']['longitude'] };
    callback(err, coords);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIp };