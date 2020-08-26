const path = require('path');
const fetch = require('node-fetch');

// Express to run server and routes
const express = require('express');

// Environment variables
const dotenv = require('dotenv');
dotenv.config();

// Start up an istance of an app
const app = express();

// Dependencies 
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

console.log(__dirname);

// GET route
app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
    // res.sendFile(path.resolve('src/client/views/index.html'))
});

// Port
app.listen(8081, function () {
    console.log('App listening on port 8081!');
});

// Geoname API - latitude and longitude coordinates
app.get('/getCoordinates', async (req, res) => {
    console.log('Get input data: ', req.query.location);
    let location = req.query.location;
    const user = process.env.GEONAME_USER;
    let geoname = await getCoordinates(location, user);
    if (!geoname.lenght == 1) {
        res.send({'lat': geoname[0], 'long': geoname[1]});
    } else {
        res.send({'lat': geoname[0], 'long': geoname[0]});
    }
});

async function getCoordinates(location, user) {
    let response = await fetch (`http://api.geonames.org/wikipediaSearchJSON?q=${location}&maxRows=1&username=${user}`);
    try {
        let answer = await response.json();
        let latitude = answer.geonames['0'].lat;
        let longitude = answer.geonames['0'].lng;
        return [latitude, longitude];
    } catch(error) {
        console.log('This is an error', error);
    }
} 
  
// Weatherbit API - information about the weather 
app.get('/getWeather', async (req, res) => {
    const weatherKey = process.env.WEATHERBIT_KEY;
    let weather = await getWeather(req.query.lat, req.query.long, req.query.Diff, weatherKey);
    if (weather.lenght == 2) {
        console.log({'description': weather[0], 'temp': weather[1]});
        res.send({'description': weather[0], 'temp': weather[1]});
    } else {
        console.log({'description': weather[0], 'temp': weather[0]});
        res.send({'description': weather[0], 'temp': weather[0]});
    }
});

async function getWeather(lat, long, lengthOfTrip, weatherKey) {
    let weatherUrl = 'https://api.weatherbit.io/v2.0/';
    try {
        if (lengthOfTrip < 7) {
            let currentWeather = await fetch(`${weatherUrl}current?key=${weatherKey}&lon=${long}&lat=${lat}`);
            let weatherCondition = await currentWeather.json();
            let description = weatherCondition.data[0].weather.description;
            let temperature = weatherCondition.data[0].temp;
            return [description, temperature];
        } else {
            let currentWeather= await fetch(`${weatherUrl}forecast/daily?key=${weatherKey}&lon=${long}&lat=${lat}`);
            let weatherCondition = await currentWeather.json();
            let description = weatherCondition.data[0].description;
            let temperature = weatherCondition.data[0].temp;
            return [description, temperature];
        }      
    } catch(error) {
        console.log('This is an error',error);
    } 
}
  
// Pixabay API - destination image
app.get('/getPictures', async (req, res) => {
    console.log('Get input data: ', req.query.location);
    const pixabayKey = process.env.PIXABAY_KEY;
    let pictures = await getPictures(req.query.location, pixabayKey);
    res.send(pictures);
});

async function getPictures(location, pixabayKey) {
    let response = await fetch (`https://pixabay.com/api/?key=${pixabayKey}&q=${location}&image_type=photo`) ;
    let answer = await response.json();
    try {
        answer.hits[0].largeImageURL;
        return { "image": answer.hits[1].largeImageURL};
    } catch (error) {
        console.log('This is an error', error);
    }
}

module.exports = { 
    'getCoordinates': getCoordinates,
    'getWeather': getWeather,
    'getPictures': getPictures
};
