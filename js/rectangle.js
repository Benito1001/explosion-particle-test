import Vector from "./vector.js";

export default class Rectangle {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	draw(ctx, scale) {
		ctx.lineWidth = 0.5;
		ctx.strokeStyle = "black";
		ctx.strokeRect(this.x*scale, this.y*scale, this.width*scale, this.height*scale);
	}
	set(x, y) {
		this.x = x;
		this.y = y;
	}
	rectangleCollide(rectangle) {
		if (this.x + this.width > rectangle.x && this.x < rectangle.x + rectangle.width &&
				this.y + this.height > rectangle.y && this.y < rectangle.y + rectangle.height) {
			return true;
		}
		return false;
	}
	pointCollide(point) {
		if (this.x + this.width > point.x && this.x < point.x &&
				this.y + this.height > point.y && this.y < point.y) {
			return true;
		}
		return false;
	}
	toEdge(α) {
		if (this.width != this.height) {
			console.warn("fix me plz");
			return 0;
		}

		let quartPi = Math.PI/4;
		let rad = this.width/2;

		if (α < -quartPi) {
			α += 2*Math.PI;
		}

		/*
		P := Dersom(
			-pi/4<=a<pi/4, (r, r*tan(a)),
			pi/4<=a<3*pi/4, (r*(cos(a)/sin(a)), r),
			3*pi/4<=a<5*pi/4, (-r, -r*tan(a)),
			5*pi/4<=a<=7*pi/4, (-r*(cos(a)/sin(a)), -r)
		)
		*/
		if (-quartPi <= α && α < quartPi) {
			var x = rad;
			var y = rad*Math.tan(α);
		} else if (quartPi <= α && α < 3*quartPi) {
			var x = rad*(Math.cos(α)/Math.sin(α));
			var y = rad;
		} else if (3*quartPi <= α && α < 5*quartPi) {
			var x = -rad;
			var y = -rad*Math.tan(α);
		} else if (5*quartPi <= α && α <= 7*quartPi) {
			var x = -rad*(Math.cos(α)/Math.sin(α));
			var y = -rad;
		} else {
			console.warn("fix me plz");
			return 0;
		}
		let toEdge = new Vector(x, y);
		return toEdge;
	}
	boxCollision(box) {
		console.clear();
		let thisMidX = this.x + this.width/2;
		let thisMidY = this.y + this.height/2;
		let boxMidX = box.x + box.width/2;
		let boxMidY = box.y + box.height/2;

		let thisToBox = new Vector(boxMidX-thisMidX, thisMidY-boxMidY);
		let boxToThis = new Vector(thisMidX-boxMidX, boxMidY-thisMidY);

		if (thisToBox.absolute() === 0) {
			return new Vector(-0.1, -0.1);
		}

		let thisToEdge = this.toEdge(thisToBox.getMathyAngle());
		let boxToEdge = box.toEdge(boxToThis.getMathyAngle());

		let reductingAmount = thisToEdge.absolute() + boxToEdge.absolute()

		let collisionVector = new Vector(boxMidX-thisMidX, boxMidY-thisMidY).shorten(reductingAmount);

		return collisionVector;
	}
}
