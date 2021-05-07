const express = require('express');
const router = express.Router();
const location = require('../data/location');
const validate = require("../data/validate");
const Nominatim = require("nominatim-geocoder");
const geocoder = new Nominatim();

router.get("/", async(req, res) => {
    if (req.session.user) {
        let user_locations = await location.getUserLocations(req.session.user['UserID']);
        res.render('private/userinfo', { username: req.session.user['UserID'], locations: user_locations });
        return;
    } else {
        return res.redirect('/');
    }
});


router.post("/", async(req, res) => {
    console.log(req.body);
    //must validate the form submission here

    try {
        if (req.body.street.trim().length === 0) {
            throw "Must Enter A Valid Street Address."
        }
        if (req.body.date.length === 0) {
            throw "Must Enter A Valid Date."
        }
        if (new Date(req.body.date) > new Date()) {
            throw "Date Has Not Yet Occured. Please Enter A Valid Date.";
        }
        if (!validate.dateVisited(req.body.date)) {
            throw "Invalid Date";
        }
        //let date = new Date(req.body.date);
        geocoder.search({ street: req.body.street, city: "Hoboken", state: "New Jersey" }).then((response) => {
            //console.log("lat: " + response[0].lat);
            //console.log("lon: " + response[0].lon);

            //The geocoder's display_name field sometimes doesn't give the address number, 
            //so I changed it to the address the user submitted
            let address = req.body.street + ", Hoboken, " + "New Jersey";
            let newLocation = location.createLocation(req.session.user['UserID'], Number(response[0].lon), Number(response[0].lat), true, response[0].display_name, req.body.date);
            res.render('partials/location_info', { geo: address, date: req.body.date });
            return;
        }).catch((error) => {
            throw "Invalid Hoboken Location. Please Try Again. ";
        })


    } catch (e) {
        //render a page with error
        let user_locations = await location.getUserLocations(req.session.user['UserID']);
        res.status(400).render('private/userinfo', { username: req.session.user['UserID'], locations: user_locations, error: e });
        return;
        //res.status(400).json(e);
    }


});

module.exports = router;