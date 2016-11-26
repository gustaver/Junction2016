var testData = require(__dirname + "/raw-data-converter.js");

testData.getDailyUsageData().then(result => {
  console.log(result);
})
