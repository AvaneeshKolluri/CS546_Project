//Change usernames & passwords to meet application requirements before submitting

const bcrypt = require('bcrypt');
let { ObjectId } = require('mongodb');
const collections = require('../config/mongoCollections');
const connection = require('../config/mongoConnection');
const Nominatim = require('nominatim-geocoder');
const geocoder = new Nominatim();

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

    let userList = [firstUserId, secondUserId, thirdUserId];
    let locationList = [];
    let streets = ["Washington Street", "Sinatra Drive", "River Street", "Court Street", "Bloomfield Street, Garden Street", "Park Avenue", "Willow Avenue",
        "Clinton Street", "Grand Street", "Adams Street", "Madison Street", "Monroe Street"
    ];
    let numAddresses = 25;
    for (let i = 0; i < numAddresses; i++) {
        console.log("Generating address " + (i + 1) + "/" + numAddresses);
        let date = new Date();
        date.setDate(date.getDate() - Number(Math.round(Math.random() * 30)));
        let l = {
            _id: ObjectId(),
            Coordinates: {
                type: "Point",
                coordinates: []
            },
            UserID: userList[Math.round(Math.random() * 2)],
            Address: "",
            DateVisited: date
        };
        let number = Math.round(Math.random() * (1500));
        let street = streets[Math.round(Math.random() * (streets.length - 1))];
        let address = number + " " + street;
        let response = await geocoder.search({
            street: address,
            city: "Hoboken",
            state: "New Jersey"
        });
        let long = Number(response[0].lon);
        let lat = Number(response[0].lat);
        l.Coordinates.coordinates = [long, lat];
        l.Address = address + ", Hoboken, New Jersey";
        locationList.push(l);
    }
    const addLocationListData = await locationCollection.insert(locationList);
    if (addLocationListData.insertedCount != numAddresses) {
        throw addLocationListData.insertedCount + " were inserted instead of 9";
    }
    for (let i = 0; i < numAddresses; i++) {
        let l = locationList[i];
        let addLocation = await usersCollection.update({ UserID: l.UserID }, { $push: { locationIDs: l._id } });
        if (addLocation.result.nModified != 1) {
            throw "Expected modified: " + 1 + " Actual modified: " + addUser1Locations.result.nModified;
        }
    }
    console.log(`First user credentials: ${user1.UserID} : ${password1} \nLocations:`);
    for (let i = 0; i < numAddresses; i++) {
        if (locationList[i].UserID == user1.UserID) {
            console.log("\t" + locationList[i].Address);
        }
    }
    console.log(`Second user credentials: ${user2.UserID} : ${password2} \nLocations:`);
    for (let i = 0; i < numAddresses; i++) {
        if (locationList[i].UserID == user2.UserID) {
            console.log("\t" + locationList[i].Address);
        }
    }
    console.log(`Third user credentials: ${user3.UserID} : ${password3} \nLocations:`);
    for (let i = 0; i < numAddresses; i++) {
        if (locationList[i].UserID == user3.UserID) {
            console.log("\t" + locationList[i].Address);
        }
    }
    console.log("Generated " + numAddresses + " locations from the last month");
    const db = await connection();
    await db.serverConfig.close();
}
main().catch((e) => console.error(e));