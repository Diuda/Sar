$(document).ready(function(){
	var cats = {}
	Leap.loop(function(frame){
		frame.hands.forEach(function(hand, index){
			console.log(hand)
		})
	})
})