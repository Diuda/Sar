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
	var testSocket = new WebSocket("ws://192.168.31.8:8761")

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
		// console.log("Sup")
		// if (frame.hands.length > 0) {
		// }


	})

	controller.on('frame', function (frame) {
		// console.log(frame.hands.length)
		if (frame.hands.length > 0) {
			console.log('SUP')
			testSocket.send('Palm Position: ' + frame.hands[0].palmPosition + '  Palm Velocity: ' + frame.hands[0].palmVelocity + ' Hand Direction: ' + frame.hands[0].direction + "\r\n")

			frame.hands[0].finger.forEach(fingers => {
				console.log(fingers)
			});
			var palmNormal = frame.hands[0].palmNormal
			
		}
	})

})