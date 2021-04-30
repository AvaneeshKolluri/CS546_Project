let { ObjectId } = require('mongodb');
const emailValidator = require("deep-email-validator");
const css = require("xss");
const exportedMethods = {
    //userID(userID) {
    //    if (!userId || typeof userID !== "string" || userID.trim().length == 0) {
    //        return false;
    //    }
    //    try {
    //        ObjectId(userID);
    //        return true;
    //    } catch (e) {
    //        return false;
    //    }
    //},
    xssTest(input) {
        return xss(input) === input;
    },
    coordinates(longitude, latitude) {
        if (typeof longitude !== "number") {
            return false;
        }
        if (typeof latitude !== "number") {
            return false;
        }
        return this.xssTest(longitude) && this.xssTest(latitude);
    },
    covidStatus(covidStatus) {
        if (!covidStatus || typeof covidStatus !== "boolean") {
            return false;
        }
        return this.xssTest(covidStatus);
    },
    address(address) {
        if (!address || typeof address !== "string" || address.trim.length == 0) {
            return false;
        }
        return this.xssTest(address);
    },
    dateVisited(dateVisited) {
        try {
            Date(dateVisited);
        } catch (e) {
            return false;
        }
        return this.xssTest(dateVisited);
    },
    userID(username) {
        if (!username || typeof username !== "string" || username.trim().length == 0) {
            return false;
        }
        // Alphanumeric string between 6 to 16 characters
        let usernamePattern = /^[a-z0-9]{6,16}$/;
        return username.match(usernamePattern) && this.xssTest(username);
    },
    password(password) {
        if (!password || typeof password !== "string" || password.trim().length == 0) {
            return false;
        }
        //Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long 
        let passwordPattern = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
        return password.match(passwordPattern) && this.xssTest(username);
    },
    async email(email) {
        if (!email || typeof email !== "string" || email.trim().length == 0) {
            return false;
        }
        if (!this.xssTest(email)) {
            return false;
        }
        //Checks if email is of valid format
        let emailPattern = /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if (!email.match(emailPattern)) {
            return false;
        }
        //Check if the email is valid, double check if it works
        const isValid = await emailValidator.validate(email);
        return isValid.valid;
    }

};

module.exports = exportedMethods;