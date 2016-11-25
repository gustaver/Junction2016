var fs = require("fs");
var parseString = require('xml2js').parseString;

var dailyusageobj = {
  date: "",
  hourlyusage: []
};

var xml = fs.readFileSync(__dirname + "/xml-originals/TestGBDataThirteenMonthsBinnedDaily.xml");
parseString(xml, function (err, result) {
  for (var day of result.feed.entry) {
    console.log(day);
  }
  //fs.writeFileSync(__dirname + "/data.json", JSON.stringify(result, null, 4));
});
