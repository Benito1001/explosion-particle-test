export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min, max) {
	return (Math.random() * (max - min)) + min;
}

export function linearLine(from, to, length, pos) {
	let fullLine = from - to;
	if (fullLine > 0) {
		let fraction = fullLine/length;
		var portion = to + fraction * (length-pos);
	} else {
		let fullLine = to - from;
		let fraction = fullLine/length;
		var portion = from + fraction * pos;
	}
	return portion;
}

export function linearColor(fromColorHex, toColorHex, length, pos) {
	let fromR = parseInt(fromColorHex[1]+fromColorHex[2], 16);
	let fromG = parseInt(fromColorHex[3]+fromColorHex[4], 16);
	let fromB = parseInt(fromColorHex[5]+fromColorHex[6], 16);

	let toR = parseInt(toColorHex[1]+toColorHex[2], 16);
	let toG = parseInt(toColorHex[3]+toColorHex[4], 16);
	let toB = parseInt(toColorHex[5]+toColorHex[6], 16);

	let currentR = linearLine(fromR, toR, length, pos);
	let currentG = linearLine(fromG, toG, length, pos);
	let currentB = linearLine(fromB, toB, length, pos);

	let hexR = Math.round(currentR).toString(16);
	hexR = parseInt(hexR, 16) < 15 ? "0"+hexR : hexR;
	let hexG = Math.round(currentG).toString(16);
	hexG = parseInt(hexG, 16) < 15 ? "0"+hexG : hexG;
	let hexB = Math.round(currentB).toString(16);
	hexB = parseInt(hexB, 16) < 15 ? "0"+hexB : hexB;


	let color = "#"+hexR+hexG+hexB;
	return color;
}
