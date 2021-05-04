
(function($) {
	

	let form_submit = $('#location-form');
	let street = $('#street-address');
	let date = $('#date');
	let user_locations = $('#user_locations');
	let error_div = $('#location-errors');
	error_div.empty();

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
				url: "/private/userinfo",
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