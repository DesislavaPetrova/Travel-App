# Travello - Travel App

## Udacity Front end Nanodegree: Project 5 - Capstone

## HTML5, CSS3, JavaScript, Build tool: Webpack

## Overview
This project is about using webapack, node.js, express.js to build a travel app that allows users to find relevant information about their trip duration, location and weather information.

## Project
The project can be run in both development mode and in production mode.

- Install all node packages from `package.json`:

` $ npm install`

- Start server at port 8081:

` $ npm run start`

This enables us to do a post route to the API.

- Run in development mode:

` $ npm run build-dev`

This first command will start the webpack dev server at port 8080. 

- Run in production mode:

` $ npm run build-prod`

The first command generates the dist files. 

- Configurations:

The project contains a `package.json` file, two webpack config files `webpack.config.dev.js` and `webpack.config.prod.js` for development and production mode.

- Content:
The project has only one html file located in the `src/views/` folder. The html file is styled using sass. The files are located in the `src/client/styles ` folder.

- API:
The travel app gets information from 3 APIs:
From Geoname come the latitude and longitude of the travel location. From Weatherbit comes the the weather forcast for the trip and from Pixabay comes the picture of the travel location.


- Offline Functionality:
The project have service workers set up in webpack. 

- Testing with Jest:

 `npm run test`

- Interactions:
The travel application that is built takes the user's travel destination, travel start and end date from a calendar as an input. When pressing the Save button the user gets a projected weather forecast for the travel date and summary
about with all trip details like lenght of the trip, time to the trip, weather forecast and a picture of the destination. The user is able to add multiple destination/trip cards and also is able to remove them.
