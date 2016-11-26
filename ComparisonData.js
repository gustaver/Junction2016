var handelingFutureData = require(__dirname  + '/Future/HandelingFutureData');
var futureData = require(__dirname + '/Future/GettingFutureData');
var dailyUsageData = require(__dirname + "/xml-converter/raw-data-converter")

var callingGetFutureData = function(results){

  console.log(results);
  var highestCost = handelingFutureData.getHighestCost(results);
  var timeForHighestCost = handelingFutureData.getTimeByCost(highestCost, results);
  var lowestCost = handelingFutureData.getLowestCost(results);
  var fet = handelingFutureData.getCostByTime(10, results);
}

module.exports = function(){
  var mainData = {
    data: [],
    relevantData: []
  }
  var futureDataArray = [];

  var data = new futureData('SEK', 'SE1').then(result => {

    futureDataArray = result;
    return dailyUsageData.getDailyUsageData()
  }).then(usageData => {
    var usageDataArray = usageData.data[usageData.data.length - 1].hourlyusage[0];
    for (var i = 0; i < futureDataArray.length; i++) {
      futureDataArray[i].usage = ( usageDataArray[i] / 1000 );
      futureDataArray[i].cost = ( futureDataArray[i].value * futureDataArray[i].usage );
      futureDataArray[i].hour = futureDataArray[i].date.format("HH:mm:ss");
    }
    //console.log(futureDataArray);

    mainData.data = futureDataArray;


    var dataArray = mainData.data;
    var lowerEnd = 6;
    var upperEnd = 22;

    // Formating the time.
    for(var i = 0; i < dataArray.length; i++){
      var hour = dataArray[i].hour;
      var hour1 = hour.substring(0,2);
      dataArray[i].hour = hour1;
    }

    var relevant = [];
    for(var i = lowerEnd; i <= upperEnd; i++){
      relevant.push(dataArray[i]);
    }

    mainData.relevantData = relevant;

    // Relevant cost/hour array
    var relevantHoursCostArray = [];
    for(var i = 0; i < relevant.length; i++){
      var hourlyCost = relevant[i];
      relevantHoursCostArray.push({
        "hour" : hourlyCost.hour,
        "cost"  : hourlyCost.cost
      });
    }

    //Relevant usage/hour array
    var relevantHoursUsageArray = [];
    for(var i = 0; i < relevant.length; i++){
      var hourlyUsage = relevant[i];
      relevantHoursUsageArray.push({
        "hour" : hourlyUsage.hour,
        "usage"  : hourlyUsage.usage
      });
    }

    //Quick sort relevant cost/hour array
  relevantHoursCostArray.sort(function(a, b) {
    return parseInt(a.cost) - parseInt(b.cost);
  });

  //Quick sort relevant usage/hour array
  relevantHoursUsageArray.sort(function(a, b) {
    return parseInt(a.usage) - parseInt(b.usage);
  });
    console.log(relevantHoursUsageArray);
  });
}
