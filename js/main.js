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
	 var json = $.getJSON( "http://holonet.sdsc.edu:8134/requestData", function(data) {
			 console.log( "success" );
			 console.log(data);
			 })
 }

/****
	Loads Valid Project Data into Tables
****/
 function loadValidData() {

	 $.getJSON( "data.json", function(data) {
			valid = data.validProjects;
			$.each(valid, function(index) { //llop through each project
				var items = [];
				items.push("<tr>");
				// Create Email Button
				items.push("<td align='center'><a class='btn btn-default'><em class='fa fa-paper-plane-o'></em></a></td>")

				// Add Dates
				items.push("<td>")
				for(i=0; i < valid[index].emailDates.length; i++) {
					//var dates = valid[index].emailDates[i].toString();
					var dates = "TODO";
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
				items.push("<td>");
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
	 })
 }


 function loadWeirdData() {

	 $.getJSON( "data.json", function(data) {
		 weird = data.weirdTickets;
		 console.log(weird);
		 $.each(weird, function(index) { //llop through each project
			 var items = [];
			 items.push("<tr>");
			 // Create Email Button
			 items.push("<td align='center'><a class='btn btn-default'><em class='fa fa-paper-plane-o'></em></a></td>")

			 // Add ticket Numbers
			 items.push("<td>");
			 items.push(weird[index].ticketNumber);
			 items.push("</td>");

			 //Add Name
			 items.push("<td>");
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

	 });


 }
