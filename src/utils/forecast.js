const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=41cd945787bc81e4f28542caa51cc7c1&query='+latitude+','+longitude;

    request({url}, (error, response) => {
        var appResponse = JSON.parse(response.body)
        console.log(appResponse);
        var {error:appError} = appResponse;
        var {temperature, precip} = appResponse.current;
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (appError) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, ' It is currently ' + temperature + ' degress out. There is a ' + precip + '% chance of rain.')

           // callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast;