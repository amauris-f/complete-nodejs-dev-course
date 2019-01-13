const request = require('request');
const mapquest_key = require('./config.js').mapquest_key;
const yargs = require('yargs');

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

console.log(argv);

var encoded_address = encodeURIComponent(argv.address);

request({
  url: `https://www.mapquestapi.com/geocoding/v1/address?key=${mapquest_key}&location=${encoded_address}`,
  json: true
}, (error, response, body) => {
  console.log(JSON.stringify(response, undefined, 2));
  if(error){
    console.log('Unable to connect to Mapquest servers.');
  }else if (!body || body.results[0].locations.length === 0){
    console.log("Unable to find that address");
  }else {
    console.log(`Address: ${body.results[0].locations[0].latLng.lng}`);
    console.log(`Address: ${body.results[0].locations[0].latLng.lat}`);
  }
});