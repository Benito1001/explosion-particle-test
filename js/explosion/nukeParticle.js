import Particle from "./particle.js";
import Vector from "../vector.js";
import { randomInt, randomFloat, linearColor } from "../utils.js";

export default class SlideParticle extends Particle {
	constructor(pos, vel, size, rad, friction, fadeRetention, toMid) {
		super(pos, vel, size, rad, friction, fadeRetention);
		this.rotateVel = vel;
		this.toMid = toMid;
	}

	update(dt, entities) {
		this.pos.vecAdd(this.rotateVel)*dt;

		let fromMid = new Vector().fromPoints(this.startPos, this.pos).absolute();
		this.fadeRadius = fromMid/20;
		this.colorHex = linearColor(this.fromColor, this.toColor, this.maxPos, fromMid);
		this.color = this.hexToRgba(this.colorHex, this.opacity);
		this.fadedColor = this.hexToRgba(this.colorHex, this.opacity-0.5);

		this.vel.multiply(this.friction);
		this.rotateVel = this.vel.clone();
		if (fromMid > this.maxPos/2) {
			let rotateFactor = (1-((this.maxPos - fromMid)/this.maxPos))*this.toMid*Math.PI*2;
			this.rotateVel.rotate(rotateFactor);
		}

		if (fromMid > this.maxPos/2) {
			let pushVec = new Vector(0, 0);
			this.vel.vecAdd(pushVec);
		}

		if (this.lifeTime > 60) {
			let fadeSpeed = 2*(this.fadeRetention+1);
			if (randomInt(0, this.fadeRetention) == 0) {
				this.opacity -= fadeSpeed*dt;
			}
			if (this.opacity < 0.001) {
				this.isDead = true;
			}
		}

		this.lifeTime += 1*dt*60;
	}
}
