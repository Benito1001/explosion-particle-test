import Particle from "./particle.js";
import Vector from "../vector.js";
import { randomInt, randomFloat, linearColor } from "../utils.js";

export default class SlideParticle extends Particle {
	constructor(pos, vel, size, rad, friction, fadeRetention) {
		super(pos, vel, size, rad, friction, fadeRetention);
	}

	update(dt, entities) {
		this.pos.vecAdd(this.vel)*dt;
		this.vel.multiply(this.friction)
		this.vel.rotate(randomFloat(-Math.PI/16, Math.PI/16))

		if (this.lifeTime > 30) {
			let fadeSpeed = 2*(this.fadeRetention+1);
			if (randomInt(0, this.fadeRetention) == 0) {
				this.opacity -= fadeSpeed*dt;
			}
			if (this.opacity < 0.001) {
				this.isDead = true;
			}
		}

		let fromMid = new Vector().fromPoints(this.startPos, this.pos).absolute();
		this.fadeRadius = (this.maxPos - fromMid)/10;
		this.colorHex = linearColor(this.fromColor, this.toColor, this.maxPos, fromMid);
		this.color = this.hexToRgba(this.colorHex, this.opacity);
		this.fadedColor = this.hexToRgba(this.colorHex, this.opacity-0.5);

		this.lifeTime += 1*dt*60;
	}
}
