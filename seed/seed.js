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



    let user1 = {
        UserID: "cat123",
        passwordHash: "$2b$16$8eO89CCxGA0t.DwfKG2Dp.1NI/kNAKOJtMTxLe05QsX3MZ3fdFslK",
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



    let user2 = {
        UserID: "dog321",
        passwordHash: "$2b$16$91w4Vm9r51JGVERNamGD6e4E3wVwoCoE9mgqnHwzJNta7VPqIqy4O",
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


    let user3 = {
        UserID: "HiHelloQwerty",
        passwordHash: "$2b$16$IJB70UUtZQDDCM79rJW8Ouih7BN/2skkVqiR4wsWQuN0tzKUYOi6q",
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


    let user4 = {
        UserID: "Pancakes",
        passwordHash: "$2b$16$a4CGiE.JSaQofW71MNv9Qus/ZsQmCeZkm7KTE.SjsTw/8.EBNPVem",
        email: "5rahul@godobolet.buzz",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/11/2021")
        }
    };
    const insertFourthUser = await usersCollection.insertOne(user4);
    if (insertFourthUser.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insertFourthUser.insertedCount;
    }


    let user5 = {
        UserID: "Lettuce",
        passwordHash: "$2b$16$7Zmdq4BY7/gSoP6Kkv9MqOccbm5PTK/UOXvzO.JfwCDcnX7d6fQA.",
        email: "1geyce.chre@dichima.com",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/22/2021")
        }
    };
    const insertFifthUser = await usersCollection.insertOne(user5);
    if (insertFifthUser.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insertFifthUser.insertedCount;
    }


    let user6 = {
        UserID: "GreenForest",
        passwordHash: "$2b$16$PPFCY/Oapl3hwIvieyuFWeSvzsEWUQTY8wFj00qzVna2XAzb0fxNG",
        email: "msamedomamedofms@somitata.com",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/17/2021")
        }
    };
    const insertSixthUser = await usersCollection.insertOne(user6);
    if (insertSixthUser.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insertSixthUser.insertedCount;
    }


    let user7 = {
        UserID: "SeattleLover",
        passwordHash: "$2b$16$cU5VTQgs1z.k9dIt8fq9wOAMHFOI6lVfRdYr8yro.uuibO2dxeJW.",
        email: "dcanerkaraveliogy@noisemails.com",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/15/2021")
        }
    };
    const insertSeventhUser = await usersCollection.insertOne(user7);
    if (insertSeventhUser.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insertSeventhUser.insertedCount;
    }


    let user8 = {
        UserID: "YogaGuru",
        passwordHash: "$2b$16$NoKU76hfGNvFun9FihNNXu7DSJZpm8u0tPjsqeYDNr/.wc4o7FR7G",
        email: "asab@gddao.com",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/29/2021")
        }
    };
    const insertEighthUser = await usersCollection.insertOne(user8);
    if (insertEighthUser.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insertEighthUser.insertedCount;
    }


    let user9 = {
        UserID: "Explorer",
        passwordHash: "$2b$16$m3lDGUIVlUsasx/z5mzJzOim2kT38no.bhYPTq39j80MlmNIw1qsi",
        email: "wlovesfand21@icahu.com",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/29/2021")
        }
    };
    const insertNinthUser = await usersCollection.insertOne(user9);
    if (insertNinthUser.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insertNinthUser.insertedCount;
    }


    let user10 = {
        UserID: "Pioneer",
        passwordHash: "$2b$16$oOwPwWwfkjafgf.WM0mX4OB7dLznlR4zQqyhzDWgYUerZ.usjwckC",
        email: "7last.round.37@docx.site",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/25/2021")
        }
    };
    const insertTenthUser = await usersCollection.insertOne(user10);
    if (insertTenthUser.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insertTenthUser.insertedCount;
    }


    let user11 = {
        UserID: "MathLover",
        passwordHash: "$2b$16$oB/Q5zey16UWbSGwE3Q3Ouw9JfQCcs.ut3OhM0/2O0wkiktTiLZZq",
        email: "uyasirshakespear9@betwin899.net",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/11/2021")
        }
    };
    const insert11User = await usersCollection.insertOne(user11);
    if (insert11User.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insert11User.insertedCount;
    }


    let user12 = {
        UserID: "FallPerson",
        passwordHash: "$2b$16$HgSA3BDAz/LqHNnYiVq2bOs91GWxpLmAW2fvBYcidbZ67aQoHvJp2",
        email: "vabody.alhrb@tapiitudulu.com",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/11/2021")
        }
    };
    const insert12User = await usersCollection.insertOne(user12);
    if (insert12User.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insert12User.insertedCount;
    }


    let user13 = {
        UserID: "Climber",
        passwordHash: "$2b$16$G61FNDNlNYFYC4BvOID.fu0AiP5m7oM3zeI262NoHIJiR8b5DGmOO",
        email: "bsevenraysg@gmailup.com",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/15/2021")
        }
    };
    const insert13User = await usersCollection.insertOne(user13);
    if (insert13User.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insert13User.insertedCount;
    }


    let user14 = {
        UserID: "Employee",
        passwordHash: "$2b$16$Uet7/m18toOCPXNYOtzUTOd80abmfo2Kx4vPPo0OmuXDJ.xrmZVe.",
        email: "3kader.l.rebiair@tahugejrot.buzz",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/07/2021")
        }
    };
    const insert14User = await usersCollection.insertOne(user14);
    if (insert14User.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insert14User.insertedCount;
    }


    let user15 = {
        UserID: "Baker",
        passwordHash: "$2b$16$pNQ3pznp.Fr.cRDEuTbT3uZv2xEqkAmSNd18wf19xRBmfC1JSyO7O",
        email: "ossama.bargachi@notvn.com",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/08/2021")
        }
    };
    const insert15User = await usersCollection.insertOne(user15);
    if (insert15User.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insert15User.insertedCount;
    }


    let user16 = {
        UserID: "Entertainer",
        passwordHash: "$2b$16$uM1/6bkqmH0QXXDVbh8mbO7uAU.GxyiuEKyVMzpOwwMsLjJKYr5eG",
        email: "orachid.mirbouhik@ebarg.net",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/17/2021")
        }
    };
    const insert16User = await usersCollection.insertOne(user16);
    if (insert16User.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insert16User.insertedCount;
    }


    let user17 = {
        UserID: "CarGuy",
        passwordHash: "$2b$16$7Hey1KUqU9WKdKAUSZK7cuixXVikRwijs8qBonjs4oBfvQLTvz/Qi",
        email: "amaicon-lahm9@ducatimotorclubdenver.com",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/24/2021")
        }
    };
    const insert17User = await usersCollection.insertOne(user17);
    if (insert17User.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insert17User.insertedCount;
    }


    let user18 = {
        UserID: "Accountant",
        passwordHash: "$2b$16$1Iqh1krgwBYHKew9T4w1U.aU4tGB5TZHFVqNAgYDjutRVBY22OVYS",
        email: "abtatssso@cajon.ca",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/16/2021")
        }
    };
    const insert18User = await usersCollection.insertOne(user18);
    if (insert18User.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insert18User.insertedCount;
    }


    let user19 = {
        UserID: "Zookeeper",
        passwordHash: "$2b$16$dsOEj/WCiPJ0wesMcibbnecCKI.SwZj0JswZdUgp0u2bFDmNrdCW6",
        email: "dsol.ell@werkuldino.buzz",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/14/2021")
        }
    };
    const insert19User = await usersCollection.insertOne(user19);
    if (insert19User.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insert19User.insertedCount;
    }


    let user20 = {
        UserID: "Daredevil",
        passwordHash: "$2b$16$/kUAphUhzTRo8Y0g9Hu/GOpgKAEaBlggJun0gLTmaOvkPzN/GtY1.",
        email: "tsmailmixra@plussmail.com",
        locationIDs: [],
        covidStatus: {
            reportPositive: true,
            dateReported: new Date("04/25/2021")
        }
    };
    const insert20User = await usersCollection.insertOne(user20);
    if (insert20User.insertedCount != 1) {
        throw "Expected inserted: " + 1 + " Actual inserted: " + insert20User.insertedCount;
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
    // console.log(`First user credentials: ${user1.UserID} : ${password1} \nLocations:`);
    // for (let i = 0; i < locationList.length; i++) {
    //     if (locationList[i].UserID == user1.UserID) {
    //         console.log("\t" + locationList[i].Address);
    //     }
    // }
    // console.log(`Second user credentials: ${user2.UserID} : ${password2} \nLocations:`);
    // for (let i = 0; i < locationList.length; i++) {
    //     if (locationList[i].UserID == user2.UserID) {
    //         console.log("\t" + locationList[i].Address);
    //     }
    // }
    // console.log(`Third user credentials: ${user3.UserID} : ${password3} \nLocations:`);
    // for (let i = 0; i < locationList.length; i++) {
    //     if (locationList[i].UserID == user3.UserID) {
    //         console.log("\t" + locationList[i].Address);
    //     }
    // }
    console.log("Loaded " + locationList.length + " locations from the last month");
    const db = await connection();
    await db.serverConfig.close();
}
main().catch((e) => console.error(e));