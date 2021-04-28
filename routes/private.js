const express = require('express');
const router = express.Router();
const location= require('../data/location');

router.get("/", async (req, res) => {
    if (req.session.user) {
    	//this needs to be updated with navbar and a private page
        res.render('layouts/main');
    } 

});
router.get("/userinfo", async (req, res) => {
    if (req.session.user) {
    	let user_locations = await location.getUserLocations(req.session.user['UserID']);
    	console.log(user_locations);
        res.render('private/userinfo', {username: req.session.user['UserID'],locations: user_locations});
    } 

});

router.post("/userinfo", async (req, res) => {
	console.log(req.body);
	//must validate the form submission here
    res.render('partials/location_info',{street:req.body.street,  town:req.body.town,  state:req.body.state}); 

});

module.exports = router;