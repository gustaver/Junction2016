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
          	someColors.push('#39CCCC');
          } else {
          	someColors.push('#FF4136');
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

        var iconInfo = '<img class="icon icons8-Good-Quality" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABDZJREFUaAXtWV1IVEEUPrO7uv6srVlWhkEQ/YjYQz9S0EMFPSWpGxUoVI8ZQU9BEPQQ+NRbFL5FCT2UpBn2UEEJBUlUBGFGQUVEUWAq/q+7dzpn9C7X3ZmdGXczhJ2XO3fm/Hzf2Zm5Z84C5FouArkILOkIsGyhP9jVsJ352H7gUIs2q7jDK30MSsi+w2EU575jdwAYvMS5Jw8a772muUxbRgT23jkSCgVjLQj6BHBebQWGsX4kc3NsOtDWe7RjzErXI7xgAnXdjed4nF9gDMIee9ZdzmGE+VlrT33XZWtlVLAmIJYK51eBsV0LcajU4byPM3bGdmlZEajrPNTMmK+dA/iUQOYmCtisyBR3dKKJeQTjcO4c74ncv5UY1HT8mvnEdF1n4ymM+nUc0JIO+fxwraIKmsMVEPIF4O3UaMKOpsPQR2TTsapfH29/eKWRFdPaSJIURR4YbzMxSDJbgyWw0p8HebhBGkrKoToYMlWdlUNfwqeBlpaAWPO4bAxsJURqCuYDrswLJuZMO7RUybdOXkuA4YY1WfOuo3xc+3sKS91X8YzhUWPbyCf51umlJUBHpe1p0xReA6X+wDy/I05s3rvxC550AkMaBSUB+kjROZ9GN2VqX3EZREpWpYx/jk6mjJkOEAbCopJXEqAvrM1HamfhMjhbti7liPoyMwmD8RmVf+04YRBfe4WkkoBIDxRKycPVwWI4v2I9+FPgAzwe+5Msbv9OqYqiSc90cfIAGJ3DWxB8a/kGoM27kPYpOgHtIz+13wrc1DtkX2mpV5FVGqBZHciHSxmAJxcb84vg9PJKrTcVJimBuZRYa/RkeC0ULjDyXuOFzCAhmE3TvWqiLyeA+XyKpGRgW4FI9yUzdkPvpo2yaSkmKQG6jJhAKMKcZ7GaCpOUgHuTWixwNQa5kgqTlMBiAXf9RC1SblfHfUoJ0B3WFViM59OJIa0bFSYpgbkLuNZotgQejg1qTakwSQmgtQGtxSwJUJ467BilGlJMcgJY+sgSPq2Z37EozJik2wpMUgJUt9F6zpIApREmTYVJSkDkHFS30bQJJ66RSD9N+s8MNjDeSfpleRBZlxIQbrHolN49wBvzy7rUlB9zZdoD2pYGi5IAVcyo6JTO+I2RHzCZwRk+5ehLLoSBsKhwKHOBrx3vo5ubquIYogMq5XFcAr3jQ+IUKcUqRPJVUqVHUX8+MQxXhr6B7rqJVbuLjw7f7VXZkt4HvMJ1nfUvbO/FXv2M+lit64l0705nQ7mEXCUq9yFL/W/tKmTpST7Jt86clgDtfir36Qxle558qk4ery8tARIWtUrOWryK/7SPvkzro9o94AVqU9z16pn2xbKxLO4a/QIuAIoKboZa/DOjzx3L2hNtkm3TyLt+rX4BV4meS/YPDi+JJf0Xk5cI9UUt6T/8yZeMI/eei0AuAkssAn8BGPNwkW0pb9gAAAAASUVORK5CYII=" width="48" height="48">';

        $("#" + id_code).data(
          "icon", iconInfo
        );
        $("#" + id_code).html(
          iconInfo
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
