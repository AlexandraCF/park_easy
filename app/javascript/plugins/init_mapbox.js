import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { displayButtonGo } from '../components/bottombar';
// Initialize the geolocate control.
// var geolocate = new mapboxgl.GeolocateControl({
//   positionOptions: {
//     enableHighAccuracy: true
//   },
//   trackUserLocation: true
// });
// // Add the control to the map.
// map.addControl(geolocate);
// map.on('load', function() {
//   geolocate.trigger();
// });

const buildMap = (mapElement) => {
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  return new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    //center: [2.3820137, 48.8654838],
    zoom: 16
  });
};

const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {
    // Marker Info
    // const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
    if (marker.available_spaces >= 4 && marker.available_spaces <= 8) {
      const element = document.createElement('pin');
        element.className = 'marker';
        element.style.backgroundImage = `url('${marker.image_url}')`;
        element.style.backgroundSize = 'cover';
        element.style.width = '35px';
        element.style.height = '47px';
        element.innerText = `${marker.available_spaces}`;
        element.style.textAlign = "center";
        element.style.verticalAlign = "baseline";
        element.style.color = 'white';
        element.style.paddingTop = "7px";
        element.dataset.lat = marker.lat;
        element.dataset.lng = marker.lng;


        new mapboxgl.Marker(element)
          .setLngLat([ marker.lng, marker.lat ])
          // .setPopup(popup)
          .addTo(map);
    };
  });
};

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15 });
};

const initMapbox = () => {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    const map = buildMap(mapElement);
    const markers = JSON.parse(mapElement.dataset.markers);
    addMarkersToMap(map, markers);
    // init auto geolocalisation user
    // fitMapToMarkers(map, markers);

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
        trackUserLocation: true,
        showAccuracyCircle: false
    });


// Searchbar Location tool
    // fitMapToMarkers(map, markers);

    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      language: "en",
      geocoder: {
           language: "en"
           },
      mapboxgl: mapboxgl }));
    // action of the btn geolocate
    map.addControl(geolocate);

// Current position as origin starting point
  
    let directions = new MapboxDirections({
       accessToken: mapboxgl.accessToken,
         unit: 'metric',
         profile: 'mapbox/driving-traffic',
         controls: {
           profileSwitcher: false,
           inputs: false
         },
         language: "en",
         steps: true,
         geocoder: {
           language: "en"
           },

          interactive: false
       },
       'bottom-left'
   );
  map.addControl(directions, 'bottom-left');

   map.on('load', () => {
    geolocate.on('geolocate', (e) => {
        const lon = e.coords.longitude;
        const lat = e.coords.latitude
        const position = [lon, lat];
        console.log(position);
        const bounds = new mapboxgl.LngLatBounds();
        markers.forEach(marker => bounds.extend(position));

        map.fitBounds(bounds, { padding: 70, maxZoom: 16, duration: 0 });
        directions.setOrigin(position);

    });
  geolocate.trigger();
  const btnGo = document.querySelector(".btn-go");
  document.querySelectorAll(".marker").forEach(marker => {
    marker.addEventListener("click", (event) => {
      // Current position as origin starting point
        directions.setDestination([marker.dataset.lng, marker.dataset.lat]);
        btnGo.classList.add("active-go-btn");
        const routeSummary = document.querySelector(".mapbox-directions-route-summary");
        if (routeSummary) {
          routeSummary.classList.remove("active-leaving-btn");
        };
    })
  });
 // can be address in form setOrigin("12, Elm Street, NY")
 // can be address
   });
  };
};

//            Pseudo Code Rapid Park Button

// #









// Direction navigation code
//
// mapboxgl.accessToken = 'pk.eyJ1IjoiZWRvdWFyZGIiLCJhIjoiY2trcW9ydWo5Mzd4ODJvcXRhOHNoYjJqMyJ9.oZVnOB9WQMAt5ZpOypiv7Q';
//   var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: [-79.4512, 43.6568],
//     zoom: 13
//   });

// map.addControl(
//   new MapboxDirections({
//     accessToken: mapboxgl.accessToken
//   }),
//     'bottom-left'
// );

// Geolocalization
//   mapboxgl.accessToken = 'pk.eyJ1IjoiZWRvdWFyZGIiLCJhIjoiY2trcW9ydWo5Mzd4ODJvcXRhOHNoYjJqMyJ9.oZVnOB9WQMAt5ZpOypiv7Q';
// var map = new mapboxgl.Map({
//   container: 'map', // container id
//   style: 'mapbox://styles/mapbox/streets-v11',
//   center: [-96, 37.8], // starting position
//   zoom: 3 // starting zoom
// });

// Add geolocate control to the map.


export { initMapbox };
