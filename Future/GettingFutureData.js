var nordpool = require('nordpool');
var prices = new nordpool.Prices();

var opts = {}
//opts.currency = 'SEK'
//opts.area = 'SE1' // DK2, EE1, FI, 'Kr.sand', LT, LV, 'Oslo', SE1, SE4, ...
//opts.from = '2016-11-26'

// curr = SEK area = S1 and callback is a function that gets the data. (results)
module.exports = function(curr, area){
  return new Promise((resolve, reject) => {
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    var date = year + "-" + month + "-" + day;

    opts.currency = curr;
    opts.area = area;
    opts.from = date;

    prices.hourly(opts, function (error, results) {
      if (error) console.err(error);

      resolve(results);
    })
  })
}
