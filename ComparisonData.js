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

    //Setting up notifications and appropriate messages.
    var notificationArray = [];
    var badEnergyUsage = {"title":"Bad energy usage!", "body":"You have a high energy consumption at a peak energy price hour."};
    var goodEnergyUsage = {"title":"Good energy usage", "body":"You have a high energy consumption at a low energy price hour"};

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

    for (var i = 0; i < relevant.length; i++) {
        var notification = {"id":i, "hour":parseInt(relevant[i].hour),"type":"","message":{"title":"","body":""}};
        notificationArray.push(notification);
    }
    // Relevant cost/hour array
    var relevantHoursCostArray = [];
    for(var i = 0; i < relevant.length; i++){
      var hourlyCost = relevant[i];
      relevantHoursCostArray.push({
        "hour" : hourlyCost.hour,
        "cost"  : hourlyCost.value
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
    return parseFloat(a.usage) - parseFloat(b.usage);
  });

  //Split relevant to get top 5 cost data points
  var topHourlyCostArray = [];
  for (var i = relevantHoursCostArray.length - 5; i < relevantHoursCostArray.length; i++) {
    topHourlyCostArray.push(relevantHoursCostArray[i]);
  }

  //Split relevant to get top 5 usage data points
  var topHourlyUsageArray = [];
  for (var i = relevantHoursUsageArray.length - 5; i < relevantHoursUsageArray.length; i++) {
    topHourlyUsageArray.push(relevantHoursUsageArray[i]);
  }

  //Split relevant to get bottom cost data points
  var bottomHourlyCostArray = [];
  for (var i = 0; i < relevantHoursCostArray.length - 10 ; i++) {
    bottomHourlyCostArray.push(relevantHoursCostArray[i]);
  }

  //split relevant to get bottom usage data points
  var bottomHourlyUsageArray = [];
  for (var i = 0; i < relevantHoursUsageArray.length - 10 ; i++) {
    bottomHourlyUsageArray.push(relevantHoursUsageArray[i]);
  }

  //Checking for intersections between top 5 hourly costs and top 5 hourly usages
  for (var i = 0; i < topHourlyUsageArray.length; i++) {
    var usageHour = topHourlyUsageArray[i].hour;
    for (var j = 0; j < topHourlyCostArray.length; j++) {
      if (usageHour == topHourlyCostArray[j].hour) {
        //Using energy at times when costs are the highest
        var hour = topHourlyCostArray[j].hour;
          var type = "bad";
          for (var k = 0; k < notificationArray.length; k++) {
              if (notificationArray[k].hour == hour) {
                  notificationArray[k].message = badEnergyUsage;
                  notificationArray[k].type = type;
              }
          }
      }
    }
  }

  //Checking for intersections between bottom hourly costs and top 5 hourly usage
  for (var i = 0; i < topHourlyUsageArray.length; i++) {
    var usageHour = topHourlyUsageArray[i].hour;
    for (var j = 0; j < bottomHourlyCostArray.length; j++) {
      if (usageHour == bottomHourlyCostArray[j].hour) {
        //Using energy at times when costs are lowest
        var hour = bottomHourlyCostArray[j].hour;
          var type = "good";
          for (var k = 0; k < notificationArray.length; k++) {
              if (notificationArray[k].hour == hour) {
                  notificationArray[k].message = goodEnergyUsage;
                  notificationArray[k].type = type;
              }
          }
      }
    }
  }

  //Making suggestion to move energy consumption to new time

  for (var i = notificationArray.length - 1 ; i >= 0; i--) {
      if (notificationArray[i].message.title == "") {
          notificationArray.splice(i, 1);
      }
  }
  console.log(notificationArray);
  });
}
