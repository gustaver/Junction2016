var express = require("express");
var router = express.Router();
var notifications = require(__dirname + "/ComparisonData");


router.get("/today", function(req, res, next){
  var start = parseInt(req.query.from) || 6
  var end = parseInt(req.query.to) || 22

  if(start <=	0 || start > 23 || end < 0 || end > 24 || end - start < 0){
    start = 6;
    end = 22;
}
notifications.getNotifications(parseInt(start), parseInt(end)).then(result => {
res.send(result);
});
});




module.exports = router;
