var express = require('express');
var app = express();
var path = require("path");

var comp = require(__dirname + "/ComparisonData")
var routes = require("./Routes");

app.set('port', (process.env.PORT || 5000));

app.use('/public', express.static(path.join(__dirname, 'public/')));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/api',routes);

app.get('/', function(request, response) {
  response.render('index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
