const request = require('request');
const mapquest_key = require('../config.js').mapquest_key;

var geocodeAddress = (address, callback) => {
  var encoded_address = encodeURIComponent(address);

  request({
    url: `https://www.mapquestapi.com/geocoding/v1/address?key=${mapquest_key}&location=${encoded_address}`,
    json: true
  }, (error, response, body) => {
    if(error){
      callback('Unable to connect to Mapquest servers.');
    }else if (!body || body.results[0].locations.length === 0){
      callback('Unable to find that address.');
    }else {
      callback(undefined, {
        address: body.results[0].providedLocation.location,
        longitude: body.results[0].locations[0].latLng.lng,
        latitude: body.results[0].locations[0].latLng.lat
      });
    }
  });
}

module.exports = {
  geocodeAddress
}