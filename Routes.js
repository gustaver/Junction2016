var express = require("express");
var router = express.Router();
var notifications = require(__dirname + "/ComparisonData");

notifications.getNotifications().then(result => {

  console.log(result);
  router.get("/today", function(req, res, next){
    res.send(result);
  });
})

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
