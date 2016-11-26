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
    data: []
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
    console.log(futureDataArray);

    mainData.data = futureDataArray;

    console.log(mainData)
  });
}
