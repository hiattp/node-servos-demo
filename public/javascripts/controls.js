var socket = io.connect("http://localhost:3000");
var panState = 90;

$(document).keydown(function(event){
	var key = event.which;
	if(key == 37 || key == 39) sendMovement(key);
});

// This function checks to make sure the servo is within 
// its 0-180 range before sending instructions.
function sendMovement(keynum){
	switch(keynum){
		case 37:
			if(panState > 0) socket.emit("pan left");
			panState--;
			break;
		case 39:
			if(panState < 180) socket.emit("pan right");
			panState++;
			break;
	}
}