const express = require('express');
const router = express.Router();
const location = require('../data/location');
const users = require('../data/users');

router.get('/', async (req, res) => {
    let allLocations = await location.getAllLocations();
    let allUsers = await users.getAllUsers();
    if (req.session.user) {
        res.render('layouts/main', { locations: allLocations, users: allUsers, UserID: req.session.user.UserID});
    } else {
        res.render('layouts/main', { locations: allLocations, users: allUsers});
    }
});


module.exports = router;