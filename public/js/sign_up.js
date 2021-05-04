
(function($) {
	

	let form_submit = $('#create-acct');
	let uname = $('#username');
	let pwd = $('#password');
	let e = $('#email');
	let error_div = $('#signup-error');
	error_div.empty();

	form_submit.submit(function(event) {
		event.preventDefault();
		error_div.empty();
		
		try{
			
			let username = uname.val();
			let password = pwd.val();
			let email = e.val();

			//validate all fields

			if (!username || typeof username !== "string" || username.trim().length == 0) {
				throw 'Username should be an alphanumeric string between 6 to 16 characters';
			}
			if(username.trim().length < 6 || username.trim().length > 16){
				throw 'Username should be an alphanumeric string between 6 to 16 characters';
			}


			if (!password || typeof password !== "string" || password.trim().length == 0) {
				throw 'Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long';
			}
			if(password.length < 8){
				throw 'Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long';
			}
			var localF = /\d/;
			if(localF.test(password) == false){
				throw 'Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long';
			}
			var hasUpper = false;
			for(i=0; i< password.length; i++){
				if(password[i] == password[i].toUpperCase() && password[i] != password[i].toLowerCase()){
					hasUpper = true;
				}
			}
			if(hasUpper == false){
				throw 'Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long';
			}

			if (!email || typeof email !== "string" || email.trim().length == 0) {
				throw 'Email should be of the proper email format';
			}

			var emailPattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);

			if(emailPattern.test(emailAddress) == false){
				throw 'Email should be of the proper email format';
			}



		}catch(e){
			error_div.append($('<p>' + e + '</p>'));
		}
		
		

		
	});
	

})(window.jQuery);