const { nextISSTimesForMyLocation } = require('./iss-promised');

nextISSTimesForMyLocation()
  .then(data => {
    console.log(data);
  });