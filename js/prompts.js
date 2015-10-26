var nostalgiaQuotes = ["We are made wise not by the recollection of our past, but by the responsibility for our future.",
						"Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
						"A people without the knowledge of their past history, origin and culture is like a tree without roots.",
						"Look back, and smile on perils past.",
						"Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow.",
						"The past cannot be changed. The future is yet in your power."];

var gpaPrompts = [["Your choice college, ", " has a median GPA of ", " so we recommend that you maintain a ", " for your remaining years in high school."],
				  ["", " has generally accepted applicants with a GPA of ", " so it is recommended that you keep your grades at at least a ", " for the rest of high school."],
				  ["One of your indicated choices, ", " tends to accept students with ", " and so it is recommended that you try to maintain a ", " for the rest of your time in high school."]];

var SATprompts = [["Your SAT score was below what ", " generally admits. You may want to retake again in ", " and attempt to score a "],
				  ["We understand that getting up on a Saturday morning for an SAT is a hassle but you scored just a tad below what ", "'s pool of admittees SAT scores were. We suggest retaking in ", " to score above a "],
				  ["Not bad not bad. You can definetley do better on the SAT though! ", " chooses applicants with high calliber SAT scores and your score barely missed that mark. Take it again in ", " and try scoring at least a "]];

var ACTprompts = [["Your ACT score was below what ", " generally admits. You may want to retake again in ", " and attempt to score a "],
					["We understand that getting up on a Saturday morning for an ACT is a hassle but you scored just a tad below what ", "'s pool of admittees ACT scores were. We suggest retaking in ", " to score above a "],
					["Not bad not bad. You can definetley do better on the ACT though! ", " chooses applicants with high calliber ACT scores and your score barely missed that mark. Take it again in ", " and try scoring at least a "]];

var ecPromptsStart = [["Considering that you would like to major in a field related to ", ", we suggest that you look into getting involved with an organization that focuses on ", ", or "],
					  ["", " is a vast field and there are many opportunities available to high schoolers to get involved in this subject early on. Look up ", " and "],
					  ["Colleges love seeing interest in subject fields. Since you want to pursue ", " we think you should look into getting involved with organizations that deal with ", " and "],
					  ["People who study ", " often times participate in ", " and "],
					  ["Considering that you would like to major in a field related to ", ", we suggest that you look into getting involved with an organization that focuses on ", ", or "],
					  ["", " is a vast field and there are many opportunities available to high schoolers to get involved in this subject early on. Look up ", " and "],
					  ["Colleges love seeing interest in subject fields. Since you want to pursue ", " we think you should look into getting involved with organizations that deal with ", " and "],
					  ["People who study ", " often times participate in ", " and "],
					  ["Considering that you would like to major in a field related to ", ", we suggest that you look into getting involved with an organization that focuses on ", ", or "],
					  ["", " is a vast field and there are many opportunities available to high schoolers to get involved in this subject early on. Look up ", " and "],
					  ["Colleges love seeing interest in subject fields. Since you want to pursue ", " we think you should look into getting involved with organizations that deal with ", " and "],
					  ["People who study ", " often times participate in ", " and "]];

var byebyePrompts = [["It was a good run ", " but the show must go on. Say bye to high school."],
 					 ["Say adios to ", " since you are graduating!"],
 					 ["Congratulations! You will have graduated from ", " by this time."],
 					 ["Strive for the golden light at the end of the road. You are almost done and out of ", ""]];

 var freshmanPrompts = [["Welcome to high school! Consider joining several clubs (you can trim the amount down later), try out for sports you like to play, and make a lot of friends!"],
 						["Howdy! We know you might be a little intimidated by all the big seniors at school but take advantage of the situation. Make some friends, join some clubs, and get involved!"]];

 var sophomorePrompts = [["Greetings veteran high schooler. You already know the drill, just keep going with it. Maybe trim down your clubs a bit so you can spend quality time in the ones you enjoy most."],
 				  ["You know how high school works already. Just go with it!"]];

var juniorPrompts = [["You have probably heard some terrible things about this year: SAT's, ACT's, GPA maintaining, college searching, extra curricular committments, blah blah blah. Don't worry! You will be fine! Just stay part of DA SCHOLA CLUB!"],
					["Don't fear, Da Schola Club is here to support you. We are here to support you and take you through this (we know) grueling year oF SAT/ACT, intense classes, and mentally melting. You will be A-okay!"]];

var seniorPrompts = [["Oy, senioritis isn't a disease, it's a choice. CHOOSE to do get it second semester. In the mean time, go ask the girl or guy to senior prom and have a blash! You're almost done! (Plus, make sure your grades are good still. Colleges look at those.) "],
					 ["Helloooo senior. Maintain your grades, spend time with friends, do your college apps. It's a good time to be alive!"]];

var subjectTestPrompts = [["The ", " SAT Subject Tests apply to your major so consider taking them."],
						 ["Consider taking the ", " Subject Tests as they apply to your major of choice."],
						 ["", " are subject tests that are relevant to you so consider taking them."]];

var testDates = ["August 27th", "February 2nd", "April 29th", "June 2nd", "December 11th", "October 19th"];