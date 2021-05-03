const express = require('express');
const router = express.Router();
const location = require('../data/location');
const Nominatim = require('nominatim-geocoder');
const geocoder = new Nominatim();

router.get("/", async(req, res) => {
    if (req.session.user) {
        //this needs to be updated with navbar and a private page
        res.render('layouts/main');
    }

});
router.get("/userinfo", async(req, res) => {
    if (req.session.user) {
        let user_locations = await location.getUserLocations(req.session.user['UserID']);
        console.log(user_locations);
        res.render('private/userinfo', { username: req.session.user['UserID'], locations: user_locations });
    }

});

router.post("/userinfo", async(req, res) => {
    console.log(req.body);
    //must validate the form submission here
    
    let date = new Date(req.body.date);
    console.log(typeof(date));
    console.log(date);

   

    /*if (date > new Date()){
        //res.status(400).json({ error: 'You must provide a valid dateOfReviewthat is before today.' });
        console.log("Date Has Not Yet Occured.");
        throw "Date Has Not Yet Occured.";
    }*/
    geocoder.search({ street: req.body.street, city: req.body.town, state: req.body.state }).then((response) => {
        console.log("lat: " + response[0].lat);
        console.log("lon: " + response[0].lon);
        //add to the database - create a location id and insert the location inside the location database
        //add the location id into the users database

        let newLocation = location.createLocation(req.session.user['UserID'], response[0].lon, response[0].lat, true, response[0].display_name,date);
        res.render('partials/location_info', { geo: response[0].display_name, date: req.body.date });



    }).catch((error) => {
        console.log("search not able");
        //throw an error
        res.status(400).json({ error: error });
    })

});

module.exports = router;