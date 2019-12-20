import Rectangle from "./rectangle.js";
import Vector from "./vector.js";

export default class Entity {
	constructor(x, y, w, h) {
		this.pos = new Vector(x, y);
		this.width = w;
		if (isNaN(h)) {
			this.height = w*(h.height/h.width);
			this.texture = h;
		} else {
			this.height = h;
		}
		this.isDead = false;
		this.boundingBox = new Rectangle(x, y, w, h);
	}
	onClick() {
	}
}
