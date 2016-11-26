/**
 * Created by gustaverousselet on 2016-11-26.
 */

//Creating the test objects for hourlyCost

var hourlyCost0 = {hour: 0, cost: 10};
var hourlyCost1 = {hour: 1, cost: 8};
var hourlyCost2 = {hour: 2, cost: 12};
var hourlyCost3 = {hour: 3, cost: 13};
var hourlyCost4 = {hour: 4, cost: 12};
var hourlyCost5 = {hour: 5, cost: 11};
var hourlyCost6 = {hour: 6, cost: 19};
var hourlyCost7 = {hour: 7, cost: 20};
var hourlyCost8 = {hour: 8, cost: 15};
var hourlyCost9 = {hour: 9, cost: 19};
var hourlyCost10 = {hour: 10, cost: 13};
var hourlyCost11 = {hour: 11, cost: 22};
var hourlyCost12 = {hour: 12, cost: 14};
var hourlyCost13 = {hour: 13, cost: 29};
var hourlyCost14 = {hour: 14, cost: 40};
var hourlyCost15 = {hour: 15, cost: 50};
var hourlyCost16 = {hour: 16, cost: 29};
var hourlyCost17 = {hour: 17, cost: 43};
var hourlyCost18 = {hour: 18, cost: 9};
var hourlyCost19 = {hour: 19, cost: 28};
var hourlyCost20 = {hour: 20, cost: 7};
var hourlyCost21 = {hour: 21, cost: 24};
var hourlyCost22 = {hour: 22, cost: 48};
var hourlyCost23 = {hour: 23, cost: 48};

//Creating the test objects for hourlyUsage

var hourlyUsage0 = {hour: 0, usage: 10};
var hourlyUsage1  = {hour: 1, usage: 8};
var hourlyUsage2  = {hour: 2, usage: 12};
var hourlyUsage3  = {hour: 3, usage: 13};
var hourlyUsage4  = {hour: 4, usage: 12};
var hourlyUsage5  = {hour: 5, usage: 11};
var hourlyUsage6  = {hour: 6, usage: 19};
var hourlyUsage7  = {hour: 7, usage: 20};
var hourlyUsage8  = {hour: 8, usage: 15};
var hourlyUsage9  = {hour: 9, usage: 19};
var hourlyUsage10  = {hour: 10, usage: 13};
var hourlyUsage11  = {hour: 11, usage: 22};
var hourlyUsage12  = {hour: 12, usage: 38};
var hourlyUsage13  = {hour: 13, usage: 29};
var hourlyUsage14  = {hour: 14, usage: 40};
var hourlyUsage15  = {hour: 15, usage: 50};
var hourlyUsage16  = {hour: 16, usage: 29};
var hourlyUsage17  = {hour: 17, usage: 43};
var hourlyUsage18  = {hour: 18, usage: 49};
var hourlyUsage19  = {hour: 19, usage: 28};
var hourlyUsage20  = {hour: 20, usage: 39};
var hourlyUsage21  = {hour: 21, usage: 37};
var hourlyUsage22  = {hour: 22, usage: 24};
var hourlyUsage23  = {hour: 23, usage: 48};

//Adding the test objects into usage array

var hourlyUsageArray =  [];
hourlyUsageArray.push(hourlyUsage0);
hourlyUsageArray.push(hourlyUsage1);
hourlyUsageArray.push(hourlyUsage2);
hourlyUsageArray.push(hourlyUsage3);
hourlyUsageArray.push(hourlyUsage4);
hourlyUsageArray.push(hourlyUsage5);
hourlyUsageArray.push(hourlyUsage6);
hourlyUsageArray.push(hourlyUsage7);
hourlyUsageArray.push(hourlyUsage8);
hourlyUsageArray.push(hourlyUsage9);
hourlyUsageArray.push(hourlyUsage10);
hourlyUsageArray.push(hourlyUsage11);
hourlyUsageArray.push(hourlyUsage12);
hourlyUsageArray.push(hourlyUsage13);
hourlyUsageArray.push(hourlyUsage14);
hourlyUsageArray.push(hourlyUsage15);
hourlyUsageArray.push(hourlyUsage16);
hourlyUsageArray.push(hourlyUsage17);
hourlyUsageArray.push(hourlyUsage18);
hourlyUsageArray.push(hourlyUsage19);
hourlyUsageArray.push(hourlyUsage20);
hourlyUsageArray.push(hourlyUsage21);
hourlyUsageArray.push(hourlyUsage22);
hourlyUsageArray.push(hourlyUsage23);

