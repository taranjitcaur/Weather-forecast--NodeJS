const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidGFyYW5qaXRjYXVyIiwiYSI6ImNrZnM2bzE1dzBrZHQycm53OXFnaGtyNWgifQ.d7l-6bxmu2GWGwumAYb_WQ'

    request({url, json: true }, (error, {body:resBody}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (resBody.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: resBody.features[0].center[1],
                longitude: resBody.features[0].center[0],
                location: resBody.features[0].place_name
            })
        }
    })
}

module.exports = geocode