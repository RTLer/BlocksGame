var c = document.getElementById("board");
var ctx = c.getContext("2d");
var x = -1, y = -1, moveStep = 5;
var cubeHeight = 25, cubeWidth = 25;
var mainMapHeight = cubeHeight
		* Math.floor(($(document).height() - 25) / cubeHeight);
var mainMapWidth = cubeWidth * Math.floor($(document).width() / cubeWidth);
var speed = 80;
var emptycol = false.emptyrow = false, emptytemp = false;
var point = 0, move = 0;
var mid = Math.floor((mainMapWidth / cubeWidth) / 2);
var temp = [], insidetemp = [], count = 0;
var start, end;
var arrayMap = [], Block;
var colors = [ "#ecf0f1", "#3498db", "#2ecc71", "#e74c3c", "#ffc40f" ];
var WidthArray = [];
$("#board").mousedown(function(event) {
	x = event.pageX - this.offsetLeft;
	y = event.pageY - this.offsetLeft;
});

$(document).ready(startNewGame());
function startNewGame() {
	c.width = mainMapWidth;
	c.height = mainMapHeight + 25;
	for (var k = 0; k < mainMapWidth / cubeWidth; k++) {
		WidthArray.push(k);
	}
	for (var k = 0; k < mid; k++) {
		WidthArray.push(WidthArray.shift());
	}
	for (var i = 0; i < mainMapHeight / cubeHeight; i++) {
		arrayMap[i] = [];
		for (var k = 0; k < mainMapWidth / cubeWidth; k++) {
			j = WidthArray[k];

			arrayMap[i][j] = Math
					.floor((Math.random() * (colors.length - 1)) + 1);
			temp.push(i + "," + j);
			start = new Date().getTime();
		}
	}
}

function chenge(i, j, count) {
	if (arrayMap[i][j] == 0)
		return;
	insidetemp.push(i + "," + j);
	if (chengecond(i + 1, j, insidetemp)
			&& arrayMap[i + 1][j] == arrayMap[i][j]) {
		count++;
		chenge(i + 1, j, count);
	}
	if (chengecond(i - 1, j, insidetemp)
			&& arrayMap[i - 1][j] == arrayMap[i][j]) {
		count++;
		chenge(i - 1, j, count);
	}
	if (chengecond(i, patcond(j + 1, (mainMapWidth / cubeWidth), "end"),
			insidetemp)
			&& arrayMap[i][patcond(j + 1, (mainMapWidth / cubeWidth), "end")] == arrayMap[i][j]) {
		count++;
		chenge(i, patcond(j + 1, (mainMapWidth / cubeWidth), "end"), count);
	}
	if (chengecond(i, patcond(j - 1, (mainMapWidth / cubeWidth), "start"),
			insidetemp)
			&& arrayMap[i][patcond(j - 1, (mainMapWidth / cubeWidth), "start")] == arrayMap[i][j]) {
		count++;
		chenge(i, patcond(j - 1, (mainMapWidth / cubeWidth), "start"), count);
	}
	if (count > 0) {
		arrayMap[i][j] = 9;
		point++;
		return insidetemp;
	}
	return null;
}
function chengecond(i, j, temp) {
	return ((i < mainMapHeight / cubeHeight && i >= 0) && (temp.indexOf(i + ","
			+ j) == -1));
}
function patcond(ji, num, location) {
	if (location == "end" && ji >= num)
		return ji - num;
	if (location == "start" && ji < 0)
		return ji + num;
	return ji;
}
function msToTime(duration) {
	var milliseconds = parseInt((duration % 1000) / 100), seconds = parseInt((duration / 1000) % 60), minutes = parseInt((duration / (1000 * 60)));

	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	return minutes + ":" + seconds;
}
setInterval(
		function() {
			if (emptytemp)
				temp = [];
			emptytemp = true;
			for (var i = 0; i < mainMapHeight / cubeHeight; i++) {
				for (var k = 0; k < mainMapWidth / cubeWidth; k++) {
					j = WidthArray[k];
					if ((((x != 0) && (y != 0)) && (k * cubeWidth + 0 <= x) && (x <= k
							* cubeWidth + cubeWidth))
							&& ((i * cubeHeight + 0 <= y) && (y <= i
									* cubeHeight + cubeHeight))) {
						count = 0;
						insidetemp = [];
						move += (chenge(i, j, count) != null) ? 1 : 0;
						x = -1;
						y = -1;
						temp.concat(insidetemp);
					}

					if ((arrayMap[i][j] == 9 || arrayMap[i][j] == 0)
							&& chengecond(i - 1, j, [])
							&& (arrayMap[i - 1][j] != 9)) {
						arrayMap[i][j] = arrayMap[i - 1][j];
						arrayMap[i - 1][j] = 0;
						temp.push(i + "," + j);
						temp.push(i - 1 + "," + j);
					}
					if (arrayMap[(mainMapHeight / cubeHeight) - 1][j] == 0) {
						for (var g = (mainMapHeight / cubeHeight) - 1, emptycol = true; g >= 0; g--) {
							if (arrayMap[g][j] != 0) {
								emptycol = false;
								break;
							}
						}
						if (emptycol)
							var num = (j > mid) ? -1 : 1;
						for (var g = 0; g < mainMapHeight / cubeHeight; g++) {
							if (j + num < mainMapWidth / cubeWidth) {
								arrayMap[g][j] = arrayMap[g][j + num];
								arrayMap[g][j + num] = 0;
								temp.push(g + "," + j);
								temp.push(g + "," + j + num);
							}
						}
						emptycol = false;
					}
					if (arrayMap[i][j] == 9
							&& i != (mainMapHeight / cubeHeight) - 1) {
						arrayMap[i][j] = 0;
						temp.push(i + "," + j);
					}
				}
			}
			for (var i = 0; i < mainMapHeight / cubeHeight; i++) {
				for (var k = 0; k < mainMapWidth / cubeWidth; k++) {
					j = WidthArray[k];
					if (temp.indexOf(i + "," + j) != -1) {
						Block = arrayMap[i][j];
						ctx.clearRect(k * cubeHeight + 0, i * cubeWidth + 0,
								cubeHeight, cubeWidth);
						ctx.fillStyle = (Block != 9) ? colors[Block]
								: "#bdc3c7";
						ctx.fillRect(k * cubeHeight + 0, i * cubeWidth + 0,
								cubeHeight, cubeWidth);
					}
				}
			}
			ctx.font = "16px Arial";
			ctx.fillStyle = "#ecf0f1";
			ctx.fillRect(0, mainMapHeight, mainMapWidth, mainMapHeight + 25);
			end = new Date().getTime();
			ctx.strokeStyle = 'black';
			ctx.strokeRect(0, 0, mainMapWidth, mainMapHeight);
			ctx.fillStyle = "#000";
			ctx.fillText("point: " + point + " | moves: " + move + " | time: "
					+ msToTime(end - start), 10, mainMapHeight + 18);
		}, speed);