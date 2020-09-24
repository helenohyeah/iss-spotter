const { nextISSTimesForMyLocation } = require('./iss-promised');

const printTimes = (passTimes) => {
  for (const time of passTimes) {
    const date = new Date(time['risetime'] * 1000);
    console.log(`Next pass at ${date.toString()} for ${time['duration']} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then(passTimes => {
    printTimes(passTimes);
  })
  .catch(err => {
    console.log(`Error: ${err.message}`);
  });