const toggler = document.querySelector('.menu-toggler');
const closeToggler = document.querySelector('.menu-close-toggler');
const menu = document.querySelector('.card-test-collapse');
const overlay = document.querySelector('.menu-overlay');

const dashboardToggle = () => { 
  if (toggler) {
	  toggler.addEventListener('click', () => {
  	   menu.classList.toggle('active');
       overlay.classList.toggle('active');
    });
  };
};

const dashboardCloseToggle = () => {
  if (closeToggler) {
  	closeToggler.addEventListener('click', () => {
    	  menu.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    overlay.addEventListener('click', () => {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    });
  };
};

export { dashboardToggle };
export { dashboardCloseToggle };
