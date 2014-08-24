var c = document.getElementById("board");
var ctx = c.getContext("2d");
ctx.font = "16px Arial";
var x = 1, y = 1, moveStep = 5;
var cubeHight = 25, cubeWidth = 25;

Math.floor($(document).width() /cubeWidth);
var mainMapHight = cubeHight * Math.floor(($(document).height()-25)/cubeHight);
var mainMapWidth = cubeWidth * Math.floor($(document).width() /cubeWidth);
var speed=80;
var gamemode="blocks";
var isNumbersOn="Off";
var point = 0;
var arrayMap = [], lastchange=[], arrayBlock = [];
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
					c.height = mainMapHight+25;
					for (var i = 0; i < mainMapHight / cubeHight; i++) {
						arrayMap[i] = [];
						for (var j = 0; j < mainMapWidth / cubeWidth; j++) {
							arrayMap[i][j] = Math
											.floor((Math.random() * (colors.length-1))+1);
						}
					}
					lastchange=arrayMap;
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
	return ((i < mainMapHight / cubeHight && i >= 0
			&& j < mainMapWidth / cubeWidth && j >= 0) && (temp.indexOf(i + ","
			+ j) == -1));
}

setInterval(
		function() {
		stats.begin();
			ctx.clearRect(0, 0, mainMapWidth, mainMapHight+25);
			ctx.font = "16px Arial";
			for (var i = 0; i < mainMapHight / cubeHight; i++) {
				for (var j = 0; j < mainMapWidth / cubeWidth; j++) {
					if(lastchange[i][j]==arrayMap[i][j]){
						arrayBlock = arrayMap[i][j];					
						ctx.fillStyle = (arrayBlock==0)?"white":colors[arrayBlock];
						ctx.fillRect(j * cubeHight + 0, i * cubeWidth + 0, cubeHight,
								cubeWidth);
						ctx.strokeStyle ="gray";
						ctx.strokeRect(j * cubeHight + 0, i * cubeWidth + 0, cubeHight,
								cubeWidth);
						
								/*text*/
						if(isNumbersOn=="On"){
							ctx.fillStyle = "black";
							ctx.fillText(arrayBlock,j * cubeHight + 8 ,i * cubeWidth+18);
						}
					}
					lastchange=arrayMap;
					if (((mainMapWidth/3 <= x) && (x <= (mainMapWidth/3)*2))
							&& ((mainMapHight+0 <= y) && (y <= mainMapHight+35))) {
						if(isNumbersOn=="On")
							isNumbersOn="Off";
						else
							isNumbersOn="On";
						x = 0;
						y = 0;
					}
					
					if(gamemode=="tetris"){
						
					}
					if(gamemode=="blocks"){
						if (((x!=0&&y!=0)&&(j * cubeWidth + 0 <= x) && (x <= j * cubeWidth + 0 + cubeWidth))
								&& ((i * cubeHight + 0 <= y) && (y <= i * cubeHight + 0
										+ cubeHight))) {
							var temp = [], count = 0;
							chenge(i, j, arrayMap, temp, count);
							x = 0;
							y = 0;
						}
						
						if ((arrayMap[i][j] == 0)&&chengecond(i-1,j,[])){
							arrayMap[i][j]=arrayMap[i-1][j];
							arrayMap[i-1][j] = 0;
						}

					}
				
				}
			
			}
			
			ctx.strokeStyle = 'blak';
			ctx.strokeRect(0, 0, mainMapWidth, mainMapHight);
			ctx.fillStyle = "black";
			ctx.fillText("point: " + point, 10, mainMapHight+18);
			ctx.fillStyle = "black";
			ctx.fillText("numbers: " + isNumbersOn, mainMapWidth/3, mainMapHight+18);
		stats.end();
		}, speed);