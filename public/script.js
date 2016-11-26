$(function(){

// VARIABLES
var infobox_inner = $(".infobox-inner");
var infobox = $(".infobox");
var URL = "https://calm-peak-94128.herokuapp.com/api/today";

function makeNotification(id, hour, info) {
  id_code = "circle" + id;

  var circle_html =
    "<div class='not-circle' id='" +
    id_code +
    "'></div>";

  infobox_inner.append(circle_html);

  center = 178;
  turn_val = (2 * Math.PI) / 25;
  turn_val = turn_val * hour;

  // STANDARD position
  // mitt i centrum är left: 175 och top: 175

  top_val = center;
  left_val = center + 195;
  top_val = Math.floor( center + (-195 * Math.sin((Math.PI/2) - turn_val)));
  left_val = Math.floor( center + (195 * Math.cos(turn_val - (Math.PI/2))));

  $("#" + id_code).css({
    left: left_val,
    top: top_val
  });

  $("#" + id_code).data(
    "title", info.title
  );
  $("#" + id_code).data(
    "message", info.body
  );
  $("#" + id_code).data(
    "hour", hour
  );
}

// IMPORT DATA
$.getJSON(URL, function(data) {
  data.forEach(function(el) {
    makeNotification(el.id, el.hour, el.message);
    eventLists();
    $('.infobox').animate({opacity:1});
  });
});

// HANDLERS
function eventLists(){
  $('.not-circle').mouseover(function() {
    var hour = $(this).data().hour;
    hour = hour + ":00";

    $('.notification-title').text(
      $(this).data().title
    );
    $('.notification-body').text(
      $(this).data().message
    );
    $('.hour').text(
      hour
    );
  });

  $('.not-circle').mouseout(function() {
    $('.notification-title').text("");
    $('.notification-body').text("Hover over the suggestions to see how you can save energy.");
  });
}
});
