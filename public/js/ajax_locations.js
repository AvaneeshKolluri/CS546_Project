
(function($) {
	

	let form_submit = $('#location-form');
	let street = $('#street-address');
	let state = $('#state');
	let town = $('#town');
	let date = $('#date');
	let user_locations = $('#user_locations');
	let error_div = $('#location-errors');
	error_div.empty();

	form_submit.submit(function(event) {
		event.preventDefault();
		error_div.empty();
		let street_val = street.val();
		let state_val = state.val();
		let town_val = town.val();
		let date_val = date.val();
		

		if (new Date(date_val) > new Date()){
			error_div.append($('<p></p>').text("Date Has Not Yet Occured."));
			error_div.addClass("error-userinfo");
		}else{
			var requestConfig = {
			method: "POST",
			url: "/private/userinfo",
			contentType: "application/json",
			data: JSON.stringify({
				street: street_val,
				state:state_val,
				town: town_val,
				date: date_val
			})
			};

			$.ajax(requestConfig).then(function(responseMessage) {
				user_locations.append(responseMessage);
				console.log(responseMessage);
				
			});
		}
		
	});
	

})(window.jQuery);