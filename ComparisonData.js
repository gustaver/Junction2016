var handelingFutureData = require('./Future/HandelingFutureData');
var futureData = require('./Future/GettingFuturedata');


var callingGetFutureData = function(results){


  console.log(results);
  //var highestCost = handelingFutureData.getHighestCost(results);
  //var timeForHighestCost = handelingFutureData.getTimeByCost(highestCost, results);
  //var lowestCost = handelingFutureData.getLowestCost(results);
  //var fet = handelingFutureData.getCostByTime(10, results);
  //console.log(fet);
  //console.log(lowestCost);
  //console.log(timeForHighestCost);
  //console.log(highestCost);
}


module.exports = function(){
  var data = new futureData('SEK', 'SE1', callingGetFutureData);

}
