import Vector from "./js/vector.js";
import Bomb from "./js/bomb.js";

const bodyDiv = document.getElementsByClassName('bodyDiv')[0];
const toggleButton = document.getElementById('toggleButton');
const slidersDiv = document.getElementsByClassName('slidersDiv')[0];
const sliders = document.getElementsByClassName('slider');
const typeSelect = document.getElementById('typeSelect');
const selectDiv = document.getElementsByClassName('selectDiv')[0];

toggleButton.onclick = toggleOptions;
typeSelect.oninput = updateSliders;
for (var i = 0; i < sliders.length; i++) {
	sliders[i].oninput = updateSliders;
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let bomb;

window.addEventListener("load", startup);
function startup() {
	bomb = new Bomb(canvas.width/2, canvas.height/2);
	entities.push(bomb);
	updateSliders();

	requestAnimationFrame(mainLoop);
}

window.addEventListener("resize", resize);
function resize() {
	const margin = 4;
	const border = 2;
	canvas.width = bodyDiv.offsetWidth - margin*2 - border*2;
	canvas.height = bodyDiv.offsetHeight - margin*2 - border*2;
	if (bomb) {
		bomb.resize(canvas);
	}
};
resize();

function updateSliders() {
	let boomOptions = []
	for (var i = 0; i < sliders.length; i++) {
		let sliderDisplay = document.getElementById(sliders[i].id.replace("Slider", "Display"));
		let sliderType = sliders[i].id.replace("Slider", "");
		if (sliderType == "quality") {
			sliderDisplay.innerHTML = sliderType + ": " + sliders[i].value.padStart(5, '0');
		} else if (sliderType == "friction") {
			sliderDisplay.innerHTML = sliderType + ": " + `${parseFloat(sliders[i].value).toFixed(2)}`;
		} else if (sliderType == "retention") {
			sliderDisplay.innerHTML = sliderType + ": " + `${parseFloat(sliders[i].value).toFixed(1).padStart(4, "0")}`;
		} else {
			sliderDisplay.innerHTML = sliderType + ": " + sliders[i].value;
		}
		boomOptions.push(parseFloat(sliders[i].value))
	}
	boomOptions.push(typeSelect.value);
	bomb.updateBoomOptions(...boomOptions);
}

function toggleOptions() {
	if (slidersDiv.style.display !== "none") {
		slidersDiv.style.display = "none";
		selectDiv.style.display = "none";
		toggleButton.innerText = "Show options"
	} else {
		slidersDiv.style.display = "block";
		selectDiv.style.display = "block";
		toggleButton.innerText = "Hide options"
	}
	resize()
}

canvas.addEventListener("click", (event) => {
	for (var i = 0; i < entities.length; i++) {
		const xPos = event.clientX - event.target.offsetLeft;
		const yPos = event.clientY - event.target.offsetTop;
		if (entities[i].boundingBox.pointCollide(new Vector(xPos, yPos))) {
			entities[i].onClick();
		}
	}
});

let previousTime, dt;
let entities = [];

function mainLoop(currentTime) {
	requestAnimationFrame(mainLoop);

	dt = (currentTime - previousTime)/1000 || 0.0167;
	dt = Math.round(dt*10000)/10000;
	// If fps is below 30, lock fps to 30
	if (dt >= 0.0333) {
		dt = 0.0333;
	}
	previousTime = currentTime;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < entities.length; i++) {
		entities[i].update(dt, entities);
		if (entities[i].isDead) {
			entities.splice(i, 1);
		}
	}


	for (var i = 0; i < entities.length; i++) {
		entities[i].draw(ctx);
	}
}
