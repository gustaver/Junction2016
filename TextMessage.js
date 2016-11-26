var https = require('https');
var querystring = require('querystring');
var request = require("request")
var striptags = require('striptags');

var username = 'u8e25c6e643e940809b9fb8bf372f3705';
var password = '2D8A776731039C101CEE17D64B625DC7';

var postFields = {
  from:    "Komdo",
  to:      "+46700000000",
  message: "This is some cool data"
}

var goText = function(message){
  postFields.message = message;
  var key = new Buffer(username + ':' + password).toString('base64');
  var postData = querystring.stringify(postFields);

  var options = {
    hostname: 'api.46elks.com',
    path:     '/a1/SMS',
    method:   'POST',
    headers:  {
      'Authorization': 'Basic ' + key
      }
    };


  var callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      console.log(str);
    });
  }

  // Start the web request.
  var request = https.request(options, callback);

  // Send the real data away to the server.
  request.write(postData);

  // Finish sending the request.
  request.end();
}

var schedule = require('node-schedule')
//var j = schedule.scheduleJob({hour: 21, minute: 42}, function(){

var url = "https://calm-peak-94128.herokuapp.com/api/today";
request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        var relevants = []
        var data = response.toJSON()
        var notificationArray = data.body.notificationArray;

        for (var notification of notificationArray) {
          if (notification.type === "suggestion") {
            relevants.push(notification);
          }
        }

      //var message = "Hi! Here's some smart suggestions for tomorrow: \n" + relevants[0].textMessage + "\n  \n" + relevants[1].textMessage;
      console.log(relevants);

    }
})

//});
