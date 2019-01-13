const request = require('request');
const darksky_key = require('../config.js').darksky_key;

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${darksky_key}/${lat},${lng}`,
    json: true
    }, (error, response, body)=> {
    if(!error && response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather');
    }
  });
};

module.exports = {
  getWeather
}