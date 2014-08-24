var c = document.getElementById("board");
var ctx = c.getContext("2d");
var x = -1, y = -1, moveStep = 5;
var cubeHeight = 25, cubeWidth = 25;

Math.floor($(document).width() /cubeWidth);
var mainMapHeight = cubeHeight * Math.floor(($(document).height()-25)/cubeHeight);
var mainMapWidth = cubeWidth * Math.floor($(document).width()/cubeWidth);
var speed=80;
var gamemode="blocks";
var isNumbersOn="Off";
var point = 0;
var arrayMap = [], lastchange=[], Block = [];
var colors = [ "white", "blue", "green", "red", "yellow" ];
var borders = [ "black", "white", "gray" ];
$("#board").mousedown(function(event) {
	x = event.pageX - this.offsetLeft;
	y = event.pageY - this.offsetLeft;
});

var stats = new Stats();
stats.setMode(1); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.bottom = '0px';

document.body.appendChild( stats.domElement );

$(document)
		.ready(
				function() {
					c.width = mainMapWidth;
					c.height = mainMapHeight+25;
					for (var i = 0; i < mainMapHeight / cubeHeight; i++) {
						arrayMap[i] = [];
						lastchange[i] = [];
						for (var j = 0; j < mainMapWidth / cubeWidth; j++) {
							arrayMap[i][j] = Math
											.floor((Math.random() * (colors.length-1))+1);
							lastchange[i][j] = 100;
						}
					}
				});

function chenge(i, j, arrayMap, temp, count) {
	if(arrayMap[i][j]==0)return;
	temp.push(i + "," + j);
	if (chengecond(i + 1, j, temp)
			&& arrayMap[i + 1][j] == arrayMap[i][j]) {
		count++;
		chenge(i + 1, j, arrayMap, temp, count);
	}
	if (chengecond(i - 1, j, temp)
			&& arrayMap[i - 1][j] == arrayMap[i][j]) {
		count++;
		chenge(i - 1, j, arrayMap, temp, count);
	}
	if (chengecond(i, j + 1, temp)
			&& arrayMap[i][j + 1] == arrayMap[i][j]) {
		count++;
		chenge(i, j + 1, arrayMap, temp, count);
	}
	if (chengecond(i, j - 1, temp)
			&& arrayMap[i][j - 1] == arrayMap[i][j]) {
		count++;
		chenge(i, j - 1, arrayMap, temp, count);
	}
	if (count > 0){
		arrayMap[i][j] = 0;
		point++;
	}
	return;
}
function chengecond(i, j, temp) {
	return ((i < mainMapHeight / cubeHeight && i >= 0
			&& j < mainMapWidth / cubeWidth && j >= 0) && (temp.indexOf(i + ","
			+ j) == -1));
}

setInterval(
		function() {
		stats.begin();
			ctx.clearRect(0, 0, mainMapWidth, mainMapHeight+25);
			ctx.font = "16px Arial";
			for (var i = 0; i < mainMapHeight / cubeHeight; i++) {
				for (var j = 0; j < mainMapWidth / cubeWidth; j++) {
					if(lastchange[i][j]==arrayMap[i][j]){
						Block = arrayMap[i][j];					
						ctx.fillStyle = colors[Block];
						ctx.fillRect(j * cubeHeight + 0, i * cubeWidth + 0, cubeHeight,
								cubeWidth);
						ctx.strokeStyle ="gray";
						ctx.strokeRect(j * cubeHeight + 0, i * cubeWidth + 0, cubeHeight,
								cubeWidth);
						
								/*text*/
						if(isNumbersOn=="On"){
							ctx.fillStyle = "black";
							ctx.fillText(Block,j * cubeHeight + 8 ,i * cubeWidth+18);
						}
					}
					lastchange=arrayMap;
					if (((mainMapWidth/3 <= x) && (x <= (mainMapWidth/3)*2))
							&& ((mainMapHeight+0 <= y) && (y <= mainMapHeight+35))) {
						if(isNumbersOn=="On")
							isNumbersOn="Off";
						else
							isNumbersOn="On";
						x = -1;
						y = -1;
					}
					
					// if(gamemode=="tetris"){
						
					// }
					if(gamemode=="blocks"){
						if ((((x!=0)&&(y!=0))&&(j * cubeWidth + 0 <= x) && (x <= j * cubeWidth + 0 + cubeWidth))
								&& ((i * cubeHeight + 0 <= y) && (y <= i * cubeHeight + 0
										+ cubeHeight))) {
							var temp = [], count = 0;
							chenge(i, j, arrayMap, temp, count);
							x = -1;
							y = -1;
						}
						
						if ((arrayMap[i][j] == 0)&&chengecond(i-1,j,[])){
							arrayMap[i][j]=arrayMap[i-1][j];
							arrayMap[i-1][j] = 0;
						}

					}
				
				}
			
			}
			
			ctx.strokeStyle = 'black';
			ctx.strokeRect(0, 0, mainMapWidth, mainMapHeight);
			ctx.fillStyle = "black";
			ctx.fillText("point: " + point, 10, mainMapHeight+18);
			ctx.fillStyle = "black";
			ctx.fillText("numbers: " + isNumbersOn, mainMapWidth/3, mainMapHeight+18);
		stats.end();
		}, speed);