const bcrypt = require('bcrypt');
let { ObjectId } = require('mongodb');
const collections = require('../config/mongoCollections');
const connection = require('../config/mongoConnection');

const users = collections.users;
const locations = collections.locations;

async function main() {

    const usersCollection = await users();
    const locationCollection = await locations();
    usersCollection.remove({});
    locationCollection.remove({});

    let password1 = "thisisapassword321";
    let user1 = {
        UserID: "Cat123",
        passwordHash: await bcrypt.hash(password1, 16),
        email: "example@example.com",
        locationIDs: []
    };
    const insertFirstUser = await usersCollection.insertOne(user1);
    if (insertFirstUser.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insertFirstUser.insertedCount;
    }
    let firstUserId = insertFirstUser.insertedId;

    let password2 = "hunter2";
    let user2 = {
        UserID: "Dog321",
        passwordHash: await bcrypt.hash(password2, 16),
        email: "test@test.com",
        locationIDs: []
    };
    const insertSecondUser = await usersCollection.insertOne(user2);
    if (insertSecondUser.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insertSecondUser.insertedCount;
    }

    let secondUserId = insertSecondUser.insertedId;

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

    let locationList = [location1, location2, location3, location4, location5, location6];

    let user1LocationIDs = [location1._id, location2._id, location3._id];
    let user2LocationIDs = [location4._id, location5._id, location6._id];

    const addLocationListData = await locationCollection.insert(locationList);
    if (addLocationListData.insertedCount != 6) {
        throw addLocationListData.insertedCount + " were inserted instead of 6";
    }

    const addUser1Locations = await usersCollection.update({ _id: firstUserId }, { $addToSet: { locationIDs: { $each: user1LocationIDs } } });
    if (addUser1Locations.result.nModified != 1) {
        throw "Expected modified: " + 1 + " Actual modified: " + addUser1Locations.result.nModified;
    }

    const addUser2Locations = await usersCollection.update({ _id: secondUserId }, { $addToSet: { locationIDs: { $each: user2LocationIDs } } });
    if (addUser2Locations.result.nModified != 1) {
        throw "Expected modified: " + 1 + " Actual modified: " + addUser2Locations.result.nModified;
    }

    console.log(`First user credentials: ${user1.UserID} : ${password1}`);
    console.log(`${user1.UserID} visited the following addresses: `);
    console.log("\t" + location1.Address + " on " + location1.DateVisited + "\n\t" + location2.Address + " on " + location2.DateVisited + "\n\t" + location3.Address + " on " + location3.DateVisited);

    console.log(`Second user credentials: ${user2.UserID} : ${password2}`);
    console.log(`${user2.UserID} visited the following addresses: `);
    console.log("\t" + location4.Address + " on " + location4.DateVisited + "\n\t" + location5.Address + " on " + location5.DateVisited + "\n\t" + location6.Address + " on " + location6.DateVisited);

    const db = await connection();
    await db.serverConfig.close();
}
main().catch((e) => console.error(e));