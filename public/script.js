$(function() {
    // VARIABLES
    var infobox_inner = $(".infobox-inner");
    var infobox = $(".infobox");
    var URL = "https://calm-peak-94128.herokuapp.com/api/today";

    function makeCircle(arrayUsage) {
      var usageArray = arrayUsage;
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        function drawMultiRadiantCircle(xc, yc, r, radientColors) {
            var partLength = (2 * Math.PI) / radientColors.length;
            var start = (-Math.PI / 2);
            var gradient = null;
            var startColor = null,
                endColor = null;

            for (var i = 0; i < radientColors.length; i++) {
                startColor = radientColors[i];
                endColor = radientColors[(i + 1) % radientColors.length];

                // x start / end of the next arc to draw
                var xStart = xc + Math.cos(start) * r;
                var xEnd = xc + Math.cos(start + partLength) * r;
                // y start / end of the next arc to draw
                var yStart = yc + Math.sin(start) * r;
                var yEnd = yc + Math.sin(start + partLength) * r;

                ctx.beginPath();

                gradient = ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);
                gradient.addColorStop(0, startColor);
                gradient.addColorStop(1.0, endColor);

                ctx.strokeStyle = gradient;
                ctx.arc(xc, yc, r, start, start + partLength);
                ctx.lineWidth = 12;
                ctx.stroke();
                ctx.closePath();

                start += partLength;
            }
        }
        /*
        var usageArray = ['250',
            '277',
            '267',
            '273',
            '251',
            '269',
            '788',
            '1358',
            '1312',
            '1449',
            '1368',
            '770',
            '806',
            '869',
            '850',
            '802',
            '885',
            '805',
            '1191',
            '1378',
            '1461',
            '1401',
            '1339',
            '767'
        ];
        */
        var rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
            var hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');


        var average = 0;

        for (var usage of usageArray) {
            average += (usage / usageArray.length);
        }


        var someColors = [];

        for (var usageToColor of usageArray) {
        	if (usageToColor < average) {
          	someColors.push(rgbToHex(100, 255 - parseInt(usageToColor/average * 100),100));
          } else {
          	someColors.push(rgbToHex(255 - parseInt(usageToColor/average / 100),100,100));
          }
        }

        drawMultiRadiantCircle(200, 200, 194, someColors);
    }


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
        top_val = Math.floor(center + (-195 * Math.sin((Math.PI / 2) - turn_val)));
        left_val = Math.floor(center + (195 * Math.cos(turn_val - (Math.PI / 2))));

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
        arrayUsage = data.energyUsageData;
        // HERE WE MAKE THE CIRCLE
        makeCircle(arrayUsage);
        data.notificationArray.forEach(function(el) {
            makeNotification(el.id, el.hour, el.message);
            eventLists();
            $('.sk-chasing-dots').remove();
            $('.infobox').animate({
                opacity: 1
            });
        });

        // HANDLERS
        function eventLists() {
            $('.not-circle').mouseover(function() {
                that = this;
                var hour = $(this).data().hour;
                hourText = hour + ":00";

                if (hour < 10) {
                    hourText = "0" + hourText;
                }
                $('.notification-title').text(
                    $(that).data().title
                );
                $('.notification-body').html(
                    $(that).data().message
                );
                $('.hour').text(
                    hourText
                );

            });

            $('.not-circle').mouseout(function() {
                $('.notification-title').text("");
                $('.hour').text("");
                $('.notification-body').text("Hover over the suggestions to see how you can save energy.");
            });
        }
    });
});
