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
  // fetches the IP
  fetchMyIP((err, ip) => {
    if (err) return callback(err, null);
    
    // once we get IP, we fetch the coordinates
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) return callback(err, null);
      
      // once we have the coordinates we fetch fly over times
      fetchISSFlyOverTimes(coords, (err, data) => {
        if (err) return callback(err, null);
        
        // return the final data via callback
        return callback(err, data);
      });
    });
  });
};

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    
    // error if invalid domain, user is offline etc.
    if (err) callback(err, null);

    // error if code is not 200, assume server error
    if (response.statusCode !== 200) {
      const msg = (`Status Code: ${response.statusCode} when fetching IP. Response: ${body}`);
      callback(Error(msg), null);
      return;
    }

    // all good, data received
    const ip = JSON.parse(body)['ip'];
    return callback(err, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (err, response, body) => {
    
    // error if invalid domain, user is offline etc.
    if (err) callback(err, null);

    // error if code is not 200, assume server error
    if (response.statusCode !== 200) {
      const msg = (`Status Code: ${response.statusCode} when fetching coordinates. Response: ${body}`);
      callback(Error(msg), null);
      return;
    }
    
    // all good, data received
    const { latitude, longitude } = JSON.parse(body)['data'];
    return callback(err, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = ({ latitude, longitude }, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`, (err, response, body) => {
    
    // error if invalid domain, user is offline etc.
    if (err) callback(err, null);

    // error if code is not 200, assume server error
    if (response.statusCode !== 200) {
      const msg = (`Status Code: ${response.statusCode} when fetching fly over times. Response: ${body}`);
      callback(Error(msg), null);
      return;
    }

    // all good, data received
    const data = JSON.parse(body)['response'];
    return callback(err, data);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };