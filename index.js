const { nextISSTimesForMyLocation } = require('./iss.js');

/**
{ duration: 655, risetime: 1600987308 }
{ duration: 620, risetime: 1600993160 }
{ duration: 617, risetime: 1600999017 }
{ duration: 654, risetime: 1601004835 }
{ duration: 593, risetime: 1601010659 }
 */
nextISSTimesForMyLocation((err, passTimes) => {
  // error case
  if (err) {
    return console.log('Error: ', err);
  }
  // all good, no errors
  // loop through durations and rise times
  for (const time of passTimes['response']) {
    const date = new Date(time['risetime'] * 1000);
    // console.log(date.toString());
    // console.log(date.toLocaleDateString());
    // times.push(`Next pass at ${}`)
    console.log(`Next pass at ${date.toString()} for ${time['duration']} seconds!`);
  }
});