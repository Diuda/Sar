$(document).ready(function () {
	// var frameDisp = $('#output')


	
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
	var testSocket = new WebSocket("ws://localhost:8761")
	var data = [];
	var headers;
	var diff_finger_bones1 = Leap.vec3.create();
	var diff_finger_bones2 = Leap.vec3.create();
	var diff_finger_bones3 = Leap.vec3.create();
	var diff_finger_bones4 = Leap.vec3.create();
	var diff_finger_bones5 = Leap.vec3.create();
	var diff_finger_bones6 = Leap.vec3.create();
	var diff_finger_bones7 = Leap.vec3.create();
	var diff_finger_bones8 = Leap.vec3.create();
	var diff_finger_bones9 = Leap.vec3.create();
	var diff_finger_bones10 = Leap.vec3.create();
	var diff_finger_bones11 = Leap.vec3.create();
	var diff_finger_bones12 = Leap.vec3.create();
	var diff_finger_bones13 = Leap.vec3.create();
	var diff_finger_bones14 = Leap.vec3.create();
	var diff_finger_bones15 = Leap.vec3.create();
	var diff_finger_bones16 = Leap.vec3.create();
	var diff_finger_bones17 = Leap.vec3.create();
	var diff_finger_bones18 = Leap.vec3.create();
	var diff_finger_bones19 = Leap.vec3.create();
	var thumbAngle = Leap.vec3.create();
	var indexAngle = Leap.vec3.create();
	var pinkyAngle = Leap.vec3.create();
	var ringAngle = Leap.vec3.create();
	var angle1;
	var angle2;
	var angle3;
	$('#close').on('click', function () {
		controller.disconnect()
		testSocket.close()
	})
	$('#start').on('click', function () {
		controller.connect()
	})

	controller.on('connect', function () {
		var frame = controller.frame()


	})

	controller.on('frame', function (frame) {
		if (frame.hands.length > 0) {
			var hand = frame.hands[0]
			frame.hands[0].fingers.forEach(fingers => {
				// console.log(fingers.bones)
			});

			var pitch = hand.pitch()
			var roll = hand.roll()
			var yaw = hand.yaw() 
			var thumb = hand.fingers[0].direction
			var indexF = hand.fingers[1].direction
			var middleF = hand.fingers[2].direction
			var ringF = hand.fingers[3].direction
			var pinkyF = hand.fingers[4].direction
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
			Leap.vec3.subtract(diff_finger_bones1, hand.fingers[0].pipPosition, hand.palmPosition)
			data.push(diff_finger_bones1)
			Leap.vec3.subtract(diff_finger_bones2, hand.fingers[0].dipPosition, hand.palmPosition)
			data.push(diff_finger_bones2)
			Leap.vec3.subtract(diff_finger_bones3, hand.fingers[0].tipPosition, hand.palmPosition)
			data.push(diff_finger_bones3)
			Leap.vec3.subtract(diff_finger_bones4, hand.fingers[1].mcpPosition, hand.palmPosition)
			data.push(diff_finger_bones4)
			Leap.vec3.subtract(diff_finger_bones5, hand.fingers[1].pipPosition, hand.palmPosition)
			data.push(diff_finger_bones5)
			Leap.vec3.subtract(diff_finger_bones6, hand.fingers[1].dipPosition, hand.palmPosition)
			data.push(diff_finger_bones6)
			Leap.vec3.subtract(diff_finger_bones7, hand.fingers[1].tipPosition, hand.palmPosition)
			data.push(diff_finger_bones7)
			Leap.vec3.subtract(diff_finger_bones8, hand.fingers[2].mcpPosition, hand.palmPosition)
			data.push(diff_finger_bones8)
			Leap.vec3.subtract(diff_finger_bones9, hand.fingers[2].pipPosition, hand.palmPosition)
			data.push(diff_finger_bones9)
			Leap.vec3.subtract(diff_finger_bones10, hand.fingers[2].dipPosition, hand.palmPosition)
			data.push(diff_finger_bones10)
			Leap.vec3.subtract(diff_finger_bones11, hand.fingers[2].tipPosition, hand.palmPosition)
			data.push(diff_finger_bones11)
			Leap.vec3.subtract(diff_finger_bones12, hand.fingers[3].mcpPosition, hand.palmPosition)
			data.push(diff_finger_bones12)
			Leap.vec3.subtract(diff_finger_bones13, hand.fingers[3].pipPosition, hand.palmPosition)
			data.push(diff_finger_bones13)
			Leap.vec3.subtract(diff_finger_bones14, hand.fingers[3].dipPosition, hand.palmPosition)
			data.push(diff_finger_bones14)
			Leap.vec3.subtract(diff_finger_bones15, hand.fingers[3].tipPosition, hand.palmPosition)
			data.push(diff_finger_bones15)
			Leap.vec3.subtract(diff_finger_bones16, hand.fingers[4].mcpPosition, hand.palmPosition)
			data.push(diff_finger_bones16)
			Leap.vec3.subtract(diff_finger_bones17, hand.fingers[4].pipPosition, hand.palmPosition)
			data.push(diff_finger_bones17)
			Leap.vec3.subtract(diff_finger_bones18, hand.fingers[4].dipPosition, hand.palmPosition)
			data.push(diff_finger_bones18)
			Leap.vec3.subtract(diff_finger_bones19, hand.fingers[4].tipPosition, hand.palmPosition)
			data.push(diff_finger_bones19)
			
		
			data.push(Math.acos((Leap.vec3.dot(thumb, indexF))/(magnitude(thumb)*magnitude(indexF))))
			data.push(Math.acos((Leap.vec3.dot(indexF, ringF))/(magnitude(indexF)*magnitude(ringF))))
			data.push(Math.acos((Leap.vec3.dot(ringF, pinkyF))/(magnitude(ringF)*magnitude(pinkyF))))


			data.push(",")
			testSocket.send(data)
			data = []

			
			
		}

		
	})

	testSocket.onmessage = function (event){
		console.log(event.data)
		document.getElementById("textval").innerHTML = event.data;
		// var msg = new SpeechSynthesisUtterance(event.data);
		// window.speechSynthesis.speak(msg);

		bingcall(event.data)

		

	}

})

