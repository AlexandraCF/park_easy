import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { displayButtonGo } from '../components/bottombar';
import { displayInstruction } from '../components/bottombar';

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
    zoom: 21,
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
        element.dataset.id = marker.parking_spot_id;
        element.id = `marker-${marker.parking_spot_id}`;
        // console.log(element.id);


        new mapboxgl.Marker(element)
          .setLngLat([ marker.lng, marker.lat ])
          // .setDuration(marker.geolocate.duration)
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
    console.log(markers)
    // init auto geolocalisation user
/*     fitMapToMarkers(map, [{lat: 48.865487, lng: 2.382093}, {lat: 48.865083, lng: 2.382692}, {lat: 48.865603, lng: 2.384176}, {lat: 48.864839, lng: 2.385049}, {lat: 48.864037, lng: 2.383574}]); */

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showAccuracyCircle: false
    });

    // Searchbar Location tool
    // fitMapToMarkers(map, markers);
    const test = new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      language: "en",
      geocoder: {
        language: "en"
      },
      mapboxgl: mapboxgl
    });
    //ok

    map.addControl(test)
    test.on('result', (e) => {
      console.log(e.result.place_name)
      const updateAddress = e => {
        setAddress(e.result.place_name);
      };
      const marker = new mapboxgl.Marker({ draggable: true, color: "red" })
      .setLngLat(e.result.center)
      .setPopup(new mapboxgl.Popup().setHTML(`<form class="simple_form new_favourite-2" id="new_favourite" novalidate="novalidate" action="/favourites" accept-charset="UTF-8" method="post"><input type="hidden" name="authenticity_token" value="vAhVWFFqSUOk4KQyv7vmL22LfGU3KRiNRsOlC9oqMSrQEkFb2FSZ+38pN5cjsm/65wO7jrKP3GvaOLIj4MY2sw=="><div class="login-form form-inputs"><div class="form-group string required favourite_address"><label class="string required" for="favourite_address">Place</label><input class="form-control string required" type="text" name="favourite[address]" value="${e.result.place_name}" id="favourite_address"></div></div><div class="form-actions"><input type="submit" name="commit" value="Add as favourite" class="btn btn-signup-signuppage" data-disable-with="Ok"></div</form>`))    
      .addTo(map)
    });

    // action of the btn geolocate
    map.addControl(geolocate);

      // Current position as origin starting point

    let directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving-traffic',
      controls: {
        profileSwitcher: false,
        inputs: false,
        instructions: true
      },
      alternatives: true,
      language: "en",
      annotations: [],
      steps: true,
      routePadding: 200,
      geocoder: {
        language: "en"
      },
      interactive: false
      },
      'bottom-left'
    );
    map.addControl(directions, 'bottom-left');

    map.on('load', () => {
      const bounds = new mapboxgl.LngLatBounds();
        [{lat: 48.865487, lng: 2.382093}, {lat: 48.865083, lng: 2.382692}, {lat: 48.865603, lng: 2.384176}, {lat: 48.864839, lng: 2.385049}, {lat: 48.864037, lng: 2.383574}].forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
      map.fitBounds(bounds, { padding: 70, maxZoom: 16, duration: 0 });
      geolocate.on('geolocate', (e) => {
        const lon = e.coords.longitude;
        const lat = e.coords.latitude
        const position = [lon, lat];
        console.log(position)
        
        directions.setOrigin(position);

        console.log(markers);

  // Button to find the nearest spot from you current location
        const btnGo = document.querySelector(".btn-go");
        document.querySelector(".btn-park").addEventListener("click", (event) => {
          btnPark.classList.add("active-park-btn");
          btnGo.classList.add("active-go-btn");
          fetch(`/parking_spots/closespot?lon=${lon}&lat=${lat}`)
          // .where(parking_spots.available_spaces >= 4 && parking_spots.available_spaces <= 8)
          .then(response => response.json())
          .then((data) =>  {

            directions.setDestination([data["longitude"], data["latitude"]]);
          });
        });
      });

      geolocate.trigger();

      const btnGo = document.querySelector(".btn-go");
      const btnPark = document.querySelector(".btn-park");
   
      document.querySelectorAll(".marker").forEach(marker => {
        marker.addEventListener("click", (event) => {
          // Current position as origin starting point
            directions.setDestination([marker.dataset.lng, marker.dataset.lat]);
            const bounds = new mapboxgl.LngLatBounds();
        [{lng: 2.3789894, lat: 48.8656},{lat: marker.dataset.lat, lng: marker.dataset.lng},{lat: 48.865487, lng: 2.382093}, {lat: 48.865083, lng: 2.382692}, {lat: 48.865603, lng: 2.384176}, {lat: 48.864839, lng: 2.385049}, {lat: 48.864037, lng: 2.383574}].forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
        map.fitBounds(bounds, { padding: 70, maxZoom: 16, duration: 0 });
            btnGo.classList.add("active-go-btn");
        });
      });


      // directions.setDestination : can be address in form setOrigin("12, Elm Street, NY")
      // directions.setOrigin : can be address
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