//Adding the test objects into the cost array

var hourlyCostArray = [];
hourlyCostArray.push(hourlyCost0);
hourlyCostArray.push(hourlyCost1);
hourlyCostArray.push(hourlyCost2);
hourlyCostArray.push(hourlyCost3);
hourlyCostArray.push(hourlyCost4);
hourlyCostArray.push(hourlyCost5);
hourlyCostArray.push(hourlyCost6);
hourlyCostArray.push(hourlyCost7);
hourlyCostArray.push(hourlyCost8);
hourlyCostArray.push(hourlyCost9);
hourlyCostArray.push(hourlyCost10);
hourlyCostArray.push(hourlyCost11);
hourlyCostArray.push(hourlyCost12);
hourlyCostArray.push(hourlyCost13);
hourlyCostArray.push(hourlyCost14);
hourlyCostArray.push(hourlyCost15);
hourlyCostArray.push(hourlyCost16);
hourlyCostArray.push(hourlyCost17);
hourlyCostArray.push(hourlyCost18);
hourlyCostArray.push(hourlyCost19);
hourlyCostArray.push(hourlyCost20);
hourlyCostArray.push(hourlyCost21);
hourlyCostArray.push(hourlyCost22);
hourlyCostArray.push(hourlyCost23);

//Adding relevant hours specified by user
var lowerEnd = 6;
var upperEnd = 22;

//Split arrays into relevant hours
var relevantHoursCostArray = [];
for (var i = lowerEnd; i <= upperEnd; i++) {
    relevantHoursCostArray.push(hourlyCostArray[i]);
}
//console.log(relevantHoursCostArray);

var relevantHoursUsageArray = [];
for (var i = lowerEnd; i <= upperEnd; i++) {
    relevantHoursUsageArray.push(hourlyUsageArray[i]);
}
//console.log(relevantHoursUsageArray);

//Quick sorting the array in ascending order
relevantHoursCostArray.sort(function(a, b) {
    return parseInt(a.cost) - parseInt(b.cost);
});

relevantHoursUsageArray.sort(function(a, b) {
    return parseInt(a.usage) - parseInt(b.usage);
});

//console.log(relevantHoursCostArray);
//console.log((relevantHoursUsageArray));

//Get the top 5 hours from the total 24 hourlyUsageArray and hourlyCostArray
var top5HourlyCostArray = [];
for (var i = relevantHoursCostArray.length - 5; i <
relevantHoursCostArray.length; i++) {
    top5HourlyCostArray.push(relevantHoursCostArray[i]);
}
//console.log(top5HourlyCostArray);

var top5HourlyUsageArray = [];
for (var i = relevantHoursUsageArray.length - 5; i <
relevantHoursUsageArray.length; i++) {
    top5HourlyUsageArray.push(relevantHoursUsageArray[i]);
}
//console.log(top5HourlyUsageArray);

//Get the bottom 5 hours from the total 24 hourlyUsageArray and hourlyCostArray
var bottomHourlyCostArray = [];
for (var i = 0; i < relevantHoursCostArray.length - 5 ; i++) {
    bottomHourlyCostArray.push(relevantHoursCostArray[i]);
}
//console.log(bottomHourlyCostArray);

//Checking for intersections between top 5 hourly costs and top 5 hourly usages
for (var i = 0; i < top5HourlyUsageArray.length; i++) {
    var usageHour = top5HourlyUsageArray[i].hour;
    for (var j = 0; j < top5HourlyCostArray.length; j++) {
        if (usageHour == top5HourlyCostArray[j].hour) {
            //console.log(top5HourlyCostArray[j].hour);
        }
    }
}

//Checking for intersections between bottom hourly costs and top 5 hourly usage
for (var i = 0; i < top5HourlyUsageArray.length; i++) {
    var usageHour = top5HourlyUsageArray[i].hour;
    for (var j = 0; j < bottomHourlyCostArray.length; j++) {
        if (usageHour == bottomHourlyCostArray[j].hour) {
            //console.log(bottomHourlyCostArray[j].hour);
        }
    }
}