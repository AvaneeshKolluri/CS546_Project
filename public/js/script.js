
function initMap() {
    /* Data points defined as a mixture of WeightedLocation and LatLng objects */
var heatMapData = [
    {location: new google.maps.LatLng(40.74273, -74.0313), weight: 3},
    {location: new google.maps.LatLng(40.74575, -74.035), weight: 3},
    {location: new google.maps.LatLng(40.7449, -74.0335), weight: 3},
    {location: new google.maps.LatLng(40.74438, -74.0337), weight: 3},
    {location: new google.maps.LatLng(40.7406, -74.0301), weight: 3},
    {location: new google.maps.LatLng(40.745010, -74.023840), weight: 3},
];

  var hoboken = new google.maps.LatLng(40.745255,-74.034775);
  
  map = new google.maps.Map(document.getElementById('map'), {
    center: hoboken,
    zoom: 13,
    mapTypeId: 'roadmap'
  });
  
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData
  });
  heatmap.setMap(map);
}

// $(function(require) {
//     var databaseUrl = "Covid_Hotspots";
//     var collections = ["location"];
//     var db = require("mongojs").connect(databaseUrl, collections);
// });
// let mongojs;
// define(['require', 'mongojs'], function (require) {
//     mongojs = require('mongojs');
// });
// function getLocations(){
//     // simple usage for a local db
//     var db = mongojs('Covid_Hotspots');
//     var mycollection = db.collection('location');
//     // var databaseUrl = "Covid_Hotspots";
//     // var collections = ["location"];
//     // var db = require("mongojs").connect(databaseUrl, collections);
//     console.log('test');
    
//     db.mycollection.find(function (err, docs) {
//         console.log(docs);
//     });
// }

// function getLocations(){
//     const http = require('http');
//     const MongoClient = require('mongodb').MongoClient;
//     const assert = require('assert');
//     const url = 'mongodb://localhost:27017/Covid_Hotspots';
    
//     const server = http.createServer(function (request, response) {
//         getData(function (data) {
//             response.end(data);
//         });
//     });
    
//     function getData(callback) {
//         // Connect to the db
//         MongoClient.connect(url, function (err, db) {
//             assert.equal(null, err);
//             findRestaurants(db, function (data) {
//                 db.close();
//                 callback(data);
//             });
//         });
    
//         const findRestaurants = function (db, callback) {
//             const cursor = db.collection('locations').find();
//             const data = [];
//             cursor.each(function (err, doc) {
//                 assert.equal(err, null);
//                 data.push(doc);
//                 if (doc === null) {
//                     callback(data);
//                 }
//             });
//             console.log(data);
//         };
//     }
    
//     server.listen(5155);
// }

window.onload = function() {
    initMap();
    //getLocations();
}