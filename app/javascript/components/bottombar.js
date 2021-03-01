
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

// const displayButtonGo = () => {
// 	const btnGo = document.querySelector(".btn-go");
// 	// console.log(btnGo);
// 	const markerBtnGo = document.querySelectorAll(".marker.mapboxgl-marker.mapboxgl-marker-anchor-center");
// 	markerBtnGo.forEach((item) => {
// 		item.addEventListener("click", () => {
// 			btnGo.classList.add("active-go-btn");
// 		});
// 	});
// };

// export { displayButtonGo };

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
		const navigation = document.querySelector(".mapbox-directions-instructions.active-directions-instructions");
		navigation.style.display = 'none';
		fetch(`http://localhost:3000/update-available-places?id=${btnGo.dataset.id}&do=minus`)
			.then(response => response.json())
			.then((data) => {
				// console.log(data)
				const marker = document.querySelector(`#marker-${data.id}`);
				marker.innerText = data.available_places;
			});
			// .then((data) => console.log(data));

		const routeSummary = document.querySelector(".mapbox-directions-route-summary");
		routeSummary.classList.add("nondisplay-route-summary");
	});

	btnLeaving.addEventListener("click", () => {
		btnLeaving.classList.remove("active-leaving-btn");
		fetch(`http://localhost:3000/update-available-places?id=${btnGo.dataset.id}&do=plus`)
			.then(response => response.json())
			.then((data) => {
				// console.log(data)
				const marker = document.querySelector(`#marker-${data.id}`);
				marker.innerText = data.available_places;
			});
	});
};


export { btnTakePlace };


const displayButtonPark = () => {
  const btnPark = document.querySelector(".btn-park");
  // console.log(btnPark);
  const markerBtnPark = document.querySelectorAll(".marker.mapboxgl-marker.mapboxgl-marker-anchor-center");
  markerBtnPark.forEach((marker) => {
    marker.addEventListener("click", () => {
      btnPark.classList.add("active-park-btn");
    });
  });
};

export { displayButtonPark };

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
