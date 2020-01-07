import Entity from "./entity.js";
import Rectangle from "./rectangle.js";
import Explosion from "./explosion/explosion.js";

export default class Bomb extends Entity {
	constructor(x, y) {
		let boomType = "boom";
		super(x, y, 100, document.getElementById('tntImg'));
		this.boomQuality = 1000;
		this.boomFriction = 0.4;
		this.boomRetention = 1;
		this.boomType = "boom";
		this.repeat = true;
		this.boomRad = canvas.height/2;
		this.particleCount = this.boomQuality;
		this.particleSize = (this.boomRad*2.2)/Math.sqrt(this.boomQuality);
		this.boom = false;
		this.boundingBox = new Rectangle(this.pos.x-this.width/2, this.pos.y-this.height/2, this.width, this.height);
	}

	update(_dt, entities) {
		if (this.boom) {
			this.isDead = !this.repeat;
			this.boom = false;
			if (this.boomType != "meguNuke") {
				new Explosion(this.pos, this.boomQuality, this.boomType, this.boomRad, this.boomFriction, this.boomRetention, entities);
			} else {
				this.meguNuke(entities);
			}
		}
	}

	updateBoomOptions(quality, friction, retention, type) {
		this.boomQuality = quality;
		this.boomFriction = friction;
		this.boomRetention = retention;
		this.boomType = type;
	}

	draw(ctx) {
		ctx.drawImage(this.texture, this.pos.x-this.width/2, this.pos.y-this.height/2, this.width, this.height);
	}

	resize(canvas) {
		this.pos.set(canvas.width/2, canvas.height/2)
		this.boundingBox.set(this.pos.x-this.width/2, this.pos.y-this.height/2)
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
			new Explosion(this.pos, this.boomQuality, "nuke", this.boomRad, this.boomFriction, this.boomRetention, entities);
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
