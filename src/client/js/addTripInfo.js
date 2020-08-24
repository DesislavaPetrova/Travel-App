async function addTripInfo() {
    let travelDate = document.getElementById("date_start").value;
    let date = new Date();
    if (Number(date.getMonth() + 1) < 10) {
        var month = "0" + String(Number(date.getMonth() + 1));
    } else {
        var month = date.getMonth() + 1; 
    }
    let today = date.getFullYear() + '-' + month + '-' + date.getDate();
    const time = new Date(today);

    // Lenght of the trip
    const start = new Date(travelDate);
    const end = new Date(document.getElementById("date_end").value);
    const lenght = end.getTime() - start.getTime();
    let lenghtOfTrip = lenght / (1000 * 60 * 60 * 24);

    // Time to the trip
    let timeToTrip = start.getTime() - time.getTime(); 
    let days = timeToTrip / (1000 * 60 * 60 * 24);
    if (days < 0 || countries[document.getElementById("countries").selectedIndex] == "Select a country") {
        if (days < 0) {
            document.getElementById('error').textContent="Travel date has passed.";
            document.getElementById('error').style.display = "block";
        } else {
            document.getElementById('error').textContent = "Please select a country.";
            document.getElementById('error').style.display = "block";
        }
    } else {
        // Location - latitude and longitude coordinates
        let location = await fetch (`http://localhost:8081/getCoordinates?location=${document.getElementById("destination").value}`);
        let destinationCoordinates = await location.json();
        console.log("locationCoordinates: ", locationCoordinates);

        if (destinationCoordinates.lat == 'This is an error'){
            document.getElementById('error').textContent = "Please check if the destination is correct";
            document.getElementById('error').style.display = "block";
        } else {
            document.getElementById('error').style.display = "none";

            // Weather forecast
            let weatherCondition = await fetch(`http://localhost:8081/getWeather?long=${destinationCoordinates.long}&lat=${destinationCoordinates.lat}&Diff=${days}`);
            weatherCondition = await weatherCondition.json();
            let forecast = weatherCondition.description;
            let temperature = weatherCondition.temp;
            console.log("forecast: ", forecast, "temperature: " , temperature);
            if (temperature == 'This is an error') {
                document.getElementById('error').textContent = "Please check if the destination is correct";
                document.getElementById('error').style.display = "block";
            } else {
                let destination = document.getElementById("destination").value[0].toUpperCase() + document.getElementById("destination").value.slice(1).toLowerCase();

                // Destination picture
                let locationImage = await fetch(`http://localhost:8081/getPictures?location=${document.getElementById("destination").value}`);
                console.log(locationImage);
                let image = await locationImage.json();
                image = image.image;
                console.log('image: ', image);
                
                // Add HTML elements to the DOM
                let addHTML = `
                <section class="trips">
                    <div>
                        <img src="${image}" alt="Image of ${destination}">
                        <figcaption>A view of ${destination}.</figcaption>
                    </div>
                    <div class="trips_information">
                        <h4 class="trips_title">My travel to: ${destination}, ${countries[document.getElementById("countries").selectedIndex]}</h4> 
                        <p>The star date of the trip is: ${document.getElementById("date_start").value}</p>
                        <p>The end date of the trip is: ${document.getElementById("date_end").value}</p>
                        <p>The lenght of the trip is ${lenghtOfTrip} days</p>
                        <p>The trip to ${destination} is ${days > 0? "in" + days + "days": "Today"}</p> 
                        <p>The weather condition is: ${forecast} at ${temperature}&degC</p>
                        <button class="delete_trip" onclick='Client.deleteTripInfo(this)'>Delete</button>
                    </div> 
                </section>`;
                
                let trip = document.querySelector('.trip');
                trip.innerHTML = addHTML + trip.innerHTML;
                document.getElementById("countries").value = countries[0];
                document.getElementById("destination").value = '';

                // Update local storage
                if (String(localStorage.trip) == "undefined"){
                    localStorage.trip = `${addHTML}`;
                } else {
                    localStorage.trip = `${addHTML}${localStorage.trip}`;
                }
                console.log(localStorage.trip);
            }
        }
    }
}

export { addTripInfo };