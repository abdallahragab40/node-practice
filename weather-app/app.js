const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];

if (!address) {
  console.log("Please enter a location!");
} else {
  geocode(address, (error, { latitude, longitute, location }) => {
    if (error) {
      return console.log(error);
    }
    forecast(latitude, longitute, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log("Location : ", location);
      console.log("Forecast : ", forecastData);
    });
  });
}
