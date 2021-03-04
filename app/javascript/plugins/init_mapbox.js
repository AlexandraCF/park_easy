import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { displayButtonGo } from '../components/bottombar';
import { displayInstruction } from '../components/bottombar';


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
    if (marker.available_spaces >= 1 && marker.available_spaces <= 4) {
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
    map.fitBounds(bounds, { padding: 70, minZoom: 16, maxZoom: 21 });
  };


  const geolocation = (map) => {
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: false,
      showAccuracyCircle: false
    });

    // action of the btn geolocate
    map.addControl(geolocate);
    return geolocate;
  }

  const searchbar = (map) => {
    // Searchbar Location tool
    //added by yoann
    const test = new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      language: "en",
      geocoder: {
        language: "en"
      },
      mapboxgl: mapboxgl
    });



    map.addControl(test);
    test.on('result', (e) => {
      // console.log(e.result)
      const marker = new mapboxgl.Marker({ draggable: false, color: "red" })
      .setLngLat(e.result.center)
      .setPopup(new mapboxgl.Popup().setHTML(`<form class="simple_form new_favourite-2" id="new_favourite" novalidate="novalidate" action="/favourites" accept-charset="UTF-8" method="post"><div class="login-form form-inputs"><div class="form-group-2 string required favourite_address"><label class="string required" for="favourite_address">Place</label><input class="form-control string required" type="text" name="favourite[address]" value="${e.result.place_name}" id="favourite_address"></div></div><div class="form-actions"><input type="submit" name="commit" value="Add as favourite" id="add-favourite" class="btn btn-signup-signuppage" data-disable-with="Address added"></div</form>`))
      .addTo(map)

    });

    const findmarkers = document.querySelectorAll('.fixtomap');
    //console.log(findmarkers);
      findmarkers.forEach((findmarker) => {
        findmarker.addEventListener("click", (event) => {
          event.preventDefault();
          const newelement = document.createElement('fav');
          newelement.className = 'marker';
          newelement.style.backgroundImage = `url('https://cdn1.iconfinder.com/data/icons/color-bold-style/21/14_2-512.png')`;
          newelement.style.backgroundSize = 'cover';
          newelement.style.width = '41px';
          newelement.style.height = '48px';
          newelement.style.paddingTop = "7px";
          // newelement.dataset.lat = `${e.result.center[1]}`;
          // newelement.dataset.lng = `${e.result.center[2]}`;
          //console.log(newelement);
          new mapboxgl.Marker(newelement)
          .setLngLat([ JSON.parse(findmarker.dataset.coordinates).lng, JSON.parse(findmarker.dataset.coordinates).lat ])
          .addTo(map);



          const printPin = document.querySelectorAll('.fixtomap');
          //console.log(printPin);
          printPin.forEach((putmarker) => {
            putmarker.addEventListener("click", (event) => {
              event.preventDefault();
              const disabledActive = document.querySelector('.card-test-collapse');
              const disabledOverlay = document.querySelector('.menu-overlay');

              disabledActive.classList.remove('active');
              disabledOverlay.classList.remove('active');
            });
          });
        });
      });

      const leavepage = document.querySelectorAll('.fordeletefavs');
      //console.log(leavepage);
      leavepage.forEach((deletecross) => {
        deletecross.addEventListener("click", (event) => {
          event.preventDefault();

          const disabledActive = document.querySelector('.card-test-collapse');
          const disabledOverlay = document.querySelector('.menu-overlay');

          disabledActive.classList.remove('active')
          disabledOverlay.classList.remove('active')
    });
  });
  };


  const initDirections = (map) => {
    // Current position as origin starting point
    let directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving-traffic',
      controls: {
        profileSwitcher: false,
        inputs: true,
        instructions: true
      },
      language: "en",
      annotations: [],
      steps: true,
      routePadding: 150,
      geocoder: {
        language: "en"
      },
      interactive: false
      },
      'bottom-left'
    );
    map.addControl(directions, 'bottom-left');

    return directions;
  }

