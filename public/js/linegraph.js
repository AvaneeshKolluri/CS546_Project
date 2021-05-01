//Global chart object that will have all the data
let chartObject = {
    animationEnabled: true,
	axisX:{
		valueFormatString: "DD MMM"
	},
	axisY: {
		title: "Number of Cases",
		scaleBreaks: {
			autoCalculate: true
		}
	},
	data: [{
		type: "line",
		xValueFormatString: "DD MMM",
		color: "#F08080",
		dataPoints: [
			
		]
	}]
}

let datapointsArray = [];

function getData(){
    //Retreive the list of locations
    let ul = document.getElementById('cases-list');
    let items = ul.getElementsByTagName("li");

    //Iterate through each location item in list
    for (let i = 0; i < items.length; ++i){
        //Split the address string to get the coordinate part
        let splitArray = items[i].innerText.split(':');
        let tempStatus = splitArray[0];
        let tempDate = splitArray[1];

        if (tempStatus == "true"){
            tempDate = Date.parse(tempDate);
            datapointsArray.push(tempDate);
        }
    }

    //Sort the timestamps in ascending order
    //Need to sort b/c of the line graph format
    datapointsArray.sort(function(a, b){return a - b});

    //Format all dates back into date format
    function dateFormatter(item, index) {
        let temp = item;
        datapointsArray[index] = new Date(temp);
    }
    datapointsArray.forEach(dateFormatter);

    let casesCount = 1;
    //Add the new linepoint to the collection of datapoints
    for (let i = 0; i < datapointsArray.length; ++i){
        //This is when the last date in the array was reached
        if (datapointsArray[i + 1] == undefined){
            let linePoint = {x: datapointsArray[i], y: casesCount};
            chartObject.data[0].dataPoints.push(linePoint);
            break;
        }
        //Check if the next date is the same, to add to the current number of cases
        //Else just push the day into the datapoints set
        if (datapointsArray[i].getTime() == datapointsArray[i + 1].getTime()){
            //Another case of the same day was found
            casesCount++;
        } else {
            let linePoint = {x: datapointsArray[i], y: casesCount};
            chartObject.data[0].dataPoints.push(linePoint);
            casesCount = 1;
        }
    }
}

function initGraph(){
    var chart = new CanvasJS.Chart("chartContainer", chartObject);
    chart.render();
}
 

window.addEventListener('load', function() {
    getData();
    initGraph();
})
  



    // //Retreive the list of locations
    // let ul = document.getElementById('cases-list');
    // let items = ul.getElementsByTagName("li");

    // //Iterate through each location item in list, then push the timestamp into array
    // for (let i = 0; i < items.length; ++i){
    //     tempDate = Date.parse(items[i].innerText);
    //     datapointsArray.push(tempDate);
    // }

    // //Sort the timestamps in ascending order
    // //Need to sort b/c of the line graph format
    // datapointsArray.sort(function(a, b){return a - b});


    // function dateFormatter(item, index) {
    //     let temp = item;
    //     datapointsArray[index] = new Date(temp);
    // }
    // datapointsArray.forEach(dateFormatter);

    // console.log(datapointsArray);
    
    // //To convert all items into a date object
    // let currentMonth = "Apr";
    // let currentDay = "25";
    // let dayCases = 1;

    // for (let i = 0; i < datapointsArray.length; ++i){
    //     let splitArray = items[i].innerText.split(' ');
    //     //console.log(splitArray);
    //     console.log("After interation: " + i + " daycases: " + dayCases);
    //     if (currentMonth == splitArray[1] && currentDay == splitArray[2]){
    //         dayCases++;
    //         console.log(currentMonth + currentDay);
    //         console.log(dayCases);
    //         continue;
    //     } else {
    //         //Reinitialize the new current day and month/moved onto the next day
    //         currentMonth = splitArray[1];
    //         currentDay = splitArray[2];

    //         let monthValue;
    //         //Month is given as a string at this point, need to convert it to the month value, Jan = 0, Dec = 11
    //         switch (splitArray[1]){
    //             case "Jan":
    //                 monthValue = 0;
    //                 break;
    //             case "Feb":
    //                 monthValue = 1;
    //                 break;
    //             case "Mar":
    //                 monthValue = 2;
    //                 break;
    //             case "Apr":
    //                 monthValue = 3;
    //                 break;
    //             case "May":
    //                 monthValue = 4;
    //                 break;
    //             case "Jun":
    //                 monthValue = 5;
    //                 break;
    //             case "Jul":
    //                 monthValue = 6;
    //                 break;
    //             case "Aug":
    //                 monthValue = 7;
    //                 break;
    //             case "Sep":
    //                 monthValue = 8;
    //                 break;
    //             case "Oct":
    //                 monthValue = 9;
    //                 break;
    //             case "Nov":
    //                 monthValue = 10;
    //                 break;
    //             case "Dec":
    //                 monthValue = 11;
    //                 break;
    //         }
    //         let linePoint = {x: new Date(splitArray[3], monthValue, splitArray[2]), y: dayCases}
    //         //console.log(dayCases + "Thisis the number");
    //         dayCases = 1;
    //         //console.log(chartObject.data[0].dataPoints);
    //         //console.log(linePoint);

    //         //Add the new linepoint to the collection of datapoints
    //         //chartObject.data[0].dataPoints.push(linePoint);
    //     }
    //         // console.log(splitArray[0]);
    //         // console.log(splitArray[1]);
    //         // console.log(splitArray[2]);
    //     //console.log(formattedDate);
    //     //let tempDateObj = {x: }
    // }

    // // let formattedDate = new Date(tempDate);
    // // console.log(formattedDate);