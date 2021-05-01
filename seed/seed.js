//Change usernames & passwords to meet application requirements before submitting

const bcrypt = require('bcrypt');
let { ObjectId } = require('mongodb');
const collections = require('../config/mongoCollections');
const connection = require('../config/mongoConnection');
const { covidStatus } = require('../data/validate');

const users = collections.users;
const locations = collections.locations;

async function main() {

    const usersCollection = await users();
    const locationCollection = await locations();
    usersCollection.remove({});
    locationCollection.remove({});

    let password1 = "Thisisapassword321";
    let user1 = {
        UserID: "cat123",
        passwordHash: await bcrypt.hash(password1, 16),
        email: "example@example.com",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/25/2021")
        }
    };
    const insertFirstUser = await usersCollection.insertOne(user1);
    if (insertFirstUser.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insertFirstUser.insertedCount;
    }
    let firstUserId = user1.UserID;

    let password2 = "Hunter23";
    let user2 = {
        UserID: "dog321",
        passwordHash: await bcrypt.hash(password2, 16),
        email: "test@test.com",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/25/2021")
        }
    };
    const insertSecondUser = await usersCollection.insertOne(user2);
    if (insertSecondUser.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insertSecondUser.insertedCount;
    }

    let secondUserId = user2.UserID;

    let password3 = "ComplicatedPassword!23";
    let user3 = {
        UserID: "HiHelloQwerty",
        passwordHash: await bcrypt.hash(password3, 16),
        email: "123@123gmail.com",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/01/2021")
        }
    };
    const insertThirdUser = await usersCollection.insertOne(user3);
    if (insertThirdUser.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insertThirdUser.insertedCount;
    }

    let thirdUserId = user3.UserID;

    let location1 = {
        _id: ObjectId(),
        Coordinates: {
            type: "Point",
            coordinates: [-74.0313, 40.74273]
        },
        UserID: firstUserId,
        CovidStatus: true,
        Address: "504 Garden Street, Hoboken, Hudson County, New Jersey, 07030, United States of America",
        DateVisited: new Date("04/25/2021")
    };
    let location2 = {
        _id: ObjectId(),
        Coordinates: {
            type: "Point",
            coordinates: [-74.035, 40.74575]
        },
        UserID: firstUserId,
        CovidStatus: false,
        Address: "619 Adams Street, Hoboken, Hudson County, New Jersey, 07030, United States of America",
        DateVisited: new Date("04/11/2021")
    };

    let location3 = {
        _id: ObjectId(),
        Coordinates: {
            type: "Point",
            coordinates: [-74.0335, 40.7449]
        },
        UserID: firstUserId,
        CovidStatus: false,
        Address: "614 Clinton Street, Hoboken, Hudson County, New Jersey, 07030, United States of America",
        DateVisited: new Date("05/01/2021")
    };

    let location4 = {
        _id: ObjectId(),
        Coordinates: {
            type: "Point",
            coordinates: [-74.0337, 40.74438]
        },
        UserID: secondUserId,
        CovidStatus: false,
        Address: "600 Clinton Street, Hoboken, Hudson County, New Jersey, 07030, United States of America",
        DateVisited: new Date("04/01/2021")
    };

    let location5 = {
        _id: ObjectId(),
        Coordinates: {
            type: "Point",
            coordinates: [-74.0301, 40.7406]
        },
        UserID: secondUserId,
        CovidStatus: false,
        Address: "314 Washington Street, Hoboken, Hudson County, New Jersey, 07030, United States of America",
        DateVisited: new Date("04/21/2021")
    };

    let location6 = {
        _id: ObjectId(),
        Coordinates: {
            type: "Point",
            coordinates: [-74.023840, 40.745010]
        },
        UserID: secondUserId,
        CovidStatus: false,
        Address: "1 Castle Point Terrace, Hoboken, Hudson County, New Jersey, 07030, United States of America",
        DateVisited: new Date("04/15/2021")
    };

    let location7 = {
        _id: ObjectId(),
        Coordinates: {
            type: "Point",
            coordinates: [-74.030200, 40.738550]
        },
        UserID: thirdUserId,
        CovidStatus: true,
        Address: "135 Washington Street, Hoboken, Hudson County, New Jersey, 07030, United States of America",
        DateVisited: new Date("04/13/2021")
    };

    let location8 = {
        _id: ObjectId(),
        Coordinates: {
            type: "Point",
            coordinates: [-74.030800, 40.737190]
        },
        UserID: thirdUserId,
        CovidStatus: true,
        Address: "95 Washington Street, Hoboken, Hudson County, New Jersey, 07030, United States of America",
        DateVisited: new Date("04/01/2021")
    };
    let location9 = {
        _id: ObjectId(),
        Coordinates: {
            type: "Point",
            coordinates: [-74.030800, 40.737190]
        },
        UserID: thirdUserId,
        CovidStatus: true,
        Address: "95 Washington Street, Hoboken, Hudson County, New Jersey, 07030, United States of America",
        DateVisited: new Date("04/01/2021")
    };
    let locationList = [location1, location2, location3, location4, location5, location6, location7, location8, location9];
    let user1LocationIDs = [location1._id, location2._id, location3._id];
    let user2LocationIDs = [location4._id, location5._id, location6._id];
    let user3LocationIDs = [location7._id, location8._id, location9._id];

    const addLocationListData = await locationCollection.insert(locationList);
    if (addLocationListData.insertedCount != 9) {
        throw addLocationListData.insertedCount + " were inserted instead of 9";
    }

    const addUser1Locations = await usersCollection.update({ UserID: firstUserId }, { $addToSet: { locationIDs: { $each: user1LocationIDs } } });
    if (addUser1Locations.result.nModified != 1) {
        throw "Expected modified: " + 1 + " Actual modified: " + addUser1Locations.result.nModified;
    }

    const addUser2Locations = await usersCollection.update({ UserID: secondUserId }, { $addToSet: { locationIDs: { $each: user2LocationIDs } } });
    if (addUser2Locations.result.nModified != 1) {
        throw "Expected modified: " + 1 + " Actual modified: " + addUser2Locations.result.nModified;
    }

    const addUser3Locations = await usersCollection.update({ UserID: thirdUserId }, { $addToSet: { locationIDs: { $each: user3LocationIDs } } });
    if (addUser3Locations.result.nModified != 1) {
        throw "Expected modified: " + 1 + " Actual modified: " + addUser3Locations.result.nModified;
    }

    console.log(`First user credentials: ${user1.UserID} : ${password1}`);
    console.log(`${user1.UserID} visited the following addresses: `);
    console.log("\t" + location1.Address + " on " + location1.DateVisited + "\n\t" + location2.Address + " on " + location2.DateVisited + "\n\t" + location3.Address + " on " + location3.DateVisited);

    console.log(`Second user credentials: ${user2.UserID} : ${password2}`);
    console.log(`${user2.UserID} visited the following addresses: `);
    console.log("\t" + location4.Address + " on " + location4.DateVisited + "\n\t" + location5.Address + " on " + location5.DateVisited + "\n\t" + location6.Address + " on " + location6.DateVisited);

    console.log(`Third user credentials: ${user3.UserID} : ${password3}`);
    console.log(`${user3.UserID} visited the following addresses: `);
    console.log("\t" + location7.Address + " on " + location7.DateVisited + "\n\t" + location8.Address + " on " + location8.DateVisited + "\n\t" + location9.Address + " on " + location9.DateVisited);

    const db = await connection();
    await db.serverConfig.close();
}
main().catch((e) => console.error(e));