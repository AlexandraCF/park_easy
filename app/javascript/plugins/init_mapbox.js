import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

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
    style: 'mapbox://styles/mapbox/streets-v11'
  });
};

const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {
    const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
    if (marker.available_spaces > 0) {
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

        new mapboxgl.Marker(element)
          .setLngLat([ marker.lng, marker.lat ])
          .setPopup(popup)
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
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
        trackUserLocation: true
    });

    // map.on('load', function() {

    // });
    // end auto geolocalisation user
    // fitMapToMarkers(map, markers);
    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
                                      mapboxgl: mapboxgl }));
    // action of the btn geolocate
    map.addControl(geolocate);

// Current position as origin starting point
   var directions = new MapboxDirections({
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
       },
       'top-left'
   );
  map.addControl(directions, 'top-left');

   map.on('load', () => {
    geolocate.on('geolocate', (e) => {
        const lon = e.coords.longitude;
        const lat = e.coords.latitude
        const position = [lon, lat];
        console.log(position);
        directions.setOrigin(position);
        directions.setDestination([2.379013682710195, 48.86606987222612]);
    });
       geolocate.trigger();
 // can be address in form setOrigin("12, Elm Street, NY")
 // can be address
   });
  };
};

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
