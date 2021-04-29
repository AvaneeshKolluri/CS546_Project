
(function($) {
	

	let form_submit = $('#location-form');
	let street = $('#street-address');
	let state = $('#state');
	let town = $('#town');
	let date = $('#date');
	let user_locations = $('#user_locations');

	console.log("IM HERE");
	console.log(form_submit);

	form_submit.submit(function(event) {
		event.preventDefault();
		console.log("IM HERE");
		
		let street_val = street.val();
		let state_val = state.val();
		let town_val = town.val();
		let date_val = date.val();
		console.log(street_val);

		
		
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
		

	});
	

})(window.jQuery);