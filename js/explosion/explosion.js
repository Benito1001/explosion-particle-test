import Vector from "../vector.js";
import SlideParticle from "./slideParticle.js";
import NukeParticle from "./nukeParticle.js";
import { randomFloat } from "../utils.js";

export default class Explosion {
	constructor(pos, quality, type, radius, friction, fadeRetention, entities) {
		this.pos = pos;
		this.quality = quality;
		this.type = type;
		this.radius = radius;
		this.particleFriction = friction;
		this.particleFadeRetention = fadeRetention;
		this.particleCount = this.quality;
		this.particleSize = (this.radius*2.2)/Math.sqrt(this.quality);
		switch (this.type) {
			case "boom":
				this.roundBoom(entities)
				break;
			case "fountain":
				this.fountainBoom(entities)
				break;
			case "nuke":
				this.nukeBoom(entities)
				break;
			case "meguNuke":
				this.meguNukeBoom(entities)
				break;
			default:
				console.error(`${this.boomType} is not a type, 馬鹿`);
		}
	}

	roundBoom(entities) {
		for (var angle = 0; angle < Math.PI*2; angle += (Math.PI*2)/this.particleCount) {
			let particleX = Math.cos(angle) + this.pos.x;
			let particleY = Math.sin(angle) + this.pos.y;
			let particlePos = new Vector(particleX, particleY);
			let particleVel = new Vector().fromPoints(this.pos, particlePos);
			this.createParticle("slide", particlePos, particleVel, entities);
		}
	}

	fountainBoom(entities) {
		let spread = Math.PI/2;
		let restPortion = (Math.PI-spread)/2;
		for (var angle = restPortion; angle < Math.PI-restPortion; angle += spread/this.particleCount) {
			let particleX = Math.cos(angle+Math.PI) + this.pos.x;
			let particleY = Math.sin(angle+Math.PI) + this.pos.y;
			let particlePos = new Vector(particleX, particleY);
			let particleVel = new Vector().fromPoints(this.pos, particlePos);
			this.createParticle("slide", particlePos, particleVel, entities);
		}
	}

	nukeBoom(entities) {
		let boomWidth = this.radius/12;
		for (let widthFraction = -boomWidth/2; widthFraction <= boomWidth/2; widthFraction += boomWidth/this.particleCount) {
			let particleX = this.pos.x + widthFraction;
			let particleY = this.pos.y;
			let particlePos = new Vector(particleX, particleY);
			let particleVel = new Vector(0, -1);
			this.createParticle("nuke", particlePos, particleVel, entities, widthFraction/(boomWidth/2));
		}
	}

	createParticle(type, particlePos, particleVel, entities, toMid) {
		let minSpeed = 0.1;
		let maxSpeed = this.radius*(1 - this.particleFriction);
		particleVel.setLength(randomFloat(minSpeed, maxSpeed));
		switch (type) {
			case "slide":
				entities.push(new SlideParticle(particlePos, particleVel, this.particleSize, this.radius, this.particleFriction, this.particleFadeRetention));
				break;
			case "nuke":
				entities.push(new NukeParticle(particlePos, particleVel, this.particleSize, this.radius, this.particleFriction, this.particleFadeRetention, toMid));
				break;
			default:
				console.error(type);
		}
	}
}
