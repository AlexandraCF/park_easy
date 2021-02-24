const toggler = document.querySelector('.menu-toggler');
const menu    = document.querySelector('.card-test-collapse');
const closeToggler = document.querySelector('.menu-close-toggler');

const dashboardToggle = () => { 
	toggler.addEventListener('click', () => {
  	  // console.log("Hello");
  	  // toggler.classList.toggle('active');
  	  menu.classList.toggle('active');
  });
};

const dashboardCloseToggle = () => { 
	closeToggler.addEventListener('click', () => {
  	  console.log("Hello");
  	  // toggler.classList.toggle('active');
  	  menu.classList.toggle('active');
  });
};

export { dashboardToggle };
export { dashboardCloseToggle };
