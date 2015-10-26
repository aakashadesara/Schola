var user;

$(document).ready(function(){

	document.onkeydown = function() {
		var audio = new Audio('assets/type.wav');
		audio.play();
	}

	user = [];
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

		for(var i = 0; i < majorList.length; i++){
			$("#majorHolder").html($("#majorHolder").html() + "<option>" + majorNames[i] + "</option>");
		}

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

		user.push($("#ecMini1").val() + " " + $("#ec1").val());					//13
		user.push($("#ecMini2").val() + " " + $("#ec2").val());					//14
		user.push($("#ecMini3").val() + " " + $("#ec3").val());					//15
		user.push($("#ecMini4").val() + " " + $("#ec4").val());					//16
		user.push($("#ecMini5").val() + " " + $("#ec5").val());					//17
		user.push($("#ecMini6").val() + " " + $("#ec6").val());					//18
		user.push($("#ecMini7").val() + " " + $("#ec7").val());					//19
		user.push($("#ecMini8").val() + " " + $("#ec8").val());					//20
		user.push($("#ecMini9").val() + " " + $("#ec9").val());					//21
		user.push($("#ecMini10").val() + " " + $("#ec10").val());				//22
		user.push($("#ecMini11").val() + " " + $("#ec11").val());				//23
		user.push($("#ecMini12").val() + " " + $("#ec12").val());				//24

		user.push(subjectTests); 					//25

		user.push(collegeList);						//26
		user.push($("#totalClassesHolder").val());	//27

		//console.log(user);

		$('#infoSection4').addClass('animated bounceOutUp');
		$("#infoSection4").fadeOut(500);
		$("#informationDiv").show();

		generateTimeline();

		var timelineGPA = gpaNeededToMeet(highestGPAFromColleges(user[26]), user[27], calculateYear(user[3]), user[6]);
		var timelineSAT = takeAgainSAT(computeUserSAT(user[7], user[8]), highestSATFromcCollege(user[26]));
		var timelineACT = takeAgainACT(computeUserACT(user[9], user[10], user[11], user[12]), highestACTFromcCollege(user[26]));


		console.log(user[9] + " " + user[10] + " " + user[11] + " " + user[12] + " " + timelineACT + " " + highestACTFromcCollege(user[26]));

		//$("#informationDiv").html("First Name: " + user[0] + "\n" + "GPA " + user[5] + "\nW GPA " + user[6] + "GPA Needed " + timelineGPA);

		

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
		//console.log(list[i]);
	}*/
});

function setUpSubjectTestCheckboxes(){
	for(var i = 0; i < subjectTestList.length; i++){
		$("#subjectTestCheckHolder").html($("#subjectTestCheckHolder").html() + "<div class=\"form-group col-md-3\"><label class=\"control-label\" for=\"focusedInput\">" + subjectTestList[i][0] + "</label><input class=\"form-control\" id=\"sT" + i + "\" type=\"text\" ></div>")
	}
}

function addECSlots(){
	for(var i = 0; i < 12; i++){
		$("#ecHolders").html($("#ecHolders").html() + "<div class=\"panel panel-primary col-md-3\">            <div class=\"panel-heading\">              <h3 class=\"panel-title\">                <div class=\"form-group\">                <input  id=\"ecMini" + (i+1) + "\" style=\"background-color: rgba(0,0,0,0); color:white; outline: none; border: 0;\" type=\"text\" placeholder=\"Activity " + (i+1) + " Title...\">              </div>            </h3>            </div>            <div class=\"panel-body\">              <textarea  style=\"background-color: rgba(0,0,0,0); color:black; outline: none; border: 0;\" type=\"text\" id=\"ec" + (i+1) + "\" placeholder=\"Activity " + (i+1) + " Description...\"></textarea>            </div>        </div>");
	}
}

/* CALCULATIONS */

function calculateYear(num){
	var d = new Date();
	return 4 - (num - d.getFullYear());
}

