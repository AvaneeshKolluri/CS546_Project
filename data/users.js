const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const saltRounds = 16;

let methods = {

	async Create(email,username, password) {

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
		
		//must validate all fields before (how to validate email)

		const hash_password = await bcrypt.hash(password, saltRounds);

		const userCollection = await users();
		let newUser = { 
		    UserID: username,
		    passwordHash: hash_password, 
		    email: email,
		    locationIDs:[]
		};

		const insertUser = await userCollection.insertOne(newUser);
		if (insertUser.insertedCount === 0) throw 'Could not add User';

		const mongoID = insertUser.insertedId;
		
	    return mongoID;


	}
};
module.exports = methods;