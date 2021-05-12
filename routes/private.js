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
        res.render('private/userinfo', { username: req.session.user['UserID'], locations: user_locations, isError: false, error: null, isLoc: false });
        return;
    } else {
        //this is because you are not logged in
        return res.redirect('/');
    }
});

router.post("/covidstatus", async(req, res) => {
    console.log("im here");
    if (req.session.user) {


        try {

            if (!req.body.hasOwnProperty('covid_report')) {
                throw "User Must Select One Option";
            }
            if (req.body.covid_report.trim().length === 0) {
                throw "User Must Select An Option";
            }

            if (req.body.covid_report === 'Yes') {
                if (!validate.dateVisited(req.body.date_report)) {
                    throw "Invalid Date Reported";
                }
                if (new Date(req.body.date_report) > new Date()) {
                    throw "Date Has Not Yet Occured. Please Enter A Valid Date.";
                }
                let diff = Math.abs(new Date().getTime() - new Date(req.body.date_report).getTime()) / (1000 * 60 * 60 * 24);

                if (diff > 14) {
                    throw "Date Is More Than Two Weeks Old. Please Enter A Valid Date.";
                }

                let updated_user = await users_database.UserCovidStatus(req.session.user['UserID'], true, req.body.date_report);
            } else if (req.body.covid_report === 'No') {

                if (req.body.date_report != null) {
                    throw "Only Submit A Date If You Test Positive For Covid.";
                }
                let updated_user1 = await users_database.NegativeUserCovidStatus(req.session.user['UserID'], true);
            }


            res.render('partials/covid_result', { isError: false, error: null });
            return;

        } catch (e) {
            res.render('partials/covid_result', { isError: true, error: e });
            return;
        }
    } else {
        return res.redirect('/');
    }


});

router.post("/", async(req, res) => {

    if (req.session.user) {
        try {
            if (req.body.street.trim().length === 0) {
                throw "Must Enter A Valid Street Address."
            }
            if (req.body.date.length === 0) {
                throw "Must Enter A Valid Date."
            }
            if (!validate.dateVisited(req.body.date)) {
                throw "Invalid Date.";
            }
            if (new Date(req.body.date) > new Date()) {
                throw "Date Has Not Yet Occured. Please Enter A Valid Date.";
            }
            let diff = Math.abs(new Date().getTime() - new Date(req.body.date).getTime()) / (1000 * 60 * 60 * 24);

            if (diff > 14) {
                throw "Date Is More Than Two Weeks Old. Please Enter A Valid Date.";
            }


            let date = req.body.date.split("-");
            let delimited = parseInt(date[1], 10) + "/" + parseInt(date[2], 10) + "/" + date[0];
            let address = req.body.street + ", Hoboken, Hudson County, New Jersey";
            geocoder.search({ street: req.body.street, city: "Hoboken", state: "New Jersey" }).then((response) => {
                let newLocation = location.createLocation(req.session.user['UserID'], Number(response[0].lon), Number(response[0].lat), address, delimited);
                res.render('partials/location_info', { geo: address, date: delimited, isError: false, error: null, isLoc: true });
                return;
            }).catch((error) => {
                res.render('partials/location_info', { geo: null, date: null, isError: true, error: "Invalid Hoboken Location. Please Try Again.", isLoc: false });
            })


        } catch (e) {
            console.log(e);
            let user_locations = await location.getUserLocations(req.session.user['UserID']);

            res.render('partials/location_info', { geo: null, date: null, isError: true, error: e, isLoc: false });

            return;
            //res.status(400).json(e);
        }
    } else {
        return res.redirect('/');
    }



});




module.exports = router;