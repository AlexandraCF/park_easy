
const showContent = () => {
	const map = document.getElementById("map");
	map.addEventListener("click", () => {
		const distanceContent = document.querySelector(".mapbox-directions-component.mapbox-directions-route-summary span");
		if (distanceContent) {
			// console.log(distanceContent);
		};

	});
};

export { showContent };

const displayButtonGo = () => {
	const btnGo = document.querySelector(".btn-go");
	// console.log(btnGo);
	const markerBtnGo = document.querySelectorAll(".marker.mapboxgl-marker.mapboxgl-marker-anchor-center");
	markerBtnGo.forEach((item) => {
		item.addEventListener("click", () => {
			btnGo.classList.add("active-go-btn");
		});
	});
};

export { displayButtonGo };

const btnTakePlace = () => {
	const btnGo = document.querySelector(".btn-go");
	const btnParked = document.querySelector(".btn-parked");
	const btnLeaving = document.querySelector(".btn-leaving");

	btnGo.addEventListener("click", () => {
		btnGo.classList.remove("active-go-btn");
		btnParked.classList.add("active-parked-btn");
	});

	btnParked.addEventListener("click", () => {
		btnParked.classList.remove("active-parked-btn");
		btnLeaving.classList.add("active-leaving-btn");
		const routeSummary = document.querySelector(".mapbox-directions-route-summary");
		// console.log(routeSummary);
		routeSummary.classList.add("nondisplay-route-summary");
	});

	btnLeaving.addEventListener("click", () => {
		btnLeaving.classList.remove("active-leaving-btn");
	});
};

export { btnTakePlace };