import Entity from "../entity.js";
import Vector from "../vector.js";
import { randomInt, randomFloat, linearColor } from "../utils.js";

export default class Particle extends Entity {
	constructor(pos, vel, size, rad, friction, fadeRetention) {
		super(pos.x, pos.y, size, size);
		this.vel = vel;
		this.startPos = pos;
		this.maxPos = rad;
		this.friction = friction;
		this.fromColor = "#faff00";
		this.toColor = "#d6490c";
		this.colorHex;
		this.color;
		this.fadeRadius;
		this.fadedColor;
		this.opacity = 1;
		this.lifeTime = 0;
		this.fadeRetention = fadeRetention;
	}

	draw(ctx) {
		ctx.fillStyle = this.color;
		this.drawSircle(this.pos.x, this.pos.y, this.width/2, ctx);
		ctx.fillStyle = this.fadedColor;
		this.drawSircle(this.pos.x, this.pos.y, (this.width+2*this.fadeRadius)/2, ctx);
	}

	hexToRgba(hex, a) {
		let r = parseInt(hex[1]+hex[2], 16);
		let g = parseInt(hex[3]+hex[4], 16);
		let b = parseInt(hex[5]+hex[6], 16);

		return "rgba("+r+", "+g+", "+b+", "+a+")";
	}

	drawSircle(x, y, r, ctx) {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.fill();
	}
}
