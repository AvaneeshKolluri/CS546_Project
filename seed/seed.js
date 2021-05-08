//Change usernames & passwords to meet application requirements before submitting

const bcrypt = require('bcrypt');
let { ObjectId } = require('mongodb');
const collections = require('../config/mongoCollections');
const connection = require('../config/mongoConnection');
const locationSeedFile = require("./locationSeed");
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

    let locationList = [];
    for (let i = 0; i < locationSeedFile.length; i++) {
        l = locationSeedFile[i];
        l._id = new ObjectId(l._id);
        l.DateVisited = new Date(l.DateVisited);
        locationList.push(l);
    }
    const addLocationListData = await locationCollection.insert(locationList);
    if (addLocationListData.insertedCount != locationList.length) {
        throw addLocationListData.insertedCount + " were inserted instead of 9";
    }
    for (let i = 0; i < locationList.length; i++) {
        let l = locationList[i];
        let addLocation = await usersCollection.update({ UserID: l.UserID }, { $push: { locationIDs: l._id } });
        if (addLocation.result.nModified != 1) {
            throw "Expected modified: " + 1 + " Actual modified: " + addUser1Locations.result.nModified;
        }
    }
    console.log(`First user credentials: ${user1.UserID} : ${password1} \nLocations:`);
    for (let i = 0; i < locationList.length; i++) {
        if (locationList[i].UserID == user1.UserID) {
            console.log("\t" + locationList[i].Address);
        }
    }
    console.log(`Second user credentials: ${user2.UserID} : ${password2} \nLocations:`);
    for (let i = 0; i < locationList.length; i++) {
        if (locationList[i].UserID == user2.UserID) {
            console.log("\t" + locationList[i].Address);
        }
    }
    console.log(`Third user credentials: ${user3.UserID} : ${password3} \nLocations:`);
    for (let i = 0; i < locationList.length; i++) {
        if (locationList[i].UserID == user3.UserID) {
            console.log("\t" + locationList[i].Address);
        }
    }
    console.log("Loaded " + locationList.length + " locations from the last month");
    const db = await connection();
    await db.serverConfig.close();
}
main().catch((e) => console.error(e));