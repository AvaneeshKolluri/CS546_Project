const express = require('express');
const router = express.Router();
const location = require('../data/location');
const Nominatim = require('nominatim-geocoder');
const geocoder = new Nominatim();

router.get("/", async(req, res) => {
    if (req.session.user) {
        res.render('layouts/main');
        return;
    }
    //do i have to add another case here, i get errors if i do
});
router.get("/userinfo", async(req, res) => {
    if (req.session.user) {
        let user_locations = await location.getUserLocations(req.session.user['UserID']);
        res.render('private/userinfo', { username: req.session.user['UserID'], locations: user_locations});
        return;
    }else{
        return res.redirect('/');
    }

});

router.post("/userinfo", async(req, res) => {
    console.log(req.body);
    //must validate the form submission here
    
    try{
        if (req.body.street.trim().length === 0){
            throw "Must Enter A Valid Street Address."
        }
        if (req.body.date.length === 0){
            throw "Must Enter A Valid Date."
        }
        if (new Date(req.body.date) > new Date()){
            throw "Date Has Not Yet Occured. Please Enter A Valid Date.";   
        }
        let date = new Date(req.body.date);

        geocoder.search({ street: req.body.street, city: "Hoboken", state: "New Jersey" }).then((response) => {
            //console.log("lat: " + response[0].lat);
            //console.log("lon: " + response[0].lon);
            //add to the database - create a location id and insert the location inside the location database
            //add the location id into the users database

            let newLocation = location.createLocation(req.session.user['UserID'], response[0].lon, response[0].lat, true, response[0].display_name,date);
            res.render('partials/location_info', { geo: response[0].display_name, date: req.body.date });
            return;
        })


    }catch(e){
        //render a page with error
        let user_locations = await location.getUserLocations(req.session.user['UserID']);
        res.status(400).render('private/userinfo', { username: req.session.user['UserID'], locations: user_locations, error:e });
        return;
        //res.status(400).json(e);
    }
   

});

module.exports = router;