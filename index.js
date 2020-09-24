const { nextISSTimesForMyLocation } = require('./iss.js');

nextISSTimesForMyLocation((err, passTimes) => {
  if (err) {
    return console.log('Error: ', err);
  }
  console.log(passTimes);
});