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

 function update() {
	 var json = $.getJSON( "http://holonet.sdsc.edu:8134/requestData", function(data){
		 processValidData(data);
		 processWeirdData(data);
	 });
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
		 items.push("<td>");
		 for(i=0; i < valid[index].contactEmail.length; i++) {
			 var emails = valid[index].contactEmail[i].toString()+"\n";
			 items.push(emails);
		 }
		 items.push("</td>");

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

 }

$(document).on("click",".email" ,function() {
	console.log("DEBUG");
	var $item = $(this).closest("tr").find(".name").text();
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
	request.send(postData);
});
