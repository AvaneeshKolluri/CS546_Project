let { ObjectId } = require('mongodb');

const Nominatim = require('nominatim-geocoder');
const geocoder = new Nominatim();

async function main() {
    let userList = ["cat123", "dog321", "hihelloqwerty", "pancakes", "lettuce",
        "greenforest", "seattlelover", "yogaguru", "explorer", "pioneer", "mathlover",
        "fallperson", "climber", "employee", "bigbaker", "entertainer", "thecarguy", "accountant", "zookeeper", "daredevil"
    ];
    let streets = ["Washington Street", "Sinatra Drive", "River Street", "Court Street", "Bloomfield Street, Garden Street", "Park Avenue", "Willow Avenue",
        "Clinton Street", "Grand Street", "Adams Street", "Madison Street", "Monroe Street"
    ];
    let numAddresses = 200;
    console.log("let today = new Date();");
    console.log("let locations = [");
    for (let i = 0; i < numAddresses; i++) {
        //console.log("Generating address " + (i + 1) + "/" + numAddresses);
        let date = new Date();
        let l = {
            _id: ObjectId(),
            Coordinates: {
                type: "Point",
                coordinates: []
            },
            UserID: userList[Math.round(Math.random() * (userList.length - 1))],
            Address: "",
            DateVisited: date.setDate(date.getDate() - Number(Math.round(Math.random() * 14)))
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
        console.log(JSON.stringify(l) + ",");
    }
    console.log("];");
    console.log("module.exports = locations;")
}
main().catch((e) => console.error(e));