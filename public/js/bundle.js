
// function getLocations(){
//     const mongojs = require('mongojs')
//     const db = mongojs('Covid_Hotspot')
//     const mycollection = db.collection('location')

//     db.mycollection.find(function (err, docs) {
//         console.log(docs);
//     })
// }
function getLocations(){
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/Covid_Hotspot', {useNewUrlParser: true, useUnifiedTopology: true});

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("opened");
        var schema = mongoose.Schema({ name: 'location' });
        console.log(schema);
    });
}


window.onload = function() {
    getLocations();
}