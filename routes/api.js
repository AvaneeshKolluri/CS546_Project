const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const data = require('../data');
const userData = data.users;
const validate = data.validate;

router.get("/login", async(req, res) => {
    if (!req.session.user) {
        res.render('login', { hasErrors: false });
    } else {
        res.redirect('/userinfo');
    }

});

router.post("/login", async(req, res) => {
    let username = req.body.username;
    let pass = req.body.password;
    if (!validate.userID(username) || !validate.password(pass)) {
        res.status(401);
        res.render('login', { hasErrors: true });
        return;
    }
    let trimUser = username.toLowerCase();
    let user = {};
    try {
        user = await userData.getUser(trimUser);
    } catch (e) {
        res.status(404);
        res.render('login', { hasErrors: true });
        return;
    }
    let match = await bcrypt.compare(pass, user.passwordHash);
    if (!match) {
        res.render('login', { hasErrors: true });
    } else {
        req.session.user = { UserID: trimUser };
        res.redirect('/userinfo');
    }
});

router.get("/logout", async(req, res) => {
    if (!req.session.user) {
        res.redirect("/");
    } else {
        req.session.destroy();
        res.redirect('/');
    }
});

module.exports = router;