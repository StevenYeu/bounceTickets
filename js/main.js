$(document).ready(function () {

	$('.star').on('click', function () {
      $(this).toggleClass('star-checked');
    });

    $('.ckbox label').on('click', function () {
      $(this).parents('tr').toggleClass('selected');
    });

    $('.btn-filter').on('click', function () {
      var $target = $(this).data('target');
      if ($target != 'all') {
        $('.table tr').css('display', 'none');
        $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
      } else {
        $('.table tr').css('display', 'none').fadeIn('slow');
      }
    });

 });

 function load() {
	 getToken();
	 var url = "https://holonet.sdsc.edu:8134/requestData"
	 var method = "GET";
	 var a_sync = true;
	 var request = new XMLHttpRequest();
	 var token = localStorage.getItem("token");
	 console.log(token);
	 request.onload = function () {
		 var data = JSON.parse(request.responseText);
		 processValidData(data);
		 processWeirdData(data);
	 }
	 request.open(method, url, a_sync);
	 request.setRequestHeader('Authorization', token);
	 request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	 request.send();
 }

 function processValidData(data) {
	 valid = data.validProjects;
	 $.each(valid, function(index) { //llop through each project
		 var items = [];
		 items.push("<tr>");
		 // Create Email Button
		 items.push("<td align='center'><a class='btn btn-default email'><em class='fa fa-paper-plane-o'></em></a></td>")

		 // Add Dates
		 items.push("<td>")
		 for(i=0; i < valid[index].emailDates.length; i++) {
			 var unix = valid[index].emailDates[i];
			 var timestamp = moment.unix(unix);
			 var dates = timestamp.format("MM-DD-YYYY");
			 console.log(dates);
			 items.push(dates);
		 }
		 items.push("</td>");

		 //Add number of flags
		 items.push("<td>");
		 items.push(valid[index].ticketNumbers.length.toString());
		 items.push("</td>");

		 // Add the Status of Project
		 items.push("<td>");
		 items.push(valid[index].warningLevel);
		 items.push("</td>")

		 // Add Ticket Numbers
		 items.push("<td>");
		 for(i=0; i < valid[index].ticketNumbers.length; i++) {
			 var nums = valid[index].ticketNumbers[i].toString()+"\n";
			 items.push(nums);
		 }
		 items.push("</td>");

		 // Add Emails
		 if (valid[index].contactEmail != null) {
		 	items.push("<td>");
		 	for(i=0; i < valid[index].contactEmail.length; i++) {
			 	var emails = valid[index].contactEmail[i].toString()+"\n";
			 	items.push(emails);
		 	}
		 	items.push("</td>");
		 }

		 //Add Name
		 items.push("<td class='name'>");
		 items.push(valid[index].projectName);
		 items.push("</td>");

		 //Add Types
		 items.push("<td>");
		 for(i=0; i < valid[index].failingType.length; i++) {
			 var types = valid[index].failingType[i].toString()+"\n";
			 items.push(types);
		 }
		 items.push("</td>");

		 items.push("</tr>");
		 var row = items.join("");
		 $('#valid').append(row);
	 });
 }


 function processWeirdData(data) {
	 weird = data.weirdTickets;
	 $.each(weird, function(index) { //loop through each project
		 var items = [];
		 items.push("<tr>");
		 // Create Email Button
		 items.push("<td align='center'><a class='btn btn-default email'><em class='fa fa-paper-plane-o'></em></a></td>")

		 // Add ticket Numbers
		 items.push("<td>");
		 items.push(weird[index].ticketNumber);
		 items.push("</td>");

		 //Add Name
		 items.push("<td class='name'>");
		 items.push(weird[index].projectName);
		 items.push("</td>");

		 //Add Month
		 items.push("<td>");
		 items.push(weird[index].month.toString());
		 items.push("</td>");

		 //Add Types
		 items.push("<td>");
		 items.push(weird[index].failingType);
		 items.push("</td>");

		 items.push("</tr>");
		 var row = items.join("");
		 $('#weird').append(row);

	 });
 }

/****
	Loads Valid Project Data into Tables
****/
 function loadValidData() {
	 $.getJSON( "data.json", function(data) {
		 processValidData(data);
	 });
 }


 /****
 	Loads Weird Tickets into Tables
 ****/
 function loadWeirdData() {
	 $.getJSON( "data.json", function(data) {
		 processWeirdData(data);
	 });
 }

 function getToken(){
	 var url = "https://holonet.sdsc.edu:8134/login";
	 var method = "GET";
	 var a_sync = true;
	 var request = new XMLHttpRequest();
 	 request.onload = function () {
 		  var status = request.status;
			if (status == 401) {
				return;
			}
			var id = request.responseText;
			localStorage.setItem("token",id);
 	 }

	 request.open(method, url, a_sync);
	 request.setRequestHeader('Authorization', window.btoa("syeu" +":"+"6St12Sin"));
	 request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	 request.send();


 }

$(document).on("click",".email" ,function() {
	var $item = $(this).closest("tr").find(".name").text();
	$(this).closest("tr").hide();
	var url = "http://holonet.sdsc.edu:8134/" + $item;
	var method = "POST";
	var a_sync = true;
	var request = new XMLHttpRequest();
	request.onload = function () {
		var status = request.status;
		var data = request.responseText;
	}
	request.open(method, url, a_sync);
	request.setRequestHeader('Authorization', token);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send();
});
