const request = require('request');
const mapquest_key = require('./config.js').mapquest_key;

request({
  url: `https://www.mapquestapi.com/geocoding/v1/address?key=${mapquest_key}&location=1301%20lombard%20street%20philadelphia`,
  json: true
}, (error, response, body) => {
  console.log(body);
});