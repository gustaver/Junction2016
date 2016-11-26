var express = require("express");
var router = express.Router();
var notifications = require(__dirname + "/ComparisonData");


router.get("/today", function(req, res, next){
  var start = parseInt(req.param('start')) || 6
  var end = parseInt(req.param('end')) || 22
  if(start => 0 && start < 23 && end > 0 && end < 24 && end - start > 0){
    notifications.getNotifications(parseInt(start), parseInt(end)).then(result => {
    res.send(result);
  });
} else{
  notifications.getNotifications(6, 22).then(result => {
  res.send(result);
});
}

});

/*
var jspTest = [
  {
    "id": 1,
    "hour": 14,
    "type-of-notification": "high-price",
    "message": {
      "title": "Hi!",
      "body": "KOMDO KOMDO KOMDO KOMDO KOMDO KOMDO KOMDO KOMDO"
    }
  },
  {
    "id": 2,
    "hour": 18,
    "type-of-notification": "low-price",
    "message": {
      "title": "Hi!",
      "body": "You can use energy now!"
    }
  },
   {
    "id": 3,
    "hour": 20,
    "type-of-notification": "low-price",
    "message": {
      "title": "Hi!",
      "body": "You can use energy now!"
    }
  }
];*/


module.exports = router;
