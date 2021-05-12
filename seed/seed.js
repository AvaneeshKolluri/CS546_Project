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
        email: "9khaledsoltam@coincun.com",
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
        passwordHash: "$2b$16$mmBm3SJmzTVOkrtk1.M86ew2m4g1AYQncJgipNTgB98AmICS6G0AC",
        email: "ppablou@billseo.com",
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
        UserID: "hihelloqwerty",
        passwordHash: "$2b$16$sdv4uqM0DaI8VgHx24XQZ.JklXZZA/iGbhCcxwIu5D65OrwdrJQAG",
        email: "e1999mohamad4@maoaed.site",
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
        UserID: "pancakes",
        passwordHash: "$2b$16$Y7/6lXqGlweFFWegs3AefuRLwRvg5tuo.7h.YeqfnM7Wlf9kAII8u",
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
        UserID: "lettuce",
        passwordHash: "$2b$16$mc4McLSQSZFHu/BckrhX4ON/I5falN1TCJ611jp6tTN0xjAhGUZLK",
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
        UserID: "greenforest",
        passwordHash: "$2b$16$zw1D4ORyuZ0UOjBSEQuFOemg8lLwig8w7.zRRyeVjAipl4GQ2J1oa",
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
        UserID: "seattlelover",
        passwordHash: "$2b$16$iriTVITMIDJomdp1MTe2xexwT.A1lu2PC17KcTXYqNW2X15vcLvZq",
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
        UserID: "yogaguru",
        passwordHash: "$2b$16$v5M0IVWFC4GTGStQwka98.38HFaQWxvMQgZOGF.2k8hlfql94rJHC",
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
        UserID: "explorer",
        passwordHash: "$2b$16$.8jC.Yr/RHXcTIygJZSTduvlnmq7TswNtn.JMOU.hQLJRA1G5pTJO",
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
        UserID: "pioneer",
        passwordHash: "$2b$16$R7gA8ULRibMTgZzQC0dw5Od9bbcWTT8wc.v895i1Tx6rb1IbHdyf.",
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
        UserID: "mathlover",
        passwordHash: "$2b$16$IVq7eVZ8kLpumm7bZLEVt.UJ0Ny3Y7WkfM.V2fRdALpDIYlLAQJ9u",
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
        UserID: "fallperson",
        passwordHash: "$2b$16$W2CE22q97Ayq8.kTeKOGa.fRUayeBEXiwMp35sXi6WhcgiH1uaeUy",
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
        UserID: "climber",
        passwordHash: "$2b$16$9zTJFIYy4BpXKF7XTNPQG.ldX4ZsJyiJXOT52XCVgma1sQIYKBBMe",
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
        UserID: "employee",
        passwordHash: "$2b$16$lZj0dBATdHfMTmlU9wYn5O61i6SB4STXx962f1p/rEn0UfPy6EMv.",
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
        UserID: "bigbaker",
        passwordHash: "$2b$16$hpYTYqmmG298p/yFyZhoMuNzCHBH48Y62GNHvT1Fl8WaQeu1WVJie",
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
        UserID: "entertainer",
        passwordHash: "$2b$16$sJa6Zg3Neo0T8NoS16f5bu8eqSAY1HZRAjMh3o0eLJeQT7HR7fldO",
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
        UserID: "thecarguy",
        passwordHash: "$2b$16$5tEtcf3u.rVUDq3fkxbbS.uRtaYfPMMHacuFqzZxOSpWgUQ1wF06i",
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
        UserID: "accountant",
        passwordHash: "$2b$16$iKcgMEIzuDQ8twaJFtuJxOGwHd0G2Ob3l80iMVIRZ6jnhgUmEXhYK",
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
        UserID: "zookeeper",
        passwordHash: "$2b$16$J8PA6nzUDhjvap1OVJz8KOleU9zJAzue.RgKCcLq6UW8dkHTCOa8.",
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
        UserID: "daredevil",
        passwordHash: "$2b$16$J5gn/F5h4oIQdjnpPaYVHuYnnOliFlGlKvYe4QL0w9XnNJEj86/D6",
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
            console.log(l);
            throw "Expected modified: " + 1 + " Actual modified: " + addLocation.result.nModified;
        }
    }
    console.log("Loaded " + 20 + " users");
    console.log("Loaded " + locationList.length + " locations from the last month");
    const db = await connection();
    await db.serverConfig.close();
}
main().catch((e) => console.error(e));