$(document).ready(function(){
	$("#YOLOPAD").click(function(){
		var preString = $("#theSwag1").val();
		var newString = "";

		for(var i = 0; i < preString.length; i++){
			var zig = preString.nextLine();
			alert(zig);
		}
	})


});