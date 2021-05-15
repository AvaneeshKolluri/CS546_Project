const emailValidator = require("deep-email-validator");
const xss = require("xss");
const exportedMethods = {
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
        return true;
    },
    covidStatus(covidStatus) {
        if (!(covidStatus) || (typeof(covidStatus) != "boolean")) {
            return false;
        }
        return true;
    },
    address(address) {
        if (!address || typeof address !== "string" || address.trim().length == 0) {
            return false;
        }
        return this.xssTest(address);
    },
    dateVisited(dateVisited) {
        try {
            if (!dateVisited || typeof dateVisited != 'string' || dateVisited.trim().length == 0) {
                return false;
            }

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
        if (username.trim().length < 6 || username.trim().length > 16) {
            return false;
        }
        // Alphanumeric string between 6 to 16 characters
        let usernamePattern = /^[a-zA-Z0-9]{6,16}$/;
        return username.match(usernamePattern) && this.xssTest(username);
    },
    password(password) {
        if (!password || typeof password !== "string" || password.trim().length == 0) {
            return false;
        }
        //Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long 
        if (password.length < 8) {
            return false;
        }
        var localF = /\d/;
        if (localF.test(password) == false) {
            return false;
        }
        var hasUpper = false;
        for (i = 0; i < password.length; i++) {
            if (password[i] == password[i].toUpperCase() && password[i] != password[i].toLowerCase()) {
                hasUpper = true;
            }
        }
        if (hasUpper == false) {
            return false;
        }

        let passwordPattern = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
        return password.match(passwordPattern) != null && this.xssTest(password);
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
        //Check if the email is valid
        const isValid = await emailValidator.validate(email);
        return isValid.valid;
    }

};

module.exports = exportedMethods;