import Vector from "./js/vector.js";
import Bomb from "./js/bomb.js";

const root = document.documentElement;
const rootStyle = window.getComputedStyle(root);
const foregroundColor = rootStyle.getPropertyValue("--foregroundColor");
const bodyDiv = document.getElementsByClassName('bodyDiv')[0];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.style.borderColor = foregroundColor;

window.addEventListener("resize",resize);
function resize() {
	const margin = 4;
	const border = 2;
	canvas.width = bodyDiv.offsetWidth - margin*2 - border*2 - 25;
	canvas.height = bodyDiv.offsetHeight - margin*2 - border*2 - 10;
};
resize();

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

window.addEventListener("load", startup);

function startup() {
	entities.push(new Bomb(canvas.width/2, canvas.height/2));

	requestAnimationFrame(mainLoop);
}

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
