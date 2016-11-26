var express = require('express');
var app = express();
var path = require("path");
var textMess = require("./TextMessage")
var routes = require(__dirname + "/Routes");

app.set('port', (process.env.PORT || 5000));

app.use('/public', express.static(path.join(__dirname, 'public/')));
app.use('/bulma', express.static(path.join(__dirname, 'node_modules/bulma/css/')));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/api',routes);

app.get('/', function(request, response) {
  response.render('index');
});

app.get('/starter', function(request, response) {
  response.render('start');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
