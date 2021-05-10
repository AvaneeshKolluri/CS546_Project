
(function($) {
	

	let form_submit = $('#location-form');
	let street = $('#street-address');
	let date = $('#date');
	let user_locations = $('#user_locations');
	let error_div = $('#location-errors');
	error_div.empty();

	let covidform = $('#covid_status_form');
	let status_result = $('#covid_report_result');
	let covid_report = $('#covid_report');
	let date_report = $('#report_date');
	
	covidform.submit(function(event) {
		event.preventDefault();
		status_result.empty();
		
		let covid_report_val = $("input[name='covid_report']:checked").val();
		console.log(covid_report_val);

		try{

			if (covid_report_val.trim().length === 0){
				throw "You Must Answer If You Tested Positive."
			}

			let date_report_val = date_report.val();
			if (covid_report_val == 'Yes'){
				if (date_report_val.trim().length === 0){
					throw "Must Enter A Valid Date."
				}
				if (new Date(date_report_val) > new Date()){
					throw "Date Has Not Yet Occured. Please Enter A Valid Date.";	
				}
				//check for 14 days
			}
			
			//alert("Thank You For Your Submission");
			status_result.append($('<p></p>').text("Thank You For Your Submission"));
			status_result.addClass("bold-userinfo");

		}catch(e){
			//alert(e);
			status_result.append($('<p></p>').text(e));
			status_result.addClass("error-userinfo");
		}
	
		

	});

	form_submit.submit(function(event) {
		event.preventDefault();
		error_div.empty();
		
		try{
			
			let street_val = street.val();
			
			let date_val = date.val();

			//validate all fields

			if (street_val.trim().length === 0){
				throw "Must Enter A Valid Street Address."
			}
			
			if (date_val.trim().length === 0){
				throw "Must Enter A Valid Date."
			}
			if (new Date(date_val) > new Date()){
				throw "Date Has Not Yet Occured. Please Enter A Valid Date.";	
			}

			var requestConfig = {
				method: "POST",
				url: "/userinfo",
				contentType: "application/json",
				data: JSON.stringify({
					street: street_val,
					date: date_val
				})
			};

			$.ajax(requestConfig).then(function(responseMessage) {
				user_locations.append(responseMessage);
				console.log(responseMessage);
				
			});



		}catch(e){
			error_div.append($('<p></p>').text(e));
			error_div.addClass("error-userinfo");
		}
		
		

		
	});
	

})(window.jQuery);