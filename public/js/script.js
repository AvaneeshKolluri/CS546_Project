//Global variable that will contain all the heatmap data
var heatMapData = [];

//Function to initialize the heatmap with given data in heatMapData array
function initMap() {
  //Hoboken is the default center of heatmap
  var hoboken = new google.maps.LatLng(40.745255,-74.034775);
  
  //Create a new Google Maps
  map = new google.maps.Map(document.getElementById('map'), {
    center: hoboken,
    zoom: 13,
    mapTypeId: 'roadmap'
  });
  
  //Add a heatmap layer to the Google Map
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData
  });
  heatmap.setMap(map);
}

//Function to get all locations that were added to the locations list
function getLocations(){
  //Retreive the list of locations
  let ul = document.getElementById('locations-list');
  let items = ul.getElementsByTagName("li");

  //Iterate through each location item in list
  for (let i = 0; i < items.length; ++i){
    //Split the address string to get the coordinate part
    let splitArray = items[i].innerText.split('[');
    let tempCoords = splitArray[1];

    //Split the coordinate to get latitude and longitude
    let splitCoords = tempCoords.split(',');

    let tempLatitude = parseFloat(splitCoords[1].replace(']', ''));
    let tempLongitude = parseFloat(splitCoords[0]);

    let tempLocationObj = {location: new google.maps.LatLng(tempLatitude, tempLongitude), weight: 3};
    heatMapData.push(tempLocationObj);
  }
}

//Toggle to show/hide list of hotspots
function toggleLocationsList() {
  var x = document.getElementById("heatmap-locations");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

window.addEventListener('load', function() {
  getLocations();
  initMap();
})
