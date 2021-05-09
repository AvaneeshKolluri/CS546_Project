//Everything hudson chart related
let hudsonChartObject = {
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
        color: "#7B163E",
        dataPoints: [
            {x: new Date(2021, 1, 1), y: 223},
            {x: new Date(2021, 1, 2), y: 170},
            {x: new Date(2021, 1, 3), y: 203},
            {x: new Date(2021, 1, 4), y: 269},
            {x: new Date(2021, 1, 5), y: 313},
            {x: new Date(2021, 1, 6), y: 359},
            {x: new Date(2021, 1, 7), y: 365},
            {x: new Date(2021, 1, 8), y: 164},
            {x: new Date(2021, 1, 9), y: 279},
            {x: new Date(2021, 1, 10), y: 369},
            {x: new Date(2021, 1, 11), y: 335},
            {x: new Date(2021, 1, 12), y: 307},
            {x: new Date(2021, 1, 13), y: 311},
            {x: new Date(2021, 1, 14), y: 217},
            {x: new Date(2021, 1, 15), y: 114},
            {x: new Date(2021, 1, 16), y: 253},
            {x: new Date(2021, 1, 17), y: 421},
            {x: new Date(2021, 1, 18), y: 354},
            {x: new Date(2021, 1, 19), y: 299},
            {x: new Date(2021, 1, 20), y: 181},
            {x: new Date(2021, 1, 21), y: 164},
            {x: new Date(2021, 1, 22), y: 288},
            {x: new Date(2021, 1, 23), y: 295},
            {x: new Date(2021, 1, 24), y: 313},
            {x: new Date(2021, 1, 25), y: 366},
            {x: new Date(2021, 1, 26), y: 349},
            {x: new Date(2021, 1, 27), y: 406},
            {x: new Date(2021, 1, 28), y: 199},
            {x: new Date(2021, 2, 1), y: 323},
            {x: new Date(2021, 2, 2), y: 340},
            {x: new Date(2021, 2, 3), y: 262},
            {x: new Date(2021, 2, 4), y: 263},
            {x: new Date(2021, 2, 5), y: 326},
            {x: new Date(2021, 2, 6), y: 383},
            {x: new Date(2021, 2, 7), y: 232},
            {x: new Date(2021, 2, 8), y: 229},
            {x: new Date(2021, 2, 9), y: 334},
            {x: new Date(2021, 2, 10), y: 331},
            {x: new Date(2021, 2, 11), y: 344},
            {x: new Date(2021, 2, 12), y: 365},
            {x: new Date(2021, 2, 13), y: 283},
            {x: new Date(2021, 2, 14), y: 303},
            {x: new Date(2021, 2, 15), y: 221},
            {x: new Date(2021, 2, 16), y: 248},
            {x: new Date(2021, 2, 17), y: 373},
            {x: new Date(2021, 2, 18), y: 472},
            {x: new Date(2021, 2, 19), y: 309},
            {x: new Date(2021, 2, 20), y: 539},
            {x: new Date(2021, 2, 21), y: 260},
            {x: new Date(2021, 2, 22), y: 279},
            {x: new Date(2021, 2, 23), y: 473},
            {x: new Date(2021, 2, 24), y: 304},
            {x: new Date(2021, 2, 25), y: 317},
            {x: new Date(2021, 2, 26), y: 508},
            {x: new Date(2021, 2, 27), y: 533},
            {x: new Date(2021, 2, 28), y: 327},
            {x: new Date(2021, 2, 29), y: 296},
            {x: new Date(2021, 2, 30), y: 377},
            {x: new Date(2021, 2, 31), y: 251},
            {x: new Date(2021, 3, 1), y: 522},
            {x: new Date(2021, 3, 2), y: 410},
            {x: new Date(2021, 3, 3), y: 382},
            {x: new Date(2021, 3, 4), y: 327},
            {x: new Date(2021, 3, 5), y: 197},
            {x: new Date(2021, 3, 6), y: 299},
            {x: new Date(2021, 3, 7), y: 372},
            {x: new Date(2021, 3, 8), y: 403},
            {x: new Date(2021, 3, 9), y: 346},
            {x: new Date(2021, 3, 10), y: 271},
            {x: new Date(2021, 3, 11), y: 281},
            {x: new Date(2021, 3, 12), y: 201},
            {x: new Date(2021, 3, 13), y: 317},
            {x: new Date(2021, 3, 14), y: 287},
            {x: new Date(2021, 3, 15), y: 293},
            {x: new Date(2021, 3, 16), y: 427},
            {x: new Date(2021, 3, 17), y: 359},
            {x: new Date(2021, 3, 18), y: 300},
            {x: new Date(2021, 3, 19), y: 172},
            {x: new Date(2021, 3, 20), y: 216},
            {x: new Date(2021, 3, 21), y: 273},
            {x: new Date(2021, 3, 22), y: 286},
            {x: new Date(2021, 3, 23), y: 270},
            {x: new Date(2021, 3, 24), y: 244},
            {x: new Date(2021, 3, 25), y: 188},
            {x: new Date(2021, 3, 26), y: 30},
            {x: new Date(2021, 3, 27), y: 182},
            {x: new Date(2021, 3, 28), y: 174},
            {x: new Date(2021, 3, 29), y: 199},
            {x: new Date(2021, 3, 30), y: 193},
            {x: new Date(2021, 4, 1), y: 130},
            {x: new Date(2021, 4, 2), y: 118},
            {x: new Date(2021, 4, 3), y: 80},
            {x: new Date(2021, 4, 4), y: 41},
            {x: new Date(2021, 4, 5), y: 140},
            {x: new Date(2021, 4, 6), y: 102},
            {x: new Date(2021, 4, 7), y: 129},
            {x: new Date(2021, 4, 8), y: 67}
        ]
    }]
}

//End of everything hudson chart related

//Beginning of user data chart
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
    var chart2 = new CanvasJS.Chart("hudsonChartContainer", hudsonChartObject);
    chart.render();
    chart2.render();
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