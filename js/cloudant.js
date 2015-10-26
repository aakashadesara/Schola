if(connection == true){
	{
	  "cloudantNoSQLDB": {
	    "name": "Cloudant-3s",
	    "label": "cloudantNoSQLDB",
	    "plan": "shared",
	    "credentials": {
	      "username": "someusername",
	      "password": "secret",
	      "host": "myhost-bluemix.cloudant.com",
	      "port": 443,
	      "url": "https://someusername:secret@myhost-bluemix.cloudant.com"
	    }
	  }
	}
}

var map;
var zoomLev = 4;

var qual = 5;

var backgroundAudio = new Audio('assets/interstellar.mp3'); 
var chimeAudio = new Audio('assets/chime.mp3');
var beaconAudio = new Audio('assets/beacon.mp3');


$(document).ready(function(){
	Parse.initialize("f8B2noOhrK2FD7Ou5bQV4DyburFLtVr2EUgsakzD", "iO5enqDZrE1WggyRsR4p8DOBrP4cQ9ciEsIvhhEo");
	
	backgroundAudio.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);
	backgroundAudio.play();


	initMap(35.901258, -79.172182, 43.901258, -71.172182, 2000);
	zoomLev = 1;
	$("#statsBoard").hide();
	$("#playersBoard").hide();
	$("#gameStatsDiv").hide();

	$("#findGame").click(function(){
		$("#beginMap").click(function(){
			$("#beginMap").hide();
			$("#holder_thebuttons").html("<a onClick=\"location.reload()\" class=\"btn btn-primary\">New Save</a>")
			loadUsers($("#gameIdHolder").val());
			loadPictures($("#gameIdHolder").val());
			loadMessages($("#gameIdHolder").val());
			plotPoints($("#gameIdHolder").val());
			
		});

		 $("#gameFindDiv").hide();

		findMap();
	});


	
});

function loadMessages(game){
	var GameScore = Parse.Object.extend("Messages");
	var query = new Parse.Query(GameScore);
	query.equalTo("gameKey", game);
	query.find({
	  success: function(results) {
	    console.log("Successfully retrieved " + results.length + " scores.");
	    // Do something with the returned Parse.Object value
	    for(var i = 0; i < results.length; i++){
	    	var obj = results[i];
	    	$("#holder_messages").html(
	    		"<a class=\"list-group-item\">" +
				"<p class=\"text-primary\"><strong style=\"color: white;\">"+ obj.get("user") +"</strong> - "+ obj.get("message") +"<br><strong style=\"font-size: 70%\">" + obj.createdAt +"</strong></p>"+
				"</a>" + $("#holder_messages").html());
	    }
		
	    
	  },
	  error: function(error) {
	  	$("#gameFindDiv").show();
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}

function findMap(){
	chimeAudio.play();
	//alert($("#gameIdHolder").val());
	var GameScore = Parse.Object.extend("Matches");
	var query = new Parse.Query(GameScore);
	query.equalTo("gameKey", $("#gameIdHolder").val());
	query.find({
	  success: function(results) {
	    //alert("Successfully retrieved " + results.length + " scores.");
	    // Do something with the returned Parse.Object values

	    if(results.length != 1){
	    	$("#gameFindDiv").show();
	    } else {
		    var obj = results[0];
		    initMap(obj.get("gameBounds")[1], obj.get("gameBounds")[0], obj.get("gameBounds")[1], obj.get("gameBounds")[0], obj.get("gameBounds")[2], obj);

		    $("#holder_title").html(obj.get("gameName"));
		    $("#holder_creationDate").html(obj.createdAt);
		    $("#holder_ownerName").html(obj.get("owner"));
		    $("#holder_radius").html(obj.get("gameBounds")[2] + " miles");
	    }


		
	    
	  },
	  error: function(error) {
	  	$("#gameFindDiv").show();
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}


function initMap(x1, y1, x2, y2, r, obj) {
  chimeAudio.play();
  gMapLoad(x1, y1, x2, y2, r, obj);
 
  $("#statsBoard").show();
  $("#playersBoard").show();
  $("#gameStatsDiv").show();
  
}

function gMapLoad(x1, y1, x2, y2, r, obj){
	var customMapType = new google.maps.StyledMapType([
      {
        stylers: [
          {hue: '#196780'},
          {visibility: 'simplified'},
          {gamma: 0},
          {weight: 3}
        ]
      },
      {
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'water',
        stylers: [{color: '#008FB2'}]
      }
    ], {
      name: 'Signa Style'
  });
  var customMapTypeId = 'custom_style';

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoomLev,
    center: {lat: (x1+x2)/2, lng: (y1+y2)/2},  
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    }
  });

  map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true, panControl: false, streetViewControl: false});
  map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);

  google.maps.event.addListener(map, 'bounds_changed', function() {
  	x1 = map.getBounds().getNorthEast().lat();
 	y1 = map.getBounds().getNorthEast().lng();
	x2 = map.getBounds().getSouthWest().lat();
	y2 = map.getBounds().getSouthWest().lng();

	$("#holder_northEastPoint").html( "North East Point: <br>(" + Math.round(map.getBounds().getNorthEast().lng()*1000)/1000 + ", " + Math.round(map.getBounds().getNorthEast().lat()*1000)/1000 + ")");
	$("#holder_southWestPoint").html( "South West Point: <br>(" + Math.round(map.getBounds().getSouthWest().lng()*1000)/1000 + ", " + Math.round(map.getBounds().getSouthWest().lat()*1000)/1000 + ")");



	var dlon = y2 - y2 ;
	var dlat = x2 - x1 ;
	var a = Math.pow((Math.sin(dlat/2)),2) + Math.cos(x1) * Math.cos(x2) * Math.pow((Math.sin(dlon/2)),2);
	var c = 2 * Math.atan( Math.sqrt(a), Math.sqrt(1-a) ); 
	var d = 3959 * c;
	var horiz =  d;

	var dlon = y2 - y1 ;
	var dlat = x2 - x2 ;
	var a = Math.pow((Math.sin(dlat/2)),2) + Math.cos(x1) * Math.cos(x2) * Math.pow((Math.sin(dlon/2)),2);
	var c = 2 * Math.atan( Math.sqrt(a), Math.sqrt(1-a) ); 
	var d = 3959 * c;
	var vertic = d ;

	var centerX = window.innerWidth /2;
	var centerY = window.innerHeight /2;

	$("#holder_centerPoint").html("Center: (" + centerX + "px, " + centerY + "px)");

  	overlayLoad(centerX, centerY, horiz, vertic, r, obj);

     
  });


}

