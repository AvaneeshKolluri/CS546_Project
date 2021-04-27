const express = require('express');
const router = express.Router();
const users = require('../data/users');


router.get('/', async (req, res) => {  

	res.render("create");
  

});


router.post('/', async (req, res) => {

	
	let username = req.body.username;
 	let password = req.body.password;
 	let email = req.body.email;
 	
 	if (!email) throw 'You must provide an email.';
	if (!username) throw 'You must provide an username.';
	if (!password) throw 'You must provide an password.';

	if (typeof(email) != 'string' || email.trim().length === 0 ){
		throw 'You must provide a email that is more than just empty spaces.';
	}
	if (typeof(username) != 'string' || username.trim().length === 0 ){
		throw 'You must provide a username that is more than just empty spaces.';
	}

	if (typeof(password) != 'string' || password.trim().length === 0 ){
		throw 'You must provide a password that is more than just empty spaces.';
	}

 	try{
 		let newUser = await users.Create(email,username,password);
 		console.log(newUser);
 		res.redirect("/");
 	}catch(e){
 		res.status(404).json(e);
 	}

});


module.exports = router;