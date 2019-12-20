import Entity from "./entity.js";
import Vector from "./vector.js";
import { randomInt, randomFloat, linearColor } from "./utils.js";

export default class Box extends Entity {
	constructor(x, y, w, h, color) {
		super(x, y, w, h);
		this.color = color;
		this.vel = new Vector(0, 0);
		this.temp = true;
	}

	update(dt, entities, ctx) {
		this.boundingBox.set(this.pos.x, this.pos.y);
		if (this.temp) {
			for (var i = 0; i < entities.length; i++) {
				if (this !== entities[i]) {
					if (this.boundingBox.rectangleCollide(entities[i].boundingBox)) {
						if (i == 0) {
							this.collisionVector = this.boundingBox.boxCollision(entities[i].boundingBox);
							this.temp = false;
							this.pos.vecAdd(this.collisionVector);
							this.boundingBox.set(this.pos.x, this.pos.y);
						}
					}
				}
			}
		}
		if (this.collisionVector) {
			this.collisionVector.draw(ctx, this.pos.x+this.width/2, this.pos.y+this.height/2, this.color);
			ctx.strokeStyle = "red";
			ctx.strokeRect(this.pos.x+this.collisionVector.x, this.pos.y+this.collisionVector.y, this.width, this.height);
		}
	}

	draw(ctx) {
		ctx.strokeStyle = "black";
		ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
	}
}
