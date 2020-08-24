function deleteTripInfo (element) {
    let trips = document.querySelector('.journey');
    let journeys = trips.childNodes;
    console.log(journeys);
    let current = (element.parentElement);
    let currentIndex = 0;
    let remainingJourneys = '';
    for (let journey of journeys) {
        if (journey.nodeName == "#text") {
            journey.parentElement.removeChild(journey);
        }
    }
    console.log("journey lenght: ", journeys);
    for (let i = 1; i < journeys.length; i += 2) {
        console.log (i + ": ", journeys[i]);
        if (current.textContent == journeys[i].textContent) {
            currentIndex = i;
            journeys[i].setAttribute('class', 'travel_1');
            journeys[i-1].setAttribute('class', 'travel_2');

        } else {
            remainingJourneys += `<div class="trips>${String(journeys[i-1].innerHTML)}</div>`;
            remainingJourneys += `<div class="information">${String(journeys[i].innerHTML)}</div>`;
        }
    }
    
    // Delete trip entries
    let selectedElement = document.querySelector(`.travel_1`);
    selectedElement.style.display = "none";
    selectedElement.parentElement.removeChild(selectedElement);
    let selectedElement2 = document.querySelector(`.travel_2`);
    selectedElement2.style.display = "none";
    selectedElement2.parentElement.removeChild(selectedElement2);

    // Update local storage
    localStorage.trips = remainingJourneys;
}

export { deleteTripInfo };