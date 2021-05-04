const express = require('express');
const router = express.Router();
const users = require('../data/users');
const valid = require('../data/validate');

router.get('/', async (req, res) => {  
	if (req.session.user) {
        //this needs to be updated with navbar and a private page
        res.redirect('/');
	}
	else{
		res.render("create");
	}

	
  

});


router.post('/', async (req, res) => {

	
	let username = req.body.username;
 	let password = req.body.password;
	let email = req.body.email;
	 
	 // validate email and pw
	 // check if userID exists
 	
 	

 	try{
		if(valid.userID(username) == false){
			throw 'Username should be an alphanumeric string between 6 to 16 characters';
		}
	
		if(valid.password(password) == false){
			throw 'Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long';
		}
	
		if(valid.email(email) == false){
			throw 'Email should be of the proper email format';
		}
 		let newUser = await users.Create(email,username,password);
 		console.log(newUser);
 		res.redirect("/");
 	}catch(e){
		 res.status(400).render('create',{error:e})
 		//res.status(404).json(e);
 	}

});


module.exports = router;