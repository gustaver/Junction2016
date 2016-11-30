var express = require('express');
var app = express();
var path = require("path");
var textMess = require(__dirname + "/TextMessage");
var routes = require(__dirname + "/Routes");
var pageRouter = require(__dirname + "/PageRouter")

// to be able to login :)
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var session = require("express-session");
var flash = require("connect-flash")
var cookieparser = require("cookie-parser")
var passport = require("passport");
var setUpPassport = require(__dirname + "/login/setupppassport");

// database stuff
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://oskar:oskar@ds115798.mlab.com:15798/komdo");

// setup passport session
setUpPassport();

// more login stuff
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieparser());
app.use(session({
  secret:"TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
  resave: true,
  saveUninitialized: true
}));
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


app.set('port', (process.env.PORT || 5000));

app.use('/public', express.static(path.join(__dirname, 'public/')));
app.use('/bulma', express.static(path.join(__dirname, 'node_modules/bulma/css/')));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/api',routes);
app.use(pageRouter);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
