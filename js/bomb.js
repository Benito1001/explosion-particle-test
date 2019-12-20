import Entity from "./entity.js";
import Vector from "./vector.js";
import Rectangle from "./rectangle.js";
import Explosion from "./explosion/explosion.js";
import { randomInt, randomFloat } from "./utils.js";

export default class Bomb extends Entity {
	constructor(x, y) {
		let boomType = "boom";
		super(x, y, 100, document.getElementById('tntImg'));
		this.boomQuality = 1000;
		this.repeat = true;
		this.boomType = boomType;
		this.boomRad = canvas.height/2;
		this.particleCount = this.boomQuality;
		this.particleSize = (this.boomRad*2.2)/Math.sqrt(this.boomQuality);
		this.boom = false;
		this.boundingBox = new Rectangle(this.pos.x-this.width/2, this.pos.y-this.height/2, this.width, this.height);
	}

	update(dt, entities) {
		if (this.boom) {
			this.isDead = !this.repeat;
			this.boom = false;
			if (this.boomType != "meguNuke") {
				new Explosion(this.pos, this.boomQuality, this.boomType, this.boomRad, 0.6, 1, entities);
			} else {
				this.meguNuke(entities);
			}
		}
	}

	draw(ctx) {
		ctx.drawImage(this.texture, this.pos.x-this.width/2, this.pos.y-this.height/2, this.width, this.height);
	}

	meguNuke(entities) {
		this.isDead = false;
		if (this.texture == document.getElementById('explodingMeguminImg')) {
			return;
		}
		let prevTexture = this.texture;
		let prevWidth = this.width;
		let prevHeight = this.height;
		this.texture = document.getElementById('explodingMeguminImg');
		this.width *= 3;
		this.height = this.width*(this.texture.height/this.texture.width);
		let explsionSound = document.getElementById('explodingMeguminSound');
		explsionSound.volume = 0.2;
		explsionSound.load();
		explsionSound.play();
		setTimeout(function () {
			explsionSound.pause();
			new Explosion(this.pos, this.boomQuality, "nuke", this.boomRad, 0.75, 1, entities);
			this.texture = prevTexture;
			this.width = prevWidth;
			this.height = prevHeight;
			this.isDead = !this.repeat;
		}.bind(this), 2043);
	}

	onClick() {
		this.boom = true;
	}
}