function gpaNeededToMeet(gpaMAX, numClasses, year, kidGPA){
	//console.log(year + " ASDASDAS")
	var gpNeeded = gpaMAX * numClasses/year * 3;
	var gpKid = kidGPA * numClasses;
	return (gpNeeded - gpKid) / (numClasses/year * 3 - numClasses);
}

function highestGPAFromCollegesName(arr){
	var highestGPA = 0;
	var z = 0;
	for(var i = 0; i < arr.length; i++){
		//console.log(arr[i]);
		for(var j = 0; j < list.length; j++){
			if(arr[i] === list[j][0]){
				//console.log(list[j][0]);
				if(highestGPA < list[j][6]){
					highestGPA = list[j][6];
					z = j;
				}
			}
		}
	}
	return list[z][0];
}



function highestGPAFromColleges(arr){
	var highestGPA = 0;
	for(var i = 0; i < arr.length; i++){
		//console.log(arr[i]);
		for(var j = 0; j < list.length; j++){
			if(arr[i] === list[j][0]){
				//console.log(list[j][0]);
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
		//console.log(arr[i]);
		for(var j = 0; j < list.length; j++){
			if(arr[i] === list[j][0]){
				//console.log(list[j][0]);
				if(highestSAT < list[j][7]){
					highestSAT = list[j][7];
				}
			}
		}
	}
	return highestSAT;
}

function computeUserSAT(m, r){
	return parseInt(m) + parseInt(r);
}

function takeAgainSAT(score, highest){
	return !(score >= highest);
}

function highestACTFromcCollege(arr){
	var highestACT = 0;
	for(var i = 0; i < arr.length; i++){
		//console.log(arr[i]);
		for(var j = 0; j < list.length; j++){
			if(arr[i] === list[j][0]){
				//console.log(list[j][0]);
				if(highestACT < list[j][8]){
					highestACT = list[j][8];
				}
			}
		}
	}
	return highestACT;
}

function computeUserACT(m, r, s, e){
	return Math.floor((parseInt(m) + parseInt(r) + parseInt(s) + parseInt(e))/4);
}

function takeAgainACT(score, highest){
	return !(score >= highest);
}

var ecArray = [];

function makeECArray(){
	ecArray.push(user[13]);
	ecArray.push(user[14]);
	ecArray.push(user[15]);
	ecArray.push(user[16]);
	ecArray.push(user[17]);
	ecArray.push(user[18]);
	ecArray.push(user[19]);
	ecArray.push(user[20]);
	ecArray.push(user[21]);
	ecArray.push(user[22]);
	ecArray.push(user[23]);
	ecArray.push(user[24]);
}

/* TimeLine Generator */


function generateTimeline(){

	$("#getNameHolder").html(user[0] + " " + user[1]);

	console.log(user);
	//console.log("Current year: " + calculateYear(user[3]));
	
	var totalEC = 0;
	for(var i = 13; i < 25; i++)
		totalEC += extraCurricularCalculator(user[i]);
	
	console.log(totalEC);

	makeFreshman();
	makeSophomore();
	makeJunior();
	makeSenior();
	
	
		
	$(".timeline-item").hover(function () {
		    $(".timeline-item").removeClass("active");
		    $(this).toggleClass("active");
		    $(this).prev(".timeline-item").toggleClass("close");
		    $(this).next(".timeline-item").toggleClass("close");
		});
}

function ecStringGenerator(str){
	for(var i = 0; i < majorNames.length; i++){
		if(str === majorList[i][0]){
			var r = Math.floor(Math.random() * ecPromptsStart.length);
			
			return ecPromptsStart[r][0] + user[4] + ecPromptsStart[r][1] + majorList[i][1][Math.floor(Math.random() * majorList[i][1].length)] + ", "+ majorList[i][1][Math.floor(Math.random() * majorList[i][1].length)] + ecPromptsStart[r][2] +  majorList[i][1][Math.floor(Math.random() * majorList[i][1].length)];
		}
	}
}

function makeFreshman(){
	var nameOfHighestCollege = highestGPAFromCollegesName(user[26]);
	var highestGPA = highestGPAFromColleges(user[26]);
	var gpaNeeded = gpaNeededToMeet(highestGPAFromColleges(user[26]), user[27], calculateYear(user[3]), user[6]);

	var randInt1 = Math.floor(Math.random() * gpaPrompts.length);
	for(var i = 0; i < 10; i++){
		if(randInt1 < 0 || randInt1 >= gpaPrompts.length){
			randInt1 = Math.floor(Math.random() * gpaPrompts.length);
		}
	}
	var str1 = gpaPrompts[randInt1][0] + nameOfHighestCollege + gpaPrompts[randInt1][1] + highestGPA + gpaPrompts[randInt1][2] + (Math.floor(100*gpaNeeded)/100) +  gpaPrompts[randInt1][3]; 
	
	$("#freshmanLine").html($("#freshmanLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-primary\">Life</span>" + freshmanPrompts[Math.floor(freshmanPrompts.length * Math.random())] + "</div>    </div>");


	if(calculateYear(user[3]) <= 1) 
		$("#freshmanLine").html($("#freshmanLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-danger\">Academics</span>" + str1 + "</div>    </div>");

	$("#freshmanLine").html($("#freshmanLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-warning\">Extracurricular</span>" + ecStringGenerator(user[4]) + "</div>    </div>");

	if(calculateYear(user[3]) > 3) {
			$("#freshmanLine").html($("#freshmanLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"badge\" style=\"color:blue\"></span>" + nostalgiaQuotes[Math.floor(Math.random() * nostalgiaQuotes.length)] + "</div>    </div>");

	}

}

function makeSophomore(){
	var nameOfHighestCollege = highestGPAFromCollegesName(user[26]);
	var highestGPA = highestGPAFromColleges(user[26]);
	var gpaNeeded = gpaNeededToMeet(highestGPAFromColleges(user[26]), user[27], calculateYear(user[3]), user[6]);

	var randInt1 = Math.floor(Math.random() * gpaPrompts.length);
	for(var i = 0; i < 10; i++){
		if(randInt1 < 0 || randInt1 >= gpaPrompts.length){
			randInt1 = Math.floor(Math.random() * gpaPrompts.length);
		}
	}
	var str1 = gpaPrompts[randInt1][0] + nameOfHighestCollege + gpaPrompts[randInt1][1] + highestGPA + gpaPrompts[randInt1][2] + (Math.floor(100*gpaNeeded)/100) +  gpaPrompts[randInt1][3]; 
	
	if(calculateYear(user[3]) <= 2) {
		$("#sophomoreLine").html($("#sophomoreLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-danger\">Academics</span>" + str1 + "</div>    </div>");
	}

	$("#sophomoreLine").html($("#sophomoreLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-primary\">Life</span>" + sophomorePrompts[Math.floor(sophomorePrompts.length * Math.random())] + "</div>    </div>");



	if(calculateYear(user[3]) > 3) {
			$("#sophomoreLine").html($("#sophomoreLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"badge\" style=\"color:blue\"></span>" + nostalgiaQuotes[Math.floor(Math.random() * nostalgiaQuotes.length)] + "</div>    </div>");

	}

	if(user[7] == "" || user[7] == "" || user[8] == "" || user[8] == "" || user[9] == "" || user[10] == "" || user[11] == "" || user[12] == ""){
		$("#sophomoreLine").html($("#sophomoreLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-danger\">Academics</span>" + "Consider enrolling in a test prep class. The SAT and ACT are the two tests colleges look at when making acceptances. Take a diagnostic from both and see which you prefer then study hard for it." + "</div>    </div>");
	}

	$("#sophomoreLine").html($("#sophomoreLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-warning\">Extracurricular</span>" + ecStringGenerator(user[4]) + "</div>    </div>");

	
}

function makeJunior(){
	var nameOfHighestCollege = highestGPAFromCollegesName(user[26]);
	var highestGPA = highestGPAFromColleges(user[26]);
	var gpaNeeded = gpaNeededToMeet(highestGPAFromColleges(user[26]), user[27], calculateYear(user[3]), user[6]);

	var randInt1 = Math.floor(Math.random() * gpaPrompts.length);
	var str1 = gpaPrompts[randInt1][0] + nameOfHighestCollege + gpaPrompts[randInt1][1] + highestGPA + gpaPrompts[randInt1][2] + (Math.floor(100*gpaNeeded)/100) +  gpaPrompts[randInt1][3]; 
	
	$("#juniorLine").html($("#juniorLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-danger\">Academics</span>" + str1 + "</div>    </div>");

	console.log(user[7] + " " + user[8] + " " + highestSATFromcCollege(user[26]) + " " + takeAgainSAT(computeUserSAT(user[7], user[8]), highestSATFromcCollege(user[26])));

	if(takeAgainSAT(computeUserACT(user[9], user[10], user[11], user[12]), highestSATFromcCollege(user[26]))){
		var randCollege = user[26][Math.floor(Math.random() * user[26].length)];
		var randInt1 = Math.floor(Math.random() * SATprompts.length);
		var randDate = testDates[Math.floor(testDates.length * Math.random())];
		var str2 = SATprompts[randInt1][0] + randCollege + SATprompts[randInt1][1] + randDate + SATprompts[randInt1][2] + highestSATFromcCollege(user[26]);

		$("#juniorLine").html($("#juniorLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-info\">Testing</span>" + str2 + "</div>    </div>");
	}

	$("#juniorLine").html($("#juniorLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-primary\">Life</span>" + juniorPrompts[Math.floor(juniorPrompts.length * Math.random())] + "</div>    </div>");


	if(takeAgainACT(computeUserACT(user[9], user[10], user[11], user[12]), highestACTFromcCollege(user[26]))){
		var randCollege = user[26][Math.floor(Math.random() * user[26].length)];
		var randInt1 = Math.floor(Math.random() * ACTprompts.length);
		var randDate = testDates[Math.floor(testDates.length * Math.random())];
		var str2 = ACTprompts[randInt1][0] + randCollege + ACTprompts[randInt1][1] + randDate + ACTprompts[randInt1][2] + highestACTFromcCollege(user[26]);

		$("#juniorLine").html($("#juniorLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-info\">Testing</span>" + str2 + "</div>    </div>");
	}

	if(calculateYear(user[3]) > 3) {
			$("#juniorLine").html($("#juniorLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"badge\" style=\"color:blue\"></span>" + nostalgiaQuotes[Math.floor(Math.random() * nostalgiaQuotes.length)] + "</div>    </div>");

	}

	$("#juniorLine").html($("#juniorLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-warning\">Extracurricular</span>" + ecStringGenerator(user[4]) + "</div>    </div>");

}

function makeSenior(){

	$("#seniorLine").html($("#seniorLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-success\">General</span>Next up on the list is college but too bad you gotta cook it up yourself. Start working on college applications (aka, signup for your CommonApp, UC App, UT App, etc etc) and start filling out those surveys. They take some time but they are about you so you'll be fine!</div>    </div>");

		$("#seniorLine").html($("#seniorLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-info\">Testing</span>" + subjectTestRec(user[4]) + "</div>    </div>");


	var nameOfHighestCollege = highestGPAFromCollegesName(user[26]);
	var highestGPA = highestGPAFromColleges(user[26]);
	var gpaNeeded = gpaNeededToMeet(highestGPAFromColleges(user[26]), user[27], calculateYear(user[3]), user[6]);

	var randInt1 = Math.floor(Math.random() * gpaPrompts.length);
	var str1 = gpaPrompts[randInt1][0] + nameOfHighestCollege + gpaPrompts[randInt1][1] + highestGPA + gpaPrompts[randInt1][2] + (Math.floor(100*gpaNeeded)/100) +  gpaPrompts[randInt1][3]; 
	
	$("#seniorLine").html($("#seniorLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-danger\">Academics</span>" + str1 + "</div>    </div>");

	if(takeAgainSAT(computeUserACT(user[9], user[10], user[11], user[12]), highestSATFromcCollege(user[26]))){
		var randCollege = user[26][Math.floor(Math.random() * user[26].length-1)];
		var randInt1 = Math.floor(Math.random() * SATprompts.length);
		var randDate = testDates[Math.floor(testDates.length * Math.random())];
		var str2 = SATprompts[0][0] + randCollege + SATprompts[0][1] + randDate + SATprompts[0][2] + highestSATFromcCollege(user[26]);

		$("#seniorLine").html($("#seniorLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-info\">Testing</span>" + str2 + "</div>    </div>");
	}

	$("#seniorLine").html($("#seniorLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-primary\">Life</span>" + seniorPrompts[Math.floor(seniorPrompts.length * Math.random())] + "</div>    </div>");

	if(takeAgainACT(computeUserACT(user[9], user[10], user[11], user[12]), highestACTFromcCollege(user[26]))){
		var randCollege = user[26][Math.floor(Math.random() * user[26].length)];
		var randInt1 = Math.floor(Math.random() * ACTprompts.length);
		var randDate = testDates[Math.floor(testDates.length * Math.random())];
		var str2 = ACTprompts[randInt1][0] + randCollege + ACTprompts[randInt1][1] + randDate + ACTprompts[randInt1][2] + highestACTFromcCollege(user[26]);

		$("#seniorLine").html($("#seniorLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-info\">Testing</span>" + str2 + "</div>    </div>");
	}

	$("#seniorLine").html($("#seniorLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-warning\">Extracurricular</span>" + ecStringGenerator(user[4]) + "</div>    </div>");

	var r2 = Math.floor(Math.random() * byebyePrompts.length);
	$("#seniorLine").html($("#seniorLine").html() + " <div class=\"timeline-item \">        <div class=\"year\"><span class=\"marker\"><span class=\"dot\"></span></span>        </div>        <div class=\"info\"><span class=\"label label-success\">General</span>" + byebyePrompts[r2][0] + user[2] + byebyePrompts[r2][1] +  "</div>    </div>");

}

function subjectTestRec(str){
	var sTestArr = [];

	var strpart = "";

	for(var i = 0; i < majorNames.length; i++){
		if(str === majorList[i][0]){			
			for(var j = 0; j < subjectTestMajor[i].length; j++){
				if(j == subjectTestMajor[i].length - 1){
					strpart += "and "
				}
				strpart += subjectTestMajor[i][j]+ " ";
			}
		}
	}


	var r = Math.floor(Math.random() * subjectTestPrompts.length);

	var str = "";

	str += subjectTestPrompts[r][0] + strpart + subjectTestPrompts[r][1];

	return str;

}


function extraCurricularCalculator(str){
	
	
		str = str.toLowerCase();

		var ecScore = 0;
		var specificCounter = 0;
		var generalCounter = 0;

		var wordArr = str.split(" ");

		for(var i = 0; i < majorList.length; i++){
			if(majorList[i][0] === user[4]){
				for(var j = 0; j < majorList[i][1].length; j++){
					for(var z = 0; z < wordArr.length; z++){
						if(wordArr[z].toLowerCase() === majorList[i][1][j].toLowerCase()){
							specificCounter++;
							ecScore += 20 / specificCounter;
						}
					}
				}
			}
		}

		for(var i = 0; i < wordArr.length; i++){
			for(var j = 0; j < generalList.length; j++){
				if(generalList[j].toLowerCase() === wordArr[i].toLowerCase()){
					generalCounter++;
					ecScore += 10 / generalCounter;
				} 
			}
		}
	
		return ecScore;


}