const initMapbox = () => {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    const map = buildMap(mapElement);
    const markers = JSON.parse(mapElement.dataset.markers);
    const activeMarker = mapElement.dataset.activeMarker;
    const fallbackMarker = mapElement.dataset.fallbackMarker;
    console.log(fallbackMarker);
    console.log(activeMarker);
    addMarkersToMap(map, markers);

    searchbar(map);

    const geolocate = geolocation(map);

    const directions = initDirections(map);

    const btnClear = document.querySelector(".btn-clear");
    const btnGo = document.querySelector(".btn-go");
    const btnParked = document.querySelector(".btn-parked");
    const btnPark = document.querySelector(".btn-park");

    if (document.querySelector('.mapbox-directions-destination .geocoder-icon-close')) {
      document.querySelector('.mapbox-directions-destination .geocoder-icon-close').click();
    }
     //  Btn Clear All
    document.querySelector(".btn-clear").addEventListener("click", (event) => {
      btnClear.classList.add("active-clear-btn");
        const markersapp = document.querySelectorAll("pin");
        markersapp.forEach((marker) => {
          marker.style.display = 'block';
          });

      if (document.querySelector('.mapbox-directions-destination .geocoder-icon-close')) {
        document.querySelector('.mapbox-directions-destination .geocoder-icon-close').click();
      }
      btnGo.classList.remove("active-go-btn");
      btnParked.classList.remove("active-parked-btn");
      btnPark.classList.remove("active-park-btn");
      btnPark.style.display = 'block';
      
    });


    map.on('load', () => {
      const bounds = new mapboxgl.LngLatBounds();
      [{lat: 48.865487, lng: 2.382093}, {lat: 48.865083, lng: 2.382692}, {lat: 48.865603, lng: 2.384176}, {lat: 48.864839, lng: 2.385049}, {lat: 48.864037, lng: 2.383574}].forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
      map.fitBounds(bounds, { padding: 70, minZoom: 16, maxZoom: 21, duration: 0 });

      geolocate.on('geolocate', (e) => {
        const lon = e.coords.longitude;
        const lat = e.coords.latitude
        const position = [lon, lat];

        console.log('geoloc');



        directions.setOrigin(position);
        // Button to find the nearest spot from you current location

        document.querySelector(".btn-park").addEventListener("click", (event) => {
          // btnPark.classList.add("active-park-btn");
          btnPark.style.display = 'none';

          btnGo.classList.add("active-go-btn");
          fetch(`/parking_spots/closespot?lon=${lon}&lat=${lat}`)
            .then(response => response.json())
            .then((data) =>  {
              directions.setDestination([data["longitude"], data["latitude"]]);
              /* const bounds = new mapboxgl.LngLatBounds();
              [{lng: lon, lat: lat},{lat: data["latitude"], lng: data["longitude"]}].forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
              map.fitBounds(bounds, { padding: 120, maxZoom: 21, duration: 0 }); */
            });
        });
      });


      geolocate.trigger();

      const allMarkers = document.querySelectorAll(".marker");
      allMarkers.forEach(marker => {
        marker.addEventListener("click", (event) => {
          // Change color marker when clicking
          allMarkers.forEach((marker) => {
            marker.style.backgroundImage = `url(${fallbackMarker})`;
          });
          event.currentTarget.style.backgroundImage = `url(${activeMarker})`;
          // Current position as origin starting point

          directions.setDestination([marker.dataset.lng, marker.dataset.lat]);
          // added by alexandra
          const bounds = new mapboxgl.LngLatBounds();
          [{lng: 2.3789894, lat: 48.8656},{lat: marker.dataset.lat, lng: marker.dataset.lng},{lat: 48.865487, lng: 2.382093}, {lat: 48.865083, lng: 2.382692}, {lat: 48.865603, lng: 2.384176}, {lat: 48.864839, lng: 2.385049}, {lat: 48.864037, lng: 2.383574}].forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
          map.fitBounds(bounds, { padding: 70, minZoom: 16, maxZoom: 21, duration: 0 });

          // Added by Javier
          btnGo.classList.add("active-go-btn");
          btnGo.dataset.id = marker.dataset.id
          const routeSummary = document.querySelector(".mapbox-directions-route-summary");
          if (routeSummary) {
            routeSummary.classList.remove("active-leaving-btn");
          };
        })
      });
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
