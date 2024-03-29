const express = require('express');
const router = express.Router();
const users = require('../data/users');
const valid = require('../data/validate');
const mongoCollections = require('../config/mongoCollections');
const usersMDB = mongoCollections.users;

router.get('/', async(req, res) => {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render("create");
    }
});


router.post('/', async(req, res) => {


    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    // validate email and pw
    // check if userID exists



    try {
        let lowerUser = username.toLowerCase();
        let lowerEmail = email.toLowerCase();
        const userCollection = await usersMDB();
        const existUsername = await userCollection.findOne({ UserID: lowerUser });
        if (existUsername) {
            throw 'Username is taken, try a different userID'
        }
        const existEmail = await userCollection.findOne({ email: lowerEmail });
        if (existEmail) {
            throw 'Email is taken, please login using your current account or with a new email'
        }


        if (valid.userID(lowerUser) == false) {
            throw 'Username should be an alphanumeric string between 6 to 16 characters';
        }

        if (valid.password(password) == false) {
            throw 'Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long';
        }

        if (valid.email(lowerEmail) == false) {
            throw 'Email should be of the proper email format';
        }

        let newUser = await users.Create(lowerEmail, lowerUser, password);
        res.redirect("/api/login");
    } catch (e) {
        res.status(400).render('create', { error: e })

    }

});


module.exports = router;