var c = document.getElementById("board");
var ctx = c.getContext("2d");
var x = -1, y = -1, moveStep = 5;
var cubeHeight = 25, cubeWidth = 25;
var mainMapHeight = cubeHeight
		* Math.floor(($(document).height() - 25) / cubeHeight);
var mainMapWidth = cubeWidth * Math.floor($(document).width() / cubeWidth);
var blocksHeightCount=(mainMapHeight / cubeHeight),blocksWidthCount=(mainMapWidth / cubeWidth);
var speed = 80;
var emptycol = false.emptyrow = false, emptytemp = false;
var point = 0, move = 0;
var mid = Math.floor(blocksWidthCount / 2);
var insidetemp = [], count = 0;
var start, end;
var arrayMap = [], Block;
var colors = [ "#ecf0f1", "#3498db", "#2ecc71", "#e74c3c", "#ffc40f" ];
var WidthArray = [];
$('body').bind('touchmove', function(e){e.preventDefault()})
$("#board").mousedown(function(event) {
	x = event.pageX - this.offsetLeft;
	y = event.pageY - this.offsetLeft;
});

$(document).ready(startNewGame());
function startNewGame() {
	c.width = mainMapWidth;
	c.height = mainMapHeight + 25;
	for (var k = 0; k < blocksWidthCount; k++) {
		WidthArray.push(k);
	}
	for (var k = 0; k < mid; k++) {
		WidthArray.push(WidthArray.shift());
	}
	for (var i = 0; i < blocksHeightCount; i++) {
		arrayMap[i] = [];
		for (var k = 0; k < blocksWidthCount; k++) {
			j = WidthArray[k];

			arrayMap[i][j] = Math
					.floor((Math.random() * (colors.length - 1)) + 1);
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
	if (chengecond(i, patcond(j + 1, blocksWidthCount, "end"),
			insidetemp)
			&& arrayMap[i][patcond(j + 1, blocksWidthCount, "end")] == arrayMap[i][j]) {
		count++;
		chenge(i, patcond(j + 1, blocksWidthCount, "end"), count);
	}
	if (chengecond(i, patcond(j - 1, blocksWidthCount, "start"),
			insidetemp)
			&& arrayMap[i][patcond(j - 1, blocksWidthCount, "start")] == arrayMap[i][j]) {
		count++;
		chenge(i, patcond(j - 1, blocksWidthCount, "start"), count);
	}
	if (count > 0) {
		arrayMap[i][j] = 9;
		point++;
		return insidetemp;
	}
	return null;
}
function chengecond(i, j, temp) {
	return ((i < blocksHeightCount && i >= 0) && (temp.indexOf(i + ","
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
			ctx.clearRect(0, 0,mainMapHeight, mainMapWidth);
			ctx.fillStyle = colors[0];
			ctx.fillRect(0,0, mainMapWidth,
					mainMapHeight);
			if (emptytemp)
			emptytemp = true;
			for (var i = 0; i < blocksHeightCount; i++) {
				for (var k = 0; k < blocksWidthCount; k++) {
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
					}

					if ((arrayMap[i][j] == 9 || arrayMap[i][j] == 0)
							&& chengecond(i - 1, j, [])
							&& (arrayMap[i - 1][j] != 9)) {
						arrayMap[i][j] = arrayMap[i - 1][j];
						arrayMap[i - 1][j] = 0;
					}
					var num = (j > mid) ? -1 : 1;
					if (arrayMap[blocksHeightCount - 1][j] == 0) {
						for (var g = blocksHeightCount - 1, emptycol = true; g >= 0; g--) {
							if (arrayMap[g][j] != 0) {
								emptycol = false;
								break;
							}
						}
						if (emptycol)
						for (var g = 0; g < blocksHeightCount; g++) {
							if (j + num < blocksWidthCount) {
								arrayMap[g][j] = arrayMap[g][j + num];
								arrayMap[g][j + num] = 0;
							}
						}
						emptycol = true;
					}
					if (arrayMap[i][j] == 9
							&& i != blocksHeightCount - 1) {
						arrayMap[i][j] = 0;
					}
				}
			}
			for (var i = 0; i < blocksHeightCount; i++) {
				for (var k = 0; k < blocksWidthCount; k++) {
					j = WidthArray[k];
						Block = arrayMap[i][j];
						if(Block!=0){
						ctx.fillStyle = (Block != 9) ? colors[Block]
								: "#bdc3c7";
						ctx.fillRect(k * cubeHeight, i * cubeWidth,
								cubeHeight-.4, cubeWidth-.4);
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
			ctx.fillText("point: " + point + "/" + ((blocksHeightCount*blocksWidthCount)-point) + " | moves: " + move + " | time: "
					+ msToTime(end - start), 10, mainMapHeight + 18);
		}, speed);