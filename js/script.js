$(document).ready(function(){

	var user = [];
	var collegeList = [];
	var subjectTests = [];


	$("#infoSection1").hide();
	$("#infoSection2").hide();
	$("#infoSection3").hide();
	$("#infoSection4").hide();
	$("#informationDiv").hide();

	$("#initButton").click(function(){
		$('#1stSection').addClass('animated bounceOutUp');
		$("#1stSection").fadeOut(500);
		$('#infoSection1').show();
		$("#infoSection1").addClass('animated bounceInUp');
	});

	$("#initButton2").click(function(){
		$('#infoSection1').addClass('animated bounceOutUp');
		$("#infoSection1").fadeOut(500);
		$('#infoSection2').show();
		$("#infoSection2").addClass('animated bounceInUp');
		setUpSubjectTestCheckboxes();
	});	


	$("#initButton3").click(function(){
		$('#infoSection2').addClass('animated bounceOutUp');
		$("#infoSection2").fadeOut(500);
		$('#infoSection3').show();
		$("#infoSection3").addClass('animated bounceInUp');

		subjectTests.push($("#sT0").val());
		subjectTests.push($("#sT1").val());
		subjectTests.push($("#sT2").val());
		subjectTests.push($("#sT3").val());
		subjectTests.push($("#sT4").val());
		subjectTests.push($("#sT5").val());
		subjectTests.push($("#sT6").val());
		subjectTests.push($("#sT7").val());
		subjectTests.push($("#sT8").val());
		subjectTests.push($("#sT9").val());
		subjectTests.push($("#sT10").val());
		subjectTests.push($("#sT11").val());
		subjectTests.push($("#sT12").val());
		subjectTests.push($("#sT13").val());
		subjectTests.push($("#sT14").val());
		subjectTests.push($("#sT15").val());
		subjectTests.push($("#sT16").val());
		subjectTests.push($("#sT17").val());
		subjectTests.push($("#sT18").val());
		subjectTests.push($("#sT19").val());
		subjectTests.push($("#sT20").val());
		subjectTests.push($("#sT21").val());
		subjectTests.push($("#sT22").val());



		addECSlots();
	});	

	$("#initButton4").click(function(){
		$('#infoSection3').addClass('animated bounceOutUp');
		$("#infoSection3").fadeOut(500);
		$('#infoSection4').show();
		$("#infoSection4").addClass('animated bounceInUp');
		 $( "#tags" ).autocomplete({
	      source: collegeNames 
	    });
	});	

	$("#generateButton").click(function(){
		user.push($("#firstNameHolder").val()); 	//0
		user.push($("#lastNameHolder").val());		//1
		user.push($("#highSchoolHolder").val());	//2
		user.push($("#gradYearHolder").val());		//3
		user.push($("#majorHolder").val());			//4

		user.push($("#gpaHolder").val());			//5
		user.push($("#WgpaHolder").val());			//6
		user.push($("#satMathHolder").val());		//7
		user.push($("#satCRHolder").val());			//8
		user.push($("#actMathHolder").val());		//9	
		user.push($("#actEnglishHolder").val());	//10	
		user.push($("#actReadingHolder").val());	//11
		user.push($("#actScienceHolder").val());	//12

		user.push($("#ec1").val());					//13
		user.push($("#ec2").val());					//14
		user.push($("#ec3").val());					//15
		user.push($("#ec4").val());					//16
		user.push($("#ec5").val());					//17
		user.push($("#ec6").val());					//18
		user.push($("#ec7").val());					//19
		user.push($("#ec8").val());					//20
		user.push($("#ec9").val());					//21
		user.push($("#ec10").val());				//22
		user.push($("#ec11").val());				//23
		user.push($("#ec12").val());				//24

		user.push(subjectTests); 					//25

		user.push(collegeList);						//26
		user.push($("#totalClassesHolder").val());	//27

		console.log(user);

		$('#infoSection4').addClass('animated bounceOutUp');
		$("#infoSection4").fadeOut(500);
		$("#informationDiv").show();


		var timelineGPA = gpaNeededToMeet(highestGPAFromColleges(user[26]), user[27], calculateYear(user[3]), user[6]);
		var timelineSAT = takeAgainSAT(computeUserSAT(user[7], user[8]), highestSATFromcCollege(user[26]));
		var timelineACT = takeAgainACT(computeUserACT(user[9], user[10], user[11], user[12]), highestACTFromcCollege(user[26]));


		alert(user[9] + " " + user[10] + " " + user[11] + " " + user[12] + " " + timelineACT + " " + highestACTFromcCollege(user[26]));

		//$("#informationDiv").html("First Name: " + user[0] + "\n" + "GPA " + user[5] + "\nW GPA " + user[6] + "GPA Needed " + timelineGPA);

		$(".timeline-item").hover(function () {
		    $(".timeline-item").removeClass("active");
		    $(this).toggleClass("active");
		    $(this).prev(".timeline-item").toggleClass("close");
		    $(this).next(".timeline-item").toggleClass("close");
		});

	});

	$("#addCollegeButton").click(function(){
		var add = true;

		for(var i = 0; i < collegeList.length; i++){
			if(collegeList[i] === $("#tags").val()){
				add = false;
			}
		}

		if(add == true) {
			collegeList.push($("#tags").val());
			$("#collegeNameHolder").html($("#collegeNameHolder").html() + "<a class=\"list-group-item\" style=\"padding: 1%;\">"+ $("#tags").val() + "</a>");
		}
	});

	// Access college list
	/*for(var i = 0; i < list.length; i++){
		console.log(list[i]);
	}*/
});

