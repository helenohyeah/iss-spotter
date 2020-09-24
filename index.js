const { nextISSTimesForMyLocation } = require('./iss.js');

const printTimes = (passTimes) => {
  for (const time of passTimes) {
    const date = new Date(time['risetime'] * 1000);
    console.log(`Next pass at ${date.toString()} for ${time['duration']} seconds!`);
  }
};

nextISSTimesForMyLocation((err, passTimes) => {
  
  // error case
  if (err) {
    return console.log('Error: ', err);
  }

  // all good, no errors
  // loop through durations and rise times
  printTimes(passTimes);
});