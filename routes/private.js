const express = require('express');
const router = express.Router();
const location = require('../data/location');
const validate = require("../data/validate");
const Nominatim = require("nominatim-geocoder");
const geocoder = new Nominatim();
const users_database = require('../data/users');

router.get("/", async(req, res) => {
    if (req.session.user) {
        let user_locations = await location.getUserLocations(req.session.user['UserID']);
        res.render('private/userinfo', { username: req.session.user['UserID'], locations: user_locations, isError:false ,error:null });
        return;
    } else {
        //this is because you are not logged in
        return res.redirect('/');
    }
});

router.post("/covidstatus", async(req, res) => {
    if (req.session.user){
        try {
        
            if (!req.body.hasOwnProperty('covid_yes') && !req.body.hasOwnProperty('covid_no')){
                throw "User Must Select One Option";
            }
            if (!validate.dateVisited(req.body.report_date)) {
                    throw "Invalid Date Reported";
            }

            if (new Date(req.body.report_date) > new Date()) {
                throw "Date Has Not Yet Occured. Please Enter A Valid Date.";
            }

            //check if the date is more than two weeks old from today
            if (req.body.hasOwnProperty('covid_yes')){
                if (req.body.covid_yes === 'Yes'){
                    console.log(req.session.user['UserID']);
                    let updated_user = await users_database.UserCovidStatus(req.session.user['UserID'],true,req.body.report_date);
                    res.render('partials/covid_status_result', {isError: false,error: null, isVal: true}); 
                    return;
                }
            }

            if(req.body.hasOwnProperty('covid_no')){
               if (req.body.covid_yes === 'No'){
                    let updated_user = await users_database.NegativeUserCovidStatus(req.session.user['UserID'],true,req.body.report_date);
                    res.render('partials/covid_status_result', {isError: false,error: null,isVal: true}); 
                    return;
               }
            }
            
       
        }catch(e){
            res.render('partials/covid_status_result', {isError: true,error: e,isVal: false});
            console.log(e);
        }
    } else{
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
        if (!validate.dateVisited(req.body.date)) {
            throw "Invalid Date";
        }
        if (new Date(req.body.date) > new Date()) {
            throw "Date Has Not Yet Occured. Please Enter A Valid Date.";
        }
        
        //let date = new Date(req.body.date);
        geocoder.search({ street: req.body.street, city: "Hoboken", state: "New Jersey" }).then((response) => {

            //The geocoder's display_name field sometimes doesn't give the address number, 
            //so I changed it to the address the user submitted
            
            let newLocation = location.createLocation(req.session.user['UserID'], Number(response[0].lon), Number(response[0].lat), true, response[0].display_name, req.body.date);
            res.render('partials/location_info', { geo:response[0].display_name , date: req.body.date ,isError: false,error: null});
            return;
        }).catch((error) => {
            res.render('partials/location_info', { geo:null , date: req.body.date ,isError: true,error: "Invalid Hoboken Location. Please Try Again."});
        })


    } catch (e) {
        console.log(e);
        let user_locations = await location.getUserLocations(req.session.user['UserID']);
    
        res.status(400).render('partials/location_info', {date:null, geo:null,isError: true,error: e });
       
        return;
        //res.status(400).json(e);
    }


});




module.exports = router;