function setUpSubjectTestCheckboxes(){
	for(var i = 0; i < subjectTestList.length; i++){
		$("#subjectTestCheckHolder").html($("#subjectTestCheckHolder").html() + "<div class=\"form-group col-md-3\"><label class=\"control-label\" for=\"focusedInput\">" + subjectTestList[i][0] + "</label><input class=\"form-control\" id=\"sT" + i + "\" type=\"text\" ></div>")
	}
}

function addECSlots(){
	for(var i = 0; i < 12; i++){
		$("#ecHolders").html($("#ecHolders").html() + "<div class=\"panel panel-primary col-md-3\">            <div class=\"panel-heading\">              <h3 class=\"panel-title\">                <div class=\"form-group\">                <input  style=\"background-color: rgba(0,0,0,0); color:white; outline: none; border: 0;\" type=\"text\" placeholder=\"Activity " + (i+1) + " Title...\">              </div>            </h3>            </div>            <div class=\"panel-body\">              <textarea  style=\"background-color: rgba(0,0,0,0); color:black; outline: none; border: 0;\" type=\"text\" id=\"ec" + (i+1) + "\" placeholder=\"Activity " + (i+1) + " Description...\"></textarea>            </div>        </div>");
	}
}

/* CALCULATIONS */

function calculateYear(num){
	var d = new Date();
	return 4 - (num - d.getFullYear());
}

function gpaNeededToMeet(gpaMAX, numClasses, year, kidGPA){
	console.log(year + " ASDASDAS")
	var gpNeeded = gpaMAX * numClasses/year * 3;
	var gpKid = kidGPA * numClasses;
	return (gpNeeded - gpKid) / (numClasses/year * 3 - numClasses);
}

function highestGPAFromColleges(arr){
	var highestGPA = 0;
	for(var i = 0; i < arr.length; i++){
		console.log(arr[i]);
		for(var j = 0; j < list.length; j++){
			if(arr[i] === list[j][0]){
				console.log(list[j][0]);
				if(highestGPA < list[j][6]){
					highestGPA = list[j][6];
				}
			}
		}
	}
	return highestGPA;
}

function highestSATFromcCollege(arr){
	var highestSAT = 0;
	for(var i = 0; i < arr.length; i++){
		console.log(arr[i]);
		for(var j = 0; j < list.length; j++){
			if(arr[i] === list[j][0]){
				console.log(list[j][0]);
				if(highestSAT < list[j][7]){
					highestSAT = list[j][7];
				}
			}
		}
	}
	return highestSAT;
}

function computeUserSAT(m, r){
	return m + r;
}

function takeAgainSAT(score, highest){
	return !(score >= highest);
}

function highestACTFromcCollege(arr){
	var highestACT = 0;
	for(var i = 0; i < arr.length; i++){
		console.log(arr[i]);
		for(var j = 0; j < list.length; j++){
			if(arr[i] === list[j][0]){
				console.log(list[j][0]);
				if(highestACT < list[j][8]){
					highestACT = list[j][8];
				}
			}
		}
	}
	return highestACT;
}

function computeUserACT(m, r, s, e){
	return Math.round((m + r + s + e)/4);
}

function takeAgainACT(score, highest){
	return !(score >= highest);
}

