const yargs = require('yargs');
const axios = require('axios');
const mapquest_key = require('./config.js').mapquest_key;
const darksky_key = require('./config.js').darksky_key;

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe:'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encoded_address = encodeURIComponent(argv.address);
var geocode_url =`https://www.mapquestapi.com/geocoding/v1/address?key=${mapquest_key}&location=${encoded_address}`;

axios.get(geocode_url).then((response) => {
  if(!response.data.results || response.data.results[0].locations.length === 0) {
    throw new Error('Unable to find that address.');
  }
  var lng = response.data.results[0].locations[0].latLng.lng
  var lat = response.data.results[0].locations[0].latLng.lat
  var weather_url = `https://api.darksky.net/forecast/${darksky_key}/${lat},${lng}`;
  console.log(response.data.results[0].providedLocation.location);
  return axios.get(weather_url);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((error)=> {
  if(error.code === 'ENOTFOUND'){
    console.log('Unable to connect to API servers');
  } else {
    console.log(error.message);
  }
});