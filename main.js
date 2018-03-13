$(document).ready(function () {
	// var frameDisp = $('#output')

	if ('speechSynthesis' in window) {
		console.log("speech Synthesis present")
		var msg = new SpeechSynthesisUtterance('Meri bandi hai');
		window.speechSynthesis.speak(msg);

	   }
	
	   typeWriter();
	

	   
	var controller = new Leap.Controller({
		host: '127.0.0.1',
		port: 6437,
		frameEventName: 'animationFrame',
		useAllPlugins: false,
		optimizeHMD: true,
		loopWhileDisconnected: false,
		enableGestures: true
	});

	// var controller = new Leap.Controller()

	// controller.connect()

	const fingers = ["THUMB", "INDEX", "MIDDLE", "RING", "PINKY"]
	var testSocket = new WebSocket("ws://192.168.31.190:8761")
	var data = [];
	var diff_finger_bones = Leap.vec3.create();
	var crossProd = Leap.vec3.create();
	$('#close').on('click', function () {
		controller.disconnect()
		testSocket.close()
	})
	$('#start').on('click', function () {
		controller.connect()
	})
	console.log()
	controller.on('connect', function () {
		var frame = controller.frame()
		// frame.use()
		// console.log("Sup")
		// if (frame.hands.length > 0) {
		// }


	})

	controller.on('frame', function (frame) {
		if (frame.hands.length > 0) {
			var hand = frame.hands[0]
			frame.hands[0].fingers.forEach(fingers => {
				// console.log(fingers.bones)
				// testSocket.send("Fingers position: "+fingers.direction)
			});

			var pitch = hand.pitch()
			var roll = hand.roll()
			var yaw = hand.yaw() 
			var thumb = hand.fingers[0].tipPosition
			var indexF = hand.fingers[1].tipPosition
			var middleF = hand.fingers[2].tipPosition
			var ringF = hand.fingers[3].tipPosition
			var pinkyF = hand.fingers[4].tipPosition
			var palmVelocity = hand.palmVelocity;
			var palmNormal = hand.palmNormal;
			var palmPosition = hand.palmPosition;
			

			data.push(hand.palmVelocity);
			data.push(palmPosition)
			data.push(palmNormal)
			data.push(pitch)
			data.push(roll)
			data.push(yaw)
			data.push(thumb)
			data.push(indexF)
			data.push(middleF)
			data.push(ringF)
			data.push(pinkyF)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[0].pipPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[0].dipPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[0].tipPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[1].mcpPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[1].pipPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[1].dipPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[1].tipPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[2].mcpPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[2].pipPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[2].dipPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[2].tipPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[3].mcpPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[3].pipPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[3].dipPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[3].tipPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[4].mcpPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[4].pipPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[4].dipPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			Leap.vec3.subtract(diff_finger_bones, hand.fingers[4].tipPosition, hand.palmPosition)
			data.push(diff_finger_bones)
			crossProd = Leap.vec3.dot(thumb, indexF)
			data.push(crossProd/(magnitude(thumb)*magnitude(indexF)))
			crossProd = Leap.vec3.dot(indexF, ringF)
			data.push(crossProd/(magnitude(indexF)*magnitude(ringF)))
			crossProd = Leap.vec3.dot(ringF, pinkyF)
			data.push(crossProd/(magnitude(ringF)*magnitude(pinkyF)))

			data.push(",")
			testSocket.send(data)
			// console.log(data)
			data = []
			// testSocket.send(hand.palmVelocity)
			
			// console.log("pitch: "+pitch+" roll: "+roll+" yaw: "+yaw)
			// console.log("Carp Position: "+ frame.hands[0].fingers[0].carpPosition)
			// console.log("Distal Position: "+ frame.hands[0].fingers[0].dipPosition)
			// console.log("Pinky: "+pinkyF.direction)		
			// console.log("PalM Velocity: "+frame.hands[0].palmVelocity)
			
			var palmNormal = frame.hands[0].palmNormal
			// console.log("Palm Normal: "+palmNormal)
			
		}
	})

})

function magnitude(arr){
	square = 0
	arr.forEach(ele =>{
		square = square + (ele*ele);
	})
	return Math.sqrt(square)

}

var c = 0
var title = "Sarthi"
var speed = 100

function typeWriter(){

	if(c<title.length){
	document.getElementById("head").innerHTML += title.charAt(c);
	c++;
	setTimeout(typeWriter, speed)
	}
	
}