function magnitude(arr){
	square = 0
	arr.forEach(ele =>{
		square = square + (ele*ele);
	})
	return Math.sqrt(square)

}


function bingcall(text){

	//Get you Authorization Bearer and put it in Headers
	// put your bing api key here
	headers1 = {'Ocp-Apim-Subscription-Key': ''}
	//getting jwt token
	$.ajax({
		url: "https://api.cognitive.microsoft.com/sts/v1.0/issueToken",
		type: "POST",
		headers: headers1,
		error: function(error){
			alert(error)
		},
		success: function(data){
			headers = {'X-Microsoft-OutputFormat': 'riff-8khz-8bit-mono-mulaw', 'Content-Type': 'application/ssml+xml','Authorization': 'Bearer '+data}
			$.ajax({
				url: "https://speech.platform.bing.com/synthesize",
				type: "POST",
				headers: headers,
				responseType: "arraybuffer",
				data: "<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female' name='Microsoft Server Speech Text to Speech Voice (en-US, ZiraRUS)'>"+text+"</voice></speak>",
				error: function () {
					console.log("Error Occured");
				},
				success: function (data) {
					// console.log()
					window.AudioContext = window.AudioContext || window.webkitAudioContext;
					var context = new AudioContext();
		
					// var soundBuffer = context.createBuffer(str2ab(data), true)
					
					context.decodeAudioData(str2ab(data), function(buffer) {
						console.log("hello")
						console.log(buffer)
						  var source = context.createBufferSource();
						  source.buffer = buffer;
						  source.connect(context.destination);
						  source.start(0);
					}, function(error){
						console.log(error)
					});
				}
			})

		}
	})
	
		

}

var c = 0
var title = "Saarthi"
var speed = 100

function str2ab(str) {
	var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
	var bufView = new Uint8Array(buf);
	for (var i=0, strLen=str.length; i < strLen; i++) {
	  bufView[i] = str.charCodeAt(i);
	}
	return buf;
  }
  

function typeWriter(){

	if(c<title.length){
	document.getElementById("head").innerHTML += title.charAt(c);
	c++;
	setTimeout(typeWriter, speed)
	}
	
}






