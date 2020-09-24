const { nextISSTimesForMyLocation } = require('./iss.js');

/**
 * { message: 'success',
  request:
   { altitude: 100,
     datetime: 1600979137,
     latitude: 43.6655,
     longitude: -79.4378,
     passes: 5 },
  response:
   [ { duration: 575, risetime: 1600981559 },
     { duration: 655, risetime: 1600987308 },
     { duration: 620, risetime: 1600993160 },
     { duration: 617, risetime: 1600999017 },
     { duration: 654, risetime: 1601004835 } ] }
 */
nextISSTimesForMyLocation((err, passTimes) => {
  let results = [];
  if (err) {
    return console.log('Error: ', err);
  }



  console.log('index', passTimes);
});