const { nextISSTimesForMyLocation } = require('./iss.js');

nextISSTimesForMyLocation((err, passTimes) => {
  // error case
  if (err) {
    return console.log('Error: ', err);
  }
  // all good, no errors
  // loop through durations and rise times
  for (const time of passTimes['response']) {
    const date = new Date((time['risetime'] * 1000));
    console.log(`Next pass at ${date.toString()} for ${time['duration']} seconds!`);
  }
});