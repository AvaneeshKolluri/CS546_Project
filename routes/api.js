const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const data = require('../data');
const userData = data.users;

router.get("/login", async (req, res) => {
    if (!req.session.user) {
        res.render('login', {hasErrors: false});
    } else {
        res.redirect('/private');
    }

});

router.post("/login", async (req, res) => {
    const username = req.body.username;
    let pass = req.body.password;
    if (username === undefined || pass === undefined) {
        res.status(401);
        res.render('login', {hasErrors: true});
        return;
    }
    let trimUser = username.trim();
    if (trimUser === '' || pass === ''){
        res.status(401);
        res.render('login', {hasErrors: true});
        return;
    }

    trimUser = trimUser.toLowerCase();
    let user = {};
    try {
        user = await userData.getUser(trimUser);
    } catch (e) {
        res.status(404);
        res.render('login', {hasErrors: true});
        return;
    }
    let match = await bcrypt.compare(pass, user.passwordHash);
    if (!match) {
        res.render('login', {hasErrors: true});
    } else {
        req.session.user = { UserID: username};
        res.redirect('/private/userinfo');
    }

});

module.exports = router;