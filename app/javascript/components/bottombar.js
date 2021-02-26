
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