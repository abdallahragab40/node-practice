const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = "http://localhost:3000/all";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        "It is currently " +
          body.currently.temperature +
          " degrees out. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
