//Global chart object that will have all the data
let chartObject = {
    animationEnabled: true,  
        title:{
            text: "Recent Cases"
        },
        axisY: {
            title: "Number of Cases",
            valueFormatString: "#0,,.",
            suffix: "",
            stripLines: [{
                value: 3366500,
                label: "Average"
            }]
        },
        data: [{
            yValueFormatString: "#,### Units",
            xValueFormatString: "YYYY",
            type: "spline",
            dataPoints: [
                {x: new Date(2002, 0), y: 2506000},
                {x: new Date(2003, 0), y: 2798000},
                {x: new Date(2004, 0), y: 3386000},
                {x: new Date(2005, 0), y: 6944000},
                {x: new Date(2006, 0), y: 6026000},
                {x: new Date(2007, 0), y: 2394000},
                {x: new Date(2008, 0), y: 1872000},
                {x: new Date(2009, 0), y: 2140000},
                {x: new Date(2010, 0), y: 7289000},
                {x: new Date(2011, 0), y: 4830000},
                {x: new Date(2012, 0), y: 2009000},
                {x: new Date(2013, 0), y: 2840000},
                {x: new Date(2014, 0), y: 2396000},
                {x: new Date(2015, 0), y: 1613000},
                {x: new Date(2016, 0), y: 2821000},
                {x: new Date(2017, 0), y: 2000000}
            ]
        }]
    }

let datapointsArray = [];

function getData(){
    //Retreive the list of locations
    let ul = document.getElementById('cases-list');
    let items = ul.getElementsByTagName("li");

    //Iterate through each location item in list, then push the timestamp into array
    for (let i = 0; i < items.length; ++i){
        tempDate = Date.parse(items[i].innerText);
        datapointsArray.push(tempDate);
    }

    //Sort the timestamps in ascending order
    //Need to sort b/c of the line graph format
    datapointsArray.sort(function(a, b){return a - b});


    function dateFormatter(item, index) {
        let temp = item;
        datapointsArray[index] = new Date(temp);
    }
    datapointsArray.forEach(dateFormatter);

    console.log(datapointsArray);
    
    //To convert all items into a date object
    let currentMonth = "Apr";
    let currentDay = "25";
    let dayCases = 1;

    for (let i = 0; i < datapointsArray.length; ++i){
        let splitArray = items[i].innerText.split(' ');
        //console.log(splitArray);
        console.log("After interation: " + i + " daycases: " + dayCases);
        if (currentMonth == splitArray[1] && currentDay == splitArray[2]){
            dayCases++;
            console.log(currentMonth + currentDay);
            console.log(dayCases);
            continue;
        } else {
            //Reinitialize the new current day and month/moved onto the next day
            currentMonth = splitArray[1];
            currentDay = splitArray[2];

            let monthValue;
            //Month is given as a string at this point, need to convert it to the month value, Jan = 0, Dec = 11
            switch (splitArray[1]){
                case "Jan":
                    monthValue = 0;
                    break;
                case "Feb":
                    monthValue = 1;
                    break;
                case "Mar":
                    monthValue = 2;
                    break;
                case "Apr":
                    monthValue = 3;
                    break;
                case "May":
                    monthValue = 4;
                    break;
                case "Jun":
                    monthValue = 5;
                    break;
                case "Jul":
                    monthValue = 6;
                    break;
                case "Aug":
                    monthValue = 7;
                    break;
                case "Sep":
                    monthValue = 8;
                    break;
                case "Oct":
                    monthValue = 9;
                    break;
                case "Nov":
                    monthValue = 10;
                    break;
                case "Dec":
                    monthValue = 11;
                    break;
            }
            let linePoint = {x: new Date(splitArray[3], monthValue, splitArray[2]), y: dayCases}
            //console.log(dayCases + "Thisis the number");
            dayCases = 1;
            //console.log(chartObject.data[0].dataPoints);
            //console.log(linePoint);

            //Add the new linepoint to the collection of datapoints
            //chartObject.data[0].dataPoints.push(linePoint);
        }
            // console.log(splitArray[0]);
            // console.log(splitArray[1]);
            // console.log(splitArray[2]);
        //console.log(formattedDate);
        //let tempDateObj = {x: }
    }

    // let formattedDate = new Date(tempDate);
    // console.log(formattedDate);
}

function initGraph(){
    var chart = new CanvasJS.Chart("chartContainer", chartObject);
    chart.render();
}
 

window.addEventListener('load', function() {
    getData();
    initGraph();
})
  