// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";
// CSS
import 'mapbox-gl/dist/mapbox-gl.css';
import { initMapbox } from '../plugins/init_mapbox';

// Internal imports, e.g:
// import { initSelect2 } from '../components/init_select2';
import { initOnboardingCaroussel } from '../components/init_onboarding';
import { dashboardToggle } from '../components/dashboard_toggle';
import { dashboardCloseToggle } from '../components/dashboard_toggle';

import { showContent } from '../components/bottombar';
import { displayButtonGo } from '../components/bottombar';
import { displayButtonPark } from '../components/bottombar';
import { toggleFavourite } from '../components/toggle_favourite';
import { btnTakePlace } from '../components/bottombar';
import { displayInstruction } from '../components/bottombar';

document.addEventListener('turbolinks:load', () => {
  // Call your functions here, e.g:
  // initSelect2();

  if  (document.querySelector('#map')) {
    // console.log(document.querySelector('#map'))
    document.querySelector('#map').display = "none"
  };
  initOnboardingCaroussel();
  initMapbox();
  dashboardToggle();
  dashboardCloseToggle();
  showContent();
  btnTakePlace();
  displayButtonPark();
  toggleFavourite();
  displayInstruction();
});
