var futureData = require(__dirname + '/Future/GettingFutureData');
var dailyUsageData = require(__dirname + "/xml-converter/raw-data-converter")

module.exports.getNotifications = function(lowerEnd, upperEnd) {
  return new Promise((resolve, reject) => {
    var mainData = {
      data: [],
      relevantData: []
    }
    var futureDataArray = [];

    var data = new futureData('SEK', 'SE1').then(result => {

      futureDataArray = result;
      return dailyUsageData.getDailyUsageData()
    }).then(usageData => {
      var usageDataArray = usageData.data[usageData.data.length - 1].hourlyusage[0];
      for (var i = 0; i < futureDataArray.length; i++) {
        futureDataArray[i].usage = ( usageDataArray[i] / 1000 );
        futureDataArray[i].cost = ( futureDataArray[i].value * futureDataArray[i].usage );
        futureDataArray[i].hour = futureDataArray[i].date.format("HH:mm:ss");
      }

      mainData.data = futureDataArray;


      var dataArray = mainData.data;

      //Setting up notifications and appropriate messages.
      var notificationArray = [];

      // Formating the time.
      for(var i = 0; i < dataArray.length; i++){
        var hour = dataArray[i].hour;
        var hour1 = hour.substring(0,2);
        dataArray[i].hour = hour1;
      }

      var relevant = [];
      for(var i = lowerEnd; i <= upperEnd; i++){
        relevant.push(dataArray[i]);
      }

      mainData.relevantData = relevant;

    for (var i = 0; i < relevant.length; i++) {
        var notification = {"id":i, "hour":parseInt(relevant[i].hour),"type":"","message":{"title":"","body":""}, "textmessage": ""};
        notificationArray.push(notification);
      }

      // Relevant cost/hour array
      var relevantHoursCostArray = [];
      for(var i = 0; i < relevant.length; i++){
        var hourlyCost = relevant[i];
        relevantHoursCostArray.push({
          "hour" : hourlyCost.hour,
          "cost"  : hourlyCost.value,
            "usage" : hourlyCost.usage,
        });
      }

      //Relevant usage/hour array
      var relevantHoursUsageArray = [];
      for(var i = 0; i < relevant.length; i++){
        var hourlyUsage = relevant[i];
        relevantHoursUsageArray.push({
          "hour" : hourlyUsage.hour,
          "usage"  : hourlyUsage.usage,
            "value" : hourlyUsage.value,
            "cost" : hourlyUsage.cost,
        });
      }

      //Quick sort relevant cost/hour array
      relevantHoursCostArray.sort(function(a, b) {
        return parseInt(a.cost) - parseInt(b.cost);
      });

      //Quick sort relevant usage/hour array
      relevantHoursUsageArray.sort(function(a, b) {
        return parseFloat(a.usage) - parseFloat(b.usage);
      });

      //Split relevant to get top 5 cost data points
      var topHourlyCostArray = [];
      for (var i = relevantHoursCostArray.length - 10; i < relevantHoursCostArray.length; i++) {
        topHourlyCostArray.push(relevantHoursCostArray[i]);
      }

      //Split relevant to get top 5 usage data points
      var topHourlyUsageArray = [];
      for (var i = relevantHoursUsageArray.length - 5; i < relevantHoursUsageArray.length; i++) {
        topHourlyUsageArray.push(relevantHoursUsageArray[i]);
      }

      //Split relevant to get bottom cost data points
      var bottomHourlyCostArray = [];
      for (var i = 0; i < relevantHoursCostArray.length - 10 ; i++) {
        bottomHourlyCostArray.push(relevantHoursCostArray[i]);
      }

      //split relevant to get bottom usage data points
      var bottomHourlyUsageArray = [];
      for (var i = 0; i < relevantHoursUsageArray.length - 5 ; i++) {
        bottomHourlyUsageArray.push(relevantHoursUsageArray[i]);
      }

      //Checking for intersections between top 5 hourly costs and top 5 hourly usages
      for (var i = 0; i < topHourlyUsageArray.length; i++) {
        var usageHour = topHourlyUsageArray[i].hour;
        for (var j = 0; j < topHourlyCostArray.length; j++) {
          if (usageHour == topHourlyCostArray[j].hour) {
            //Using energy at times when costs are the highest
            var hour = topHourlyCostArray[j].hour;
            var type = "bad";
            for (var k = 0; k < notificationArray.length; k++) {
              if (notificationArray[k].hour == hour) {
                  var badEnergyUsage = {"title":"High electricity usage at a high cost", "body":"At " + hour + ":00 " + "you have a high energy consumption at a peak electricity hour which costs you: " + parseInt(topHourlyCostArray[j].cost) + " kr"};
                  notificationArray[k].message = badEnergyUsage;
                notificationArray[k].type = type;
              }
            }
          }
        }
      }

      //Checking for intersections between bottom hourly costs and top 5 hourly usage
      for (var i = 0; i < topHourlyUsageArray.length; i++) {
        var usageHour = topHourlyUsageArray[i].hour;
        for (var j = 0; j < bottomHourlyCostArray.length; j++) {
          if (usageHour == bottomHourlyCostArray[j].hour) {
            //Using energy at times when costs are lowest
            var hour = bottomHourlyCostArray[j].hour;
            var type = "good";
            for (var k = 0; k < notificationArray.length; k++) {
              if (notificationArray[k].hour == hour) {
                  var goodEnergyUsage = {"title":"High electricity usage at a low cost", "body":"At " + hour + ":00 " + "you have a low energy consumption at a peak electricity cost hour which costs you: " + parseInt(bottomHourlyUsageArray[j].cost) + " kr."};
                  notificationArray[k].message = goodEnergyUsage;
                notificationArray[k].type = type;
              }
            }
          }
        }
      }

  //Making suggestion to move energy consumption to new time
    var cheapest = bottomHourlyCostArray[0];
    var highest = topHourlyUsageArray[topHourlyUsageArray.length-1];
    var difference = highest.cost - (highest.usage * cheapest.cost);
    var hour = cheapest.hour;

    //Making suggestion about moving highest usage to cheapest times
    var bottom3HourlyCostArray = [];
    for (var i = 0; i < bottomHourlyCostArray.length; i++) {
        var tempData = bottomHourlyCostArray[i];
        var isAdded = false;
        for (var j = 0; j < notificationArray.length; j++) {
            if (tempData.hour != notificationArray[j].hour && !isAdded && bottom3HourlyCostArray.length < 3) {
                bottom3HourlyCostArray.push(tempData);
                isAdded = true;
            }
        }
    }
    var arrow = " <b><span class = 'money' >&rarr;</span></b> ";
    var equals = " <b><span class = 'money' >&equals;</span></b> ";
    var highest1 = topHourlyUsageArray[topHourlyUsageArray.length-1];
    var highest2 = topHourlyUsageArray[topHourlyUsageArray.length-2];
    var highest3 = topHourlyUsageArray[topHourlyUsageArray.length-3];
    for (i = 0; i < bottom3HourlyCostArray.length; i++) {
        var current = bottom3HourlyCostArray[i];
        var difference1 = parseInt(highest1.cost - (highest1.usage * current.cost));
        var difference2 = parseInt(highest2.cost - (highest2.usage * current.cost));
        var difference3 = parseInt(highest3.cost - (highest3.usage * current.cost));
        for (var j = 0; j < notificationArray.length; j++) {
            if (current.hour == notificationArray[j].hour) {
                var suggestionMessage = {"title":"Smart suggestion - Low price hour", "body":"<br>Move your power usage to save money:<br>" + highest1.hour + ":00" + arrow + current.hour + ":00" + equals + "<span class = 'money' >" + "+" + difference1 + "</span>" + " kr<br>" + highest2.hour + ":00" + arrow + current.hour + ":00" + equals + "<span class = 'money' >" + "+" + difference2 + "</span>" + " kr<br>" + highest3.hour + ":00" + arrow + current.hour + ":00" + equals + "<span class = 'money' >" + "+" + difference3 + "</span>" + " kr"};
                var type = "suggestion";
                notificationArray[j].message = suggestionMessage;
                notificationArray[j].type = type;
                var textMessage = "Low price hour!" + "\n" + "Move your power usage to save:" + "\n" + highest1.hour + ":00" + " -> " + current.hour + " = " + "+" + difference1 + " kr" + "\n" + highest2.hour + ":00" + " -> " + current.hour + " = " + "+" + difference2 + " kr" + "\n" + highest3.hour + ":00" + " -> " + current.hour + " = " + "+" + difference3 + " kr";
                notificationArray[j].textmessage = textMessage;
            }
        }
    }

    for (var i = notificationArray.length - 1 ; i >= 0; i--) {
      if (notificationArray[i].message.title == "") {
          notificationArray.splice(i, 1);
        }
      }

      var notificationObj = {
        notificationArray: notificationArray,
        energyUsageData: usageDataArray
      }

      resolve(notificationObj);
    });
  });
}
