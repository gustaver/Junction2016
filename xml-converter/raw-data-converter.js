var fs = require("fs");
var parseString = require('xml2js').parseString;


var getDailyUsageData = function() {
  return new Promise((resolve, reject) => {
    var xml = fs.readFileSync(__dirname + "/xml-originals/TestGBDataThirteenMonthsBinnedDaily.xml");

    var dailyUsageData = {
      data: []
    }

    parseString(xml, (err, result) => {

      result.feed.entry.splice(0,4);
      result.feed.entry.splice(result.feed.entry.length - 1, 1)

      for (var day of result.feed.entry) {
        var dailyusageobj = {
          date: "",
          hourlyusage: []
        };
        dailyusageobj.date = day.published[0].slice(0,10);
        var hourlyusagearray = [];

        for (var hourlyusage of day.content[0].IntervalBlock[0].IntervalReading) {
          hourlyusagearray.push(hourlyusage.value[0]);
        }
        dailyusageobj.hourlyusage.push(hourlyusagearray);
        dailyUsageData.data.push(dailyusageobj);
      }

      resolve(dailyUsageData);
    });
  });
}

module.exports.getDailyUsageData = getDailyUsageData;
