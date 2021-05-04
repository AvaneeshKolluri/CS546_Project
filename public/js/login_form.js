(function($) {
	
	let loginForm = $('#login-form');
	let errorDiv = $('#login-errors');
	//errorDiv.empty();

	loginForm.submit(function(event) {
		//event.preventDefault();
		errorDiv.empty();
		// Validate input fields
		const username = $('#username').val();
		const password = $('#password').val();
		if (!username || typeof username !== "string" || username.trim().length == 0) {
            errorDiv.append($('<p>Must enter a valid username/password</p>'));
			return false;
        }
		if (!password || typeof password !== "string" || password.trim().length == 0) {
            errorDiv.append($('<p>Must enter a valid username/password</p>'));
			return false;
        }
		// Post request to /api/login
	});
})(window.jQuery);