function overlayLoad(centerX, centerY, horiz, vertic, r, obj){

	var c=document.getElementById("mapOverlay");
	c.width = window.innerWidth;
	c.height = window.innerHeight;

	var ctx=c.getContext("2d");
	ctx.beginPath();
	ctx.lineWidth = 4;
	ctx.arc(0,0,50,0,2*Math.PI);
	ctx.fillStyle = "Color.white";
	ctx.stroke();

	addCenter(centerX, centerY, horiz, vertic, r, obj);

	
	
}

function affectsLoad(){}

function setScale(integer){
	if(integer < 10){
		return 1;
	} else if (integer < 100){
		return 10;
	} else if (integer < 1000){
		return 100;
	} else if (integer < 10000){
		return 1000;
	} else if (integer < 100000){
		return 10000;
	}
}

function addCenter(centerX, centerY, horiz, vertic, r, obj){
	var scale = window.innerWidth / horiz * zoomLev;
	//alert(scale);
	//alert(horiz);
	
	var radius = r * scale;
	//alert("Horizontal Distance = " + horiz/zoomLev + "\nVertical Distance = " + vertic/zoomLev);

	while(radius < window.innerHeight/qual){
		zoomLev++;
		map.setZoom(zoomLev);

		x1 = map.getBounds().getNorthEast().lat();
	 	y1 = map.getBounds().getNorthEast().lng();
		x2 = map.getBounds().getSouthWest().lat();
		y2 = map.getBounds().getSouthWest().lng();

		var dlon = y2 - y2 ;
		var dlat = x2 - x1 ;
		var a = Math.pow((Math.sin(dlat/2)),2) + Math.cos(x1) * Math.cos(x2) * Math.pow((Math.sin(dlon/2)),2);
		var c = 2 * Math.atan( Math.sqrt(a), Math.sqrt(1-a) ); 
		var d = 3959 * c;
		horiz =  d;

		var dlon = y2 - y1 ;
		var dlat = x2 - x2 ;
		var a = Math.pow((Math.sin(dlat/2)),2) + Math.cos(x1) * Math.cos(x2) * Math.pow((Math.sin(dlon/2)),2);
		var c = 2 * Math.atan( Math.sqrt(a), Math.sqrt(1-a) ); 
		var d = 3959 * c;
		vertic = d ;

		scale = window.innerHeight / horiz * zoomLev;
		radius = r * scale;
		
	}


	var c=document.getElementById("mapOverlay");
	c.width = window.innerWidth;
	c.height = window.innerHeight;

	var ctx=c.getContext("2d");
	ctx.beginPath();
	ctx.lineWidth = 10;
	ctx.arc(centerX,centerY, radius ,0,2*Math.PI);
	ctx.strokeStyle = "rgb(255,255,255)";
	ctx.stroke();
	ctx.fillStyle = "rgba(51, 204, 255,0.1)";
	ctx.fill();
	ctx.lineWidth = 4;



}

