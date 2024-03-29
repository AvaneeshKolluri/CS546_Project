const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
let { ObjectId } = require('mongodb');
const collections = require('../config/mongoCollections');
const connection = require('../config/mongoConnection');
const validate = require("./validate");

require('dotenv').config()

const users = collections.users;
const locations = collections.locations;

function sendCovidAlert(emails, date, address) {
    const account = {
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.password
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
        try {
            const sendData = transporter.sendMail(alert);
            console.log("Sending emails to " + emails[i])
        } catch (e) {
            console.log("Invalid Email, did not send alert");
        }
    }
}
const exportedMethods = {
    async createLocation(userID, longitude, latitude, Address, dateVisited) {

        if (!(validate.userID(userID))) {
            throw "Invalid User ID parameter.";
        }

        if (!(validate.coordinates(longitude, latitude))) {
            throw "Invalid coordinate parameter.";
        }

        if (!(validate.address(Address))) {
            throw "Invalid Address parameter.";
        }
        if (!(validate.dateVisited(dateVisited))) {
            throw "Invalid Data Visited parameter.";
        }

        try {
            longitude = Number(longitude);
            latitude = Number(latitude);
        } catch {
            throw "Could not convert coordinates to numbers";
        }
        let location = {
            Coordinates: {
                type: "Point",
                coordinates: [longitude, latitude],
            },
            UserID: userID,
            Address: Address,
            DateVisited: new Date(dateVisited)
        };
        const usersCollection = await users();

        const user = await usersCollection.findOne({ UserID: userID });
        if (user == null) {
            throw "No User with id " + userID;
        }

        const locationsCollection = await locations();
        const submitLocation = await locationsCollection.insertOne(location);
        if (submitLocation.insertedCount == 0) {
            throw "Could not insert location into database";
        }
        const location_mongoID = submitLocation.insertedId;


        //Add locationID to users locationID array
        const addToUser = await usersCollection.update({ UserID: userID }, { $push: { locationIDs: submitLocation.insertedId } });
        if (addToUser.result.nModified != 1) {
            throw "Could not updates users subdocument array";
        }

        //Find locations within 50 meter of the positive location
        await locationsCollection.createIndex({ "Coordinates": "2dsphere" });
        const nearbyLocations = await locationsCollection.find({
            DateVisited: {
                $lte: (new Date(dateVisited))
            },
            Coordinates: {
                $near: {
                    $geometry: location.Coordinates,
                    $maxDistance: 75
                }
            }
        }).toArray();
        //There are no nearby locations
        if (nearbyLocations.length < 5) {
            return location;
        }

        let emails = [];
        //Get userIDs from locations
        for (let i = 0; i < nearbyLocations.length; i++) {
            if (nearbyLocations[i].UserID == userID) {
                continue;
            }
            const getUser = await usersCollection.findOne({ UserID: nearbyLocations[i].UserID });
            if (getUser == null) {
                throw "Location document has invalid User ID";
            }
            emails.push(getUser.email);
        }
        //send alerts to emails
        sendCovidAlert(emails, dateVisited, Address);

        return location;
    },
    async getUserLocations(userID) {


        if (!(validate.userID(userID))) {
            throw "Invalid User ID parameter.";
        }

        const usersCollection = await users();
        const user = await usersCollection.findOne({ UserID: userID });
        if (user == null) {
            throw "No User with id " + userID;
        }
        const locationsCollection = await locations();
        locationDocuments = [];

        for (let user_location of user.locationIDs) {
            const locationDocument = await locationsCollection.findOne({ _id: user_location });
            if (locationDocument == null) {
                throw "No location document with id " + user_location;
            }
            let date = locationDocument.DateVisited.getDate();
            let month = locationDocument.DateVisited.getMonth() + 1;
            let year = locationDocument.DateVisited.getFullYear();
            locationDocument.DateVisited = month + "/" + date + "/" + year;
            locationDocuments.push(locationDocument);

        }
        return locationDocuments;


    },
    async getAllLocations() {
        const locationsCollection = await locations();
        //You need toArray() at the end b/c without it you return a cursor to the result set of a query
        const locationsArray = await locationsCollection.find({}).toArray();
        return locationsArray;
    },
    async deleteOldLocations() {
        const locationsCollection = await locations();
        const usersCollection = await users();

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() - 14);
        const toBeDeleted = await locationsCollection.find({
            DateVisited: {
                $lt: expiryDate
            }
        }).toArray();
        const numDeleted = toBeDeleted.length;
        for (let i = 0; i < numDeleted; i++) {
            let location = toBeDeleted[i];;
            await usersCollection.update({ UserID: location.UserID }, { $pull: { locationIDs: location._id } });
        }
        const deleteFromLocations = await locationsCollection.remove({
            DateVisited: {
                $lte: expiryDate
            }
        });
    }
};

module.exports = exportedMethods;