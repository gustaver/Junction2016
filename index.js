var express = require('express');
var app = express();
var path = require("path");
var handelingFutureData = require('./Future/HandelingFutureData');
var futureData = require('./Future/GettingFuturedata');

app.set('port', (process.env.PORT || 5000));

app.use('/public', express.static(path.join(__dirname, 'public/')));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index');
});

var callingGetFutureData = function(results){
  var highestCost = handelingFutureData.getHighestCost(results);
  var timeForHighestCost = handelingFutureData.getTimeByCost(highestCost, results);
  var lowestCost = handelingFutureData.getLowestCost(results);
  var fet = handelingFutureData.getCostByTime(10, results);
  console.log(fet);
  //console.log(lowestCost);
  //console.log(timeForHighestCost);
  //console.log(highestCost);
}



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  var data = new futureData('SEK', 'SE1', callingGetFutureData);

});