var ycordOLD;
var xcordOLD;
var amex;
var stepCount = 1;

var results;

function plotPoints(game){
	var GameScore = Parse.Object.extend("MatchInfo");
	var query = new Parse.Query(GameScore);
	query.equalTo("gameKey", game);
	query.find({
	  success: function(results) {
	    //alert("Successfully retrieved " + results.length + " scores.");
	    // Do something with the returned Parse.Object values

	    //var zerox = step(results1);
	 
	    	setInterval(function(){step(results);}, 3000);
	    
	    

	   	/*x1 = map.getBounds().getNorthEast().lat(); // lat
	 	y1 = map.getBounds().getNorthEast().lng(); // long
		x2 = map.getBounds().getSouthWest().lat();
		y2 = map.getBounds().getSouthWest().lng();
		var c=document.getElementById("mapOverlay");
		var ctx=c.getContext("2d");
	    for(var i = 0; i < results.length; i++){
	    	var obj = results[i];
	    	var locArr = obj.get("locations");
	    	
	    	var randR = Math.round(Math.random() * 255);
	    	var randG = Math.round(Math.random() * 255);
	    	var randB = Math.round(Math.random() * 255);
	    	var randA = 1;
	    	var newColor = "rgba(" + randR + "," + randG + "," + randB + "," + randA + ")";
	    	console.log(newColor);
	    	obj.set("color", newColor);
	    	$("#holder_color" + obj.get("user")).css("background-color", newColor);
			
	    	obj.save();
	    	ycordOLD = (locArr[1][0]-y1)/(y2-y1) * window.innerHeight ; //long
	    	var xcordOLD = (locArr[1][1]-x1)/(x2-x1) * window.innerWidth ; //lat
	    	//for(amex = 0; amex < locArr.length; ){
	    		
				
			var ycord = (locArr[amex][0]-y1)/(y2-y1) * window.innerHeight ; //long
			var xcord = (locArr[amex][1]-x1)/(x2-x1) * window.innerWidth ; //lat
			console.log(xcord, ycord);
			ctx.beginPath();
			ctx.moveTo(xcordOLD,ycordOLD);
			ctx.strokeStyle = newColor;
			ctx.lineTo(xcord,ycord);
			ctx.stroke();
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.arc(xcord,ycord, 3 ,0,2*Math.PI);
			ctx.strokeStyle = "rgb(0,0,0)";
			ctx.stroke();
			ctx.fillStyle = newColor;
			
			ctx.fill();
			ycordOLD = ycord;
			xcordOLD = xcord;
			setTimeout(inForLoop(), 3000);
				
	    	//}
	    }*/
	    
		
	    
	  },
	  error: function(error) {
	  	$("#gameFindDiv").show();
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}

var ycordOLD;
var xcordOLD;
var colorArr = [];

var lineArr = [];

function step(results){

	beaconAudio.play();

	var maxTot = -1;

	for(var i = 0; i < results.length; i++){
		var loc = results[i].get("locations");
		var tot = 0;
		for(var j = 0; j < loc.length; j++){
			tot+= 5;
		}
		if(tot > maxTot){
			maxTot = tot;
		}
	}
	
	if(maxTot / 5 >= stepCount){
	$("#holder_gameTiming").html("<div class=\"progress-bar\" style=\"width:"+ (stepCount*5/maxTot * 100) +"%\"></div>")

	
	stepCount++;

	x1 = map.getBounds().getNorthEast().lat(); // lat
 	y1 = map.getBounds().getNorthEast().lng(); // long
	x2 = map.getBounds().getSouthWest().lat();
	y2 = map.getBounds().getSouthWest().lng();

	var c=document.getElementById("mapOverlay");
	var ctx=c.getContext("2d");	



	var add = true;
	var g;
	for(g = 0; g < results.length; g++){
		for(var j = 0; j < lineArr.length; j++){
			if(lineArr[j][0] == results[g].get("user")){
				add = false;
			}
		}
		if(add){
		var obj = results[g];
		var a = [obj.get("user") + "",0 + obj.get("locations")[0][0], 0 + obj.get("locations")[0][1], 0];
		lineArr.push(a);
	}
	
		
	}

	
	console.log(lineArr);

	var lineI;

	for(var lineI = 0; lineI < results.length; lineI++){
		for(j = 0; j < lineArr.length; j++){
			if(results[lineI].get("user") == lineArr[j][0]){
				break;
			}
		}


		var obj = results[lineI];

		var locArr = obj.get("locations");
		
		var randR = Math.round(Math.random() * 255);
		var randG = Math.round(Math.random() * 255);
		var randB = Math.round(Math.random() * 255);
		var randA = 1;

		var newColor;

		var add = true;
		for(var a = 0; a < colorArr.length; a++){
			if(colorArr[a][0] == obj.get("user")){
				add = false;
			}
		}
		if(add){
			newColor = "rgba(" + randR + "," + randG + "," + randB + "," + randA + ")";
			console.log(newColor);

			obj.set("color", newColor);
			$("#holder_color" + obj.get("user")).css("background-color", newColor);

			var arr = [obj.get("user"), newColor];
			colorArr.push(arr);
		} else {
			for(var a = 0; a < colorArr.length; a++){
				if(colorArr[a][0] == obj.get("user")){
					newColor = colorArr[a][1];
				}
			}
		}
		
		obj.save();

		var ycord = (locArr[stepCount][0]-y1)/(y2-y1) * window.innerHeight ; //long
		var xcord = (locArr[stepCount][1]-x1)/(x2-x1) * window.innerWidth ; //lat

		if(stepCount == 0)	
			ctx.strokeStyle = "rgb(0,0,0,0)";
		else
			ctx.strokeStyle = "rgb(0,0,0)";
		ctx.beginPath();
		ctx.moveTo(lineArr[lineI][1],lineArr[lineI][2]);
		
		ctx.strokeStyle = newColor;
		ctx.lineTo(xcord,ycord);
		ctx.stroke();

		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.arc(lineArr[lineI][1],lineArr[lineI][2], 5 ,0,2*Math.PI);
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.stroke();
		ctx.fillStyle = newColor;

		if(stepCount >= 1)
			lineArr[lineI][3] += returnMilesDistance(locArr[stepCount-1][0], locArr[stepCount-1][1], locArr[stepCount][0], locArr[stepCount][1]);

		$("#holder_distance" + obj.get("user")).html(Math.round(lineArr[lineI][3]/10*100)/100 + " Miles");
		
		$("#holder_lng" + obj.get("user")).html(Math.round(locArr[stepCount][0] * 10000) / 10000);
		$("#holder_lat" + obj.get("user")).html(Math.round(locArr[stepCount][1] * 10000) / 10000);

		$("#holder_calsBurned" + obj.get("user")).html(Math.round(lineArr[lineI][3]/10*100)/100 * 64 + " Calories");

		ctx.fill();

		lineArr[lineI][1] = xcord;
		lineArr[lineI][2] = ycord;

		console.log(lineArr[lineI][0] + " " + lineArr[lineI][1] + " " + lineArr[lineI][2]);


		if(stepCount < 1){
			lineArr[lineI][2] = (locArr[1][0]-y1)/(y2-y1) * window.innerHeight ; //long
			lineArr[lineI][1] = (locArr[1][1]-x1)/(x2-x1) * window.innerWidth ; //lat
		}

		//for(amex = 0; amex < locArr.length; ){
			
			
		

		//console.log(xcord, ycord);
	
		}
	}
}

function returnMilesDistance(x1, y1, x2, y2){
	var dlon = y2 - y1 ;
	var dlat = x2 - x1 ;
	var a = Math.pow((Math.sin(dlat/2)),2) + Math.cos(x1) * Math.cos(x2) * Math.pow((Math.sin(dlon/2)),2);
	var c = 2 * Math.atan( Math.sqrt(a), Math.sqrt(1-a) ); 
	var d = 3959 * c;

	if(d > 0)
		return d;
	else
		return 0;
}

function sortByCalories(){
	console.log("Sorted");
}

function loadPictures(game){
	var GameScore = Parse.Object.extend("Pictures");
	var query = new Parse.Query(GameScore);
	query.equalTo("gameKey", game);
	query.find({
	  success: function(results) {
	  	for(var i = 0; i < results.length; i++){
	  		var obj = results[i];
	  		var prof = obj.get("image");
	  		$("#holder_pictures").html($("#holder_pictures").html() + "<img src=\""+prof.url()+"\" width=\"100%\" class=\"img-rounded\">");
	  	}
	    
		
	    
	  },
	  error: function(error) {
	  	$("#gameFindDiv").show();
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}

function loadUsers(game){
	console.log("LOADING USERS");
	var GameScore = Parse.Object.extend("MatchInfo");
	var query = new Parse.Query(GameScore);
	query.equalTo("gameKey", game);
	query.find({
	  success: function(results) {
	    console.log("Successfully retrieved " + results.length + " scores.");
	    // Do something with the returned Parse.Object value
	    $("#playerHolder").html("");
	    for(var i = 0; i < results.length; i++){
	    	var obj = results[i];

	    	var query1 = new Parse.Query(Parse.User);
			query1.equalTo("username", obj.get("user"));  
			query1.find({
			  success: function(result) {
			    // Do stuff
			    //alert(results.length);
			    var obj1 = result[0];
			    var prof = obj1.get("profilePicture");
			    $("#playerHolder").html($("#playerHolder").html() +  
	    		"<div class=\"panel panel-default\">"+
	    		"<div class=\"panel-body\">"+"<div class=\"list-group\" style=\"text-align: center;\">"+
	    		"<a class=\"list-group-item active\"  style=\"background-color: white; color: black;\">"+ "<img src=\""+prof.url()+"\" width=\"50px\" class=\"img-circle\"><br>" + 
	    		obj1.get("username") +"<br><span class=\"label label-warning\" id=\"holder_color" + obj1.get("username") + "\"> </span><span class=\"label label-info\" id=\"holder_position" + obj1.get("username") +"\"> </span> <br>"+
	    		"</a>"+
	    		"<a class=\"list-group-item\"> <span class=\"badge\" id=\"holder_lng" + obj1.get("username") + "\"></span> <span class=\"badge\" id=\"holder_lat" + obj1.get("username") + "\"></span> <br>"+
	    		"</a>"+
	    		"<a href=\"#\" class=\"list-group-item\"> <span class=\"label label-success\" id=\"holder_distance" + obj1.get("username") + "\"> </span> <span class=\"label label-danger\" id=\"holder_calsBurned" + obj1.get("username") + "\"> </span>"+
	    		"</a>"+
	    		"</div>"+"</div>"+
	    		"</div>");

			  	getPosition(obj1.get("username"), game);

			  }
			});

	    	
	    }

		
	    
	  },
	  error: function(error) {
	  	$("#gameFindDiv").show();
	    alert("Error: " + error.code + " " + error.message);
	  }
	});

}

var connection = false;

function getPosition(user, game){
	var GameScore = Parse.Object.extend("MatchInfo");
	var query = new Parse.Query(GameScore);
	query.equalTo("gameKey", game);
	query.equalTo("user", user);
	query.find({
	  success: function(results) {
	    console.log("Successfully retrieved " + results.length + " scores.");
	    // Do something with the returned Parse.Object value
	    alert(results[0].get("position"));
	    var obj = results[0];
	    $("#holder_position" + obj.get("user")).html(results[0].get("position"));
	    
	  },
	  error: function(error) {
	  	$("#gameFindDiv").show();
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}