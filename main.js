$(document).ready(function () {
	// var frameDisp = $('#output')
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
			var indexF = hand.indexFinger
			var middleF = hand.middleFinger
			var ringF = hand.ringFinger
			var pinkyF = hand.pinky;

			data.push(hand.palmVelocity);
			data.push('$')
			// data.push(pinkyF.direction)
			testSocket.send(data)
			// testSocket.send(hand.palmVelocity)
			console.log(data)
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