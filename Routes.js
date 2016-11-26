var express = require("express");
var router = express.Router();
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
    },
     {
    "id": 3,
    "hour": 22,
    "type-of-notification": "low-price",
    "message": {
      "title": "Hi!",
      "body": "You can use 22 now!"
    }
  }
];



router.get("/today", function(req, res, next){
    res.send(jspTest);
});




module.exports = router;
