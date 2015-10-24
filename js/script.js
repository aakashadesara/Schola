$(document).ready(function(){

	var user = [];
	var collegeList = [];
	var subjectTests = [];


	$("#infoSection1").hide();
	$("#infoSection2").hide();
	$("#infoSection3").hide();
	$("#infoSection4").hide();

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
		user.push($("#firstNameHolder").val());
		user.push($("#lastNameHolder").val());
		user.push($("#highSchoolHolder").val());
		user.push($("#gradYearHolder").val());
		user.push($("#majorHolder").val());

		user.push($("#gpaHolder").val());
		user.push($("#satMathHolder").val());
		user.push($("#satWritingHolder").val());
		user.push($("#actMathHolder").val());
		user.push($("#actEnglishHolder").val());
		user.push($("#actReadingHolder").val());
		user.push($("#actScienceHolder").val());

		user.push($("#ec1").val());
		user.push($("#ec2").val());
		user.push($("#ec3").val());
		user.push($("#ec4").val());
		user.push($("#ec5").val());
		user.push($("#ec6").val());
		user.push($("#ec7").val());
		user.push($("#ec8").val());
		user.push($("#ec9").val());
		user.push($("#ec10").val());
		user.push($("#ec11").val());
		user.push($("#ec12").val());

		user.push(subjectTests);

		user.push(collegeList);

		console.log(user);
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
	})

	// Access college list
	/*for(var i = 0; i < list.length; i++){
		console.log(list[i]);
	}*/
});

function setUpSubjectTestCheckboxes(){
	for(var i = 0; i < subjectTestList.length; i++){
		$("#subjectTestCheckHolder").html($("#subjectTestCheckHolder").html() + "<div class=\"form-group col-md-3\"><label class=\"control-label\" for=\"focusedInput\">" + subjectTestList[i] + "</label><input class=\"form-control\" id=\"sT" + i + "\" type=\"text\" ></div>")
	}
}

function addECSlots(){
	for(var i = 0; i < 12; i++){
		$("#ecHolders").html($("#ecHolders").html() + "<div class=\"panel panel-primary col-md-3\">            <div class=\"panel-heading\">              <h3 class=\"panel-title\">                <div class=\"form-group\">                <input  style=\"background-color: rgba(0,0,0,0); color:white; outline: none; border: 0;\" type=\"text\" placeholder=\"Activity " + (i+1) + " Title...\">              </div>            </h3>            </div>            <div class=\"panel-body\">              <textarea  style=\"background-color: rgba(0,0,0,0); color:black; outline: none; border: 0;\" type=\"text\" id=\"ec" + (i+1) + "\" placeholder=\"Activity " + (i+1) + " Title...\"></textarea>            </div>        </div>");
	}
}