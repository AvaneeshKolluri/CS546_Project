let { ObjectId } = require('mongodb');
const exportedMethods = {
    userID(userID) {
        if (!userId || typeof userID !== "string" || userID.trim().length == 0) {
            return false;
        }
        try {
            ObjectId(userID);
            return true;
        } catch (e) {
            return false;
        }
    },
    coordinates(longitude, latitude) {

    },
    covidStatus(covidStatus) {
        if (!covidStatus || typeof covidStatus !== "boolean") {
            return false;
        }
        return true;
    },
    address(address) {
        if (!address || typeof address !== "string" || address.trim.length == 0) {
            return false;
        }
        return true;
    },
    dateVisited(dateVisited) {
        try {
            Date(dateVisited);
        } catch (e) {
            return false;
        }
        return true;
    }
};