const request = require('request');

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = (callback) => {

};

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
    // all good, data received
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
    // all good, data received
    const data = JSON.parse(body);
    const coords = { latitude: data['data']['latitude'], longitude: data['data']['longitude'] };
    callback(err, coords);
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords['latitude']}&lon=${coords['longitude']}`, (err, response, body) => {
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
    // all good, data received
    const data = JSON.parse(body);
    callback(err, data);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation };