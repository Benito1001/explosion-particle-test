export default class Vector {
	constructor(x=0, y=0) {
		this.x = x;
		this.y = y;
	}
	normalize() {
		let newX = this.x/this.absolute();
		this.y = this.y/this.absolute();
		this.x = newX;
		return this;
	}
	multiply(num) {
		this.x *= num;
		this.y *= num;
		return this;
	}
	add(x, y = x) {
		this.x += x;
		this.y += y;
		return this;
	}
	vecAdd(vector) {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	}
	sub(x, y = x) {
		this.x -= x;
		this.y -= y;
		return this;
	}
	vecSub(vector) {
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	}
	set(x, y = x) {
		this.x = x;
		this.y = y;
		return this;
	}
	vecSet(vector) {
		this.x = vector.x;
		this.y = vector.y;
		return this;
	}
	absolute() {
		return (Math.sqrt(Math.pow(this.x, 2)+Math.pow(this.y, 2)));
	}
	setLength(length) {
		this.normalize().multiply(length);
		return this;
	}
	rotate(α) {
		let newX = Math.cos(α)*this.x-Math.sin(α)*this.y;
		this.y = Math.cos(α)*this.y+Math.sin(α)*this.x;
		this.x = newX;
		return this;
	}
	fromPoints(point1, point2) {
		this.x = point2.x-point1.x;
		this.y = point2.y-point1.y;
		return this;
	}
	shorten(amount) {
		let tempVector = this.clone();
		tempVector.setLength(amount);
		this.vecSub(tempVector);
		return this;
	}
	lengthen(amount) {
		let tempVector = this.clone();
		tempVector.setLength(amount);
		this.vecAdd(tempVector);
		return this;
	}
	getAngle() {
		return Math.atan2(this.x, this.y);
	}
	getMathyAngle() {
		let tanSign = Math.sign(this.x)*Math.sign(this.y);
		if (Math.sign(this.x) != -1) {
			var piSign = 0;
		} else {
			var piSign = Math.sign(this.y);
		}
		let angle = tanSign*Math.atan(this.y/this.x) + piSign*Math.PI;
		return angle;
	}
	angleDiff(vector) {
		console.warn("broken, plz fix");
		return angle;
	}
	draw(ctx, originX, originY, color) {
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(originX, originY);
		ctx.lineTo(originX+this.x, originY+this.y);
		ctx.stroke();
	}
	clone() {
		return new Vector(this.x, this.y);
	}
}
