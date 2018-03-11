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

			frame.hands[0].fingers.forEach(fingers => {
				console.log(fingers.direction)
				testSocket.send("Fingers position: "+fingers.direction)
			});
			console.log("PalM Velocity: "+frame.hands[0].palmVelocity)
			var palmNormal = frame.hands[0].palmNormal
			console.log("Palm Normal: "+palmNormal)
			
		}
	})

})