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
var point = 0,move=0; 
var start, end;
var arrayMap = [], Block;
var colors = [ "#ecf0f1", "#3498db", "#2ecc71", "#e74c3c", "#ffc40f" ];
var borders = [ "black", "white", "gray" ];
$("#board").mousedown(function(event) {
	x = event.pageX - this.offsetLeft;
	y = event.pageY - this.offsetLeft;
});


$(document).ready(startNewGame());
function startNewGame() {
					c.width = mainMapWidth;
					c.height = mainMapHeight+25;
					for (var i = 0; i < mainMapHeight / cubeHeight; i++) {
						arrayMap[i] = [];
						for (var j = 0; j < mainMapWidth / cubeWidth; j++) {
							arrayMap[i][j] = Math
											.floor((Math.random() * (colors.length-1))+1);
							start = new Date().getTime();
						}
					}
				}
function chenge(i, j, arrayMap, temp, count) {
	if(arrayMap[i][j]==0)return;
	temp.push(i + "," + j);
	if (chengecond(i+1, j, temp)
			&& arrayMap[i+1][j] == arrayMap[i][j]) {
		count++;
		chenge(i+1, j, arrayMap, temp, count);
	}
	if (chengecond(i-1, j, temp)
			&& arrayMap[i-1][j] == arrayMap[i][j]) {
		count++;
		chenge(i-1, j, arrayMap, temp, count);
	}
	if (chengecond(i, patcond(j+1, (mainMapWidth / cubeWidth), "end"), temp)
			&& arrayMap[i][patcond(j+1, (mainMapWidth / cubeWidth), "end")] == arrayMap[i][j]) {
		count++;
		chenge(i, patcond(j+1, (mainMapWidth / cubeWidth), "end"), arrayMap, temp, count);
	}
	if (chengecond(i, patcond(j-1, (mainMapWidth / cubeWidth), "start"), temp)
			&& arrayMap[i][patcond(j-1, (mainMapWidth / cubeWidth), "start")] == arrayMap[i][j]) {
		count++;
		chenge(i, patcond(j-1, (mainMapWidth / cubeWidth), "start"), arrayMap, temp, count);
	}
	if (count > 0){
		arrayMap[i][j] = 9;
		point++;
		return true;
	}
	return false;
}
function chengecond(i, j, temp) {
	return ((i < mainMapHeight / cubeHeight && i >= 0) && (temp.indexOf(i + "," + j) == -1));
}
function patcond(ji, num, location) {
	if(location=="end"&&ji >= num)return ji-num;
	if(location=="start"&&ji < 0 )return ji+num;
	return ji;
}
function msToTime(duration) {
	var milliseconds = parseInt((duration%1000)/100)
		, seconds = parseInt((duration/1000)%60)
		, minutes = parseInt((duration/(1000*60)));

	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	return  minutes + ":" + seconds;
}
setInterval(
		function() {
			ctx.clearRect(0, 0, mainMapWidth, mainMapHeight+25);
			ctx.font = "16px Arial";
			for (var i = 0; i < mainMapHeight / cubeHeight; i++) {
				for (var j = 0; j < mainMapWidth / cubeWidth; j++) {

						Block = arrayMap[i][j];					
						ctx.fillStyle = (Block!=9)?colors[Block]:"#bdc3c7";
						ctx.fillRect(j * cubeHeight + 0, i * cubeWidth + 0, cubeHeight,
								cubeWidth);
						if ((((x!=0)&&(y!=0))&&(j * cubeWidth + 0 <= x) && (x <= j * cubeWidth + 0 + cubeWidth))
								&& ((i * cubeHeight + 0 <= y) && (y <= i * cubeHeight + 0
										+ cubeHeight))) {
							var temp = [], count = 0;
							move+=(chenge(i, j, arrayMap, temp, count))?1:0;
							x = -1;
							y = -1;
							
						}
						
						if ((arrayMap[i][j] == 9||arrayMap[i][j] == 0)&&chengecond(i-1,j,[])&&(arrayMap[i-1][j] != 9)){
							arrayMap[i][j]=arrayMap[i-1][j];
							arrayMap[i-1][j] = 0;
						}
						if (arrayMap[(mainMapHeight / cubeHeight)-1][j]==0){
							for (var k = 0; k < mainMapHeight / cubeHeight; k++) {
								if(j+1 < mainMapWidth / cubeWidth){
									arrayMap[k][j] = arrayMap[k][j+1];
									arrayMap[k][j+1]=0;
								}
							}
						}
						if(arrayMap[i][j] == 9&&i!=(mainMapHeight / cubeHeight)-1)arrayMap[i][j] = 0;
				
				}
			
			}
			end = new Date().getTime();
			ctx.strokeStyle = 'black';
			ctx.strokeRect(0, 0, mainMapWidth, mainMapHeight);
			ctx.fillStyle = "#000";
			ctx.fillText("point: " + point+" | moves: " + move+" | time: "+msToTime(end - start), 10, mainMapHeight+18);
		}, speed);