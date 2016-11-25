
module.exports.getHighestCost = function(data){
  var highest = 0;
  for (var i=0; i<data.length; i++) {
    if(data[i].value > highest){
      highest = data[i].value;
    }
  }
  return highest;
}

module.exports.getLowestCost = function(data){
  var lowest = data[0].value;
  for (var i=0; i<data.length; i++) {
    if(data[i].value < lowest){
      lowest = data[i].value;
    }
  }
  return lowest;
}
// senaste dagen: Högsta energiförbrukning, lägsta

module.exports.getTimeByCost = function(cost,data){
  for(var i =0; i<data.length; i++){
    if(data[i].value == cost){
      return i;
    }
  }
}

module.exports.getCostByTime = function(time,data){
  return data[time].value;
}



// highest, lowest, input-output
