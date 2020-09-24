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
    // all good
    const ip = JSON.parse(body);
    callback(err, ip);
  });
};

module.exports = { fetchMyIP };