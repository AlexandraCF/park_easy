
const showContent = () => {
	const map = document.getElementById("map");
	map.addEventListener("click", () => {
		const distanceContent = document.querySelector(".mapbox-directions-component.mapbox-directions-route-summary span");
		if (distanceContent) {
			console.log(distanceContent);
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

const displayInstruction = () => {
	const btnGo = document.querySelector(".btn-go");
	btnGo.addEventListener("click", (event) => {
		const navigation = document.querySelector(".mapbox-directions-instructions");
		console.log(navigation);
		navigation.style.display = 'block';
		navigation.classList.add("active-directions-instructions");

	});
};

export { displayInstruction };