const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.use(express.static(publicDirectoryPath));

// various node view engines used pug, ejs, handlebars(Mustaches) 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Taranjit Kaur'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Taranjit Kaur'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Taranjit Kaur'
    }) 
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
            if (error) {
                return res.send({error})
            }
             forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return console.log(error)
                }
                 res.send({
                     forecast: forecastData,
                     location: location,
                     address: req.query.address
                 })
            })
        })
    }
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Taranjit Kaur',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Taranjit Kaur',
        errorMessage: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})