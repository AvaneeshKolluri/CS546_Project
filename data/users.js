const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const { get } = require('../routes/private');
const valid = require('./validate');
const saltRounds = 16;

let methods = {

	async Create(email,username, password) {


		if(valid.userID(username) == false){
			throw 'Username should be an alphanumeric string between 6 to 16 characters';
		}
		if(valid.password(password) == false){
			throw 'Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long';
		}
		if(valid.email(email) == false){
			throw 'Email should be of the proper email format';
		}
		/*if (!email) throw 'You must provide an email.';
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
		}*/
		
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


	},

	async getUser(username){
		if (!username) throw 'You must provide an username.';
		if (typeof(username) != 'string' || username.trim().length === 0 ){
			throw 'You must provide a username that is more than just empty spaces.';
		}
		const userCollection = await users();
        const user = await userCollection.findOne({ UserID: username });
        if (user === null) {
            throw 'No user exists with the given username';
        }

		return user;
	},

	async getAllUsers() {
        const usersCollection = await users();
        const usersArray = await usersCollection.find({}).toArray();
        return usersArray;
    }
};
module.exports = methods;