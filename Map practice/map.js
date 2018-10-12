/********************************************************
* init() function initializes the map element using Google Maps API,
 sets up the map click action and then tries to load markers from the localStorage.
* addPlace() handles the map click — then adds new place to the list and invokes marker rendering.
* renderMarkers() iterates through the places in the array and after clearing the map, puts the markers on it.

************************************************************/ 


let googleMap;
let myPlaces = [];

function init(){
    googleMap = new google.maps.Map(document.getElementById('map'),{
        center:{lat:0, lng:0},
        zoom:3
    });

    googleMap.markerList = [];
    googleMap.addListener('click', addPlace);

    const placesFromLocalStorage = JSON.parse(localStorage.getItem('myPlaces'));
    if(Array.isArray(placesFromLocalStorage)){
        myPlaces = placesFromLocalStorage;          //if something was found in the local
        renderMarkers();                            //storage, set it as a curren place list

    }
}

function addPlace(event){
    myPlaces.push({
        position: event.latLNG
    });

    localStorage.setItem('myPlaces', JSON.stringify(myPlaces)); //after marker is added, render it
    renderMarkers();                                            //and synchronize local storage

}

function renderMarkers(){
    googleMap.markerList.forEach(m => m.setMap(null)); //remove all markers
    googleMap.markerList = [];

    myPlaces.forEach((place) => {
        const marker = new google.maps.Marker({
            position: place.position,
            map: googleMap
        });

        googleMap.markerList.push(marker);
    });
}

init();