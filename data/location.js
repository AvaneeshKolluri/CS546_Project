const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
let { ObjectId } = require('mongodb');
const collections = require('../config/mongoCollections');
const connection = require('../config/mongoConnection');
const validate = require("./validate");

const users = collections.users;
const locations = collections.locations;

function sendCovidAlert(emails, address, date) {
    const account = {
        service: 'gmail',
        auth: {
            user: "covid19hotspots@gmail.com",
            pass: "#^TjsoYIC&@b"
        }
    };
    const transporter = nodemailer.createTransport(account);
    for (let i = 0; i < emails.length; i++) {
        const alert = {
            from: account.auth.user,
            to: emails[i],
            subject: "URGENT: Covid Hotspot Alert",
            text: `There has been a positive Covid result near ${address} on ${date}. Your previous submissions suggest that you may have potentially came into contact with COVID 19.`
        };
        transporter.sendMail(alert, function(error) {
            if (error) {
                throw "Error sending email: " + error;
            }
        });
        return true;
    }
}
const exportedMethods = {
    async createLocation(userID, longitude, latitude, covidStatus, Address, dateVisited) {
        if (!validate.username(userID)) {
            throw "Invalid User ID parameter";
        }
        if (!validate.coordinates(longitude, latitude)) {
            throw "Invalid coordinate parameters";
        }
        if (!validate.covidStatus(covidStatus)) {
            throw "Invalid covidStatus parameter"
        }
        if (!validate.address(Address)) {
            throw "Invalid parameters";
        }
        if (!validate.dateVisited(dateVisited)) {
            throw "Invalid Data parameter";
        }
        let location = {
            Coordinates: {
                type: "Point",
                coordinates: [longitude, latitude],
            },
            userID: userID,
            covidStatus: covidStatus,
            Address: Address,
            DateVisited: dateVisited
        };
        const usersCollection = await users();
        //Check if user exists
        const user = await usersCollection.findOne({ UserID: ObjectId(userID) });
        if (user == null) {
            throw "No User with id " + userID;
        }

        //Add location document to location collection
        const locationsCollection = await locations();
        const submitLocation = locationsCollection.insertOne(location);
        if (submitLocation.insertedCount == 0) {
            throw "Could not insert location into database";
        }

        //Add locationID to users locationID array
        const addToUser = await usersCollection.update({ userID: userID }, { $push: { locationIDs: submitLocation.insertedID } });
        if (addToUser.result.nModified != 1) {
            throw "Could not updates users subdocument array";
        }
        //If the location is covid negative, don't send notifications
        if (!covidStatus) {
            return location;
        }
        //Find locations within 50 meter of the positive location
        const nearbyLocations = locationsCollection.find({
            location: {
                $near: {
                    $geometry: location.Coordinates,
                    $minDistance: 50,
                    $maxDistance: 50
                }
            }
        });
        //There are no nearby locations
        if (nearbyLocations.length == 0) {
            return location;
        }

        let emails = [];
        //Get userIDs from locations
        for (let i = 0; i < nearbyLocations.length; i++) {
            const getUser = await usersCollection.findOne({ _id: nearbyLocations.UserID });
            if (getUser == null) {
                throw "Location document has invalid User ID";
            }
            emails.push(getUser.email);
        }

        //send alerts to emails
        sendCovidAlert(emails, location.DateVisited, location.Addresss);
        return location;
    },
    async getUserLocations(userID) {


        /*if (!validate.userID(userID)) {
            throw "Invalid userID parameter";
        }*/
        //const toMongoID = ObjectId(userID);
        //get the ObjectID by searching through


        //const toMongoID = req.session.userid._id;



        const usersCollection = await users();
        const user = await usersCollection.findOne({ UserID: userID });
        if (user == null) {
            throw "No User with id " + userID;
        }
        const locationsCollection = await locations();
        locationDocuments = [];
        //console.log(typeof(user.locations));

        console.log(user);

        for (let user_location of user.locationIDs) {
            console.log(user_location);

            const locationDocument = await locationsCollection.findOne({ _id: user_location });
            if (locationDocument == null) {
                throw "No location document with id " + user_location;
            }
            locationDocuments.push(locationDocument);

        }
        return locationDocuments;


    },
    async getAllLocations() {
        const locationsCollection = await locations();
        //You need toArray() at the end b/c without it you return a cursor to the result set of a query
        const locationsArray = await locationsCollection.find({}).toArray();
        return locationsArray;
    }
};

module.exports = exportedMethods;