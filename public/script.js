$(function() {
    // Icons
    var goodIcon = '<img class="icon icons8-Thumb-Up" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAvJJREFUaAXtWD1oFEEU/mbvsne5H4mJgop/MRAuxggS0l6hIIJgI6QNJJYitgrinTbapIyVgYhaWCiCoI0IKQTNkUaPhIApFNKI2hjindyNby5suCSzs3+zyQo7sNmd99689703u9+9DBCPuAJxBeIK7GYF2E4E55XyRYA/plhfAHYfywPP2ehoQ0dsQ4cTlQ/+rpQk8E/JpouuYXp+hhMLV1VrvOhCTwBZ4wwB2rMZFL++ee5/Fn4CBi9K4B3n7yc7JXLPovATAD8vRZVtaImtxYkUIAl55W4f3c5K9clVLQQSagJgjUkCTx/xttFE9eTaNqkPQWgJ8ErpGjgu2WBaiTSN8rnyZQIuqi8fDJ/kCu9S7TvA50tFsNaPVsIWDsesrc6jQmsCvHJnCE28JAxpJQ6WEDZahrYE6J0/CjRfEyrxi6saH9jwrQWVgRedFirjlZsHAXOeAh/wElxpyzBHfdMDpPkTNliq29nKKG7ddureKj1k7BZa8he9vBeovyLW1wdeOOcYoT8jWEM/zW5Y8bbeA79C57prMxRocKtjjfMJla/ACSQYZL2OKqZWXeAEtKKRO3soF69L7b8B1aqd0LV9xKpwkUmg/v0HanSJkchmYPZ05ZP5vAp7SxeZBCzgqX3drQRoXgDn06GzkGOJXBqY+3uQOXbYAt++KlwWao+0G88xC4VW9f+JhSQMtEgM5NgHieJFhoUEdXplIJFAJL4BvwwUmQQEEL/D1StUPHQEE4XT6DAMPFqq4s3XZb/xvK5T9kHCmatXaKz/FPam0sh1mBgvDHkF4d1eMBBj4+jEbafFrnbAyUkQfRAGEnFd7cDM0mf8qv3B7791TC9qOxHZyFswkGgjxJXM5aweqLxhoHhwtQOzK98grjCGYCBT7lj0QLb/SlpLXO2AZSy7NzSe8cj8O8kCJ/D2Z2qMgnx0CuRD78hAwqeeY5VqyaS+/QqdJFwgj3SaEOB4pa0HUh2n+ChIvCSuQFyBuAIhVOAfWyGw6OaCuM8AAAAASUVORK5CYII=" width="48" height="48">';

    var badIcon = '<img class="icon icons8-Thumbs-Down" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAvBJREFUaAXtWE1oE0EU/iZpk/hTqa2CVkR6qfX3YhLEQ0G8eNOTBxEKrRevvSm0TcWDeBIRPVmo4MGCCJ5EUDDgQaz1UIOhYLEqXsQfNP9NMr6JFjbJ7O5kf8wGdmDYmffevvm+92YeuwP4zY+AHwE/Au2MAHNicZ5KhJDHeXCcBEOMfO6w7JfhFcBuI8LvsQOJkpmfLl2DW1ezpNuoq/+neDjIB5Ev3qdpnMDbb1wEgMcoIEPk7KKZw4CZgZn+RF9xjmziZnYW9OMq79gmEGQYUVnILRv9LaRZcWRgN8aHD6M7EMDd5RQef1zRaO0NS1+/oZzLI7ytD8FNdTv2jopnpQyMDh3E1nAEm7tDGBs+pOK3JZtKNofc6udaL2cyaTA2hg2YVnGilAEVR1ZtQtv7IbqmDdMhvoACA1U300qklIG55bf4USwgs1bCbHpJs5ZLQ1GJOJ+lSjRjtoJSBpJfPkH0NjRRiQxLqVIG2gBceUmlDCh7s2hopxJ5goDgXatEVI1EKQ3196a7enquic8Js5h4goCdSuQJAtIoK34TdcIhNvwm6gQC0gStCz2zhaxWIs8QEBG1Uok8Q6CpEjH8Xt8mRk/PEGgC6VehppDIBRWOpFzzf6S2y+jT7+FRukVIuQjX8M/MiXsE8IVLO4HQIpGwfp3SGAHF6xVHCIi1+eKVPaiWX9BwVyOWhvlLFk0cbZBZnjpGQCDgC5fph7kqzkSvISIW3M+OTL4ztFFU2j4D2nVYdGoJ1cBpkhW08qYxr5xqklkUOEpAYGDxqefg7BwNK7qYHLxLcpxAjURs+gE9J3QJcDh2N+MKgRqJaOIG3ZU+0iExwOfngzq6lsSuEaih4EGRhbIEUQB7VyMSecsiVwmw6OR7QvRMimoty6XyFoWuEviLhT2RYipt6RACVZaUEPjAjk3kJfKWRe5nIFt9Q6h+1SNj1+vn1meuE2DHE3SI2VmC+JP6axqfwcq+m9Yh+2/6EfAj4EfASxH4A9QUyEQHKOl/AAAAAElFTkSuQmCC" width="48" height="48">';

    var suggestionIcon = '<img class="icon icons8-Info-Popup" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAdZJREFUaAVjYBgFoyFAUQgw4tJtF7C1npGRoQGXPD3Fge5oPLDOG6tbmHA5ZLA4HuS+//8Z6nG5E6cHcGkYbOKjHhjoGMGZiXff+/1/oB2HbL+rEitWt44mIeRQGgj2aAwMRKgj2znkY4AF2TfUZB+99ZFh1+V3YCPddIUYrNX4qWk83CyaeOD2i+8MM/c9g1sCYovxsTGoSnDCxajFoEkSuv7sK4b7sIlhKCJDgCYe0JTixnAKNjEMRWQI0CQJgZJKupMUSh6gRfIB+Rdr9QySGG1KgEKBDoAmeYAO7oZbQZM8ADI9bsZ1uCUgxqIMTRQ+tThDPgZGPUCtpECuOaMxQG7IUUvfaAxQKyTJNWc0BsgNOWrpG/IxMNoapVZSINecIZ+ERj1AbtRTSx/OGAAOTVcDLRkcI9T/GRpxeRhnKYRLAz7x3ff+TAX6OQufGmA3fJqrEks2fjXEy+KMAeKNQKhkecicD+TtQYhgsPZA1WBIkCtA1RgAOWLLw/+C7H//nAAy1dAcdesnM4uFjzzjezRxirhUjQGQS0AOZPz/1xcYMnCHgtggMWo7HmQf1T0AMtRFmeMWMPuHAZl/wBjIBouBJIcS2HP3VxYIDyU3j7p1xIUAAAJKXL7OarVJAAAAAElFTkSuQmCC" width="48" height="48">';

    suggestionIcon = '<img class="icon info" src="/public/info_green.svg">';

    // VARIABLES
    var infobox_inner = $(".infobox-inner");
    var infobox = $(".infobox");
    var URL = "https://calm-peak-94128.herokuapp.com/api/today";

    function makeCircle(arrayUsage, predictedDailyCost, suggestedDailyCost) {
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
            ctx.textAlign="center";
            ctx.font="30px Lato";
            ctx.fillText("Predicted daily cost:", 200, 150);
            ctx.fillText(parseInt(predictedDailyCost) + " kr", 200, 190);
            ctx.fillText("Suggested daily cost:", 200, 250);
            ctx.fillText(parseInt(predictedDailyCost) - (parseInt(suggestedDailyCost)) + " kr", 200, 290);
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


    function makeNotification(id, hour, info, suggestion) {
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

        if (suggestion == "suggestion") {
          $("#" + id_code).html(
            suggestionIcon
          );
        } else if (suggestion == "bad") {
          $("#" + id_code).html(
            badIcon
          );
          $("#" + id_code).css({
            "background-color": "#FF4136"
          });
        } else if (suggestion == "good") {
          $("#" + id_code).html(
            goodIcon
          );
          $("#" + id_code).css({
            "background-color": "#39CCCC"
          });
        }
    }

    // IMPORT DATA
    $.getJSON(URL, function(data) {
        arrayUsage = data.energyUsageData;
        var predictedDailyCost = data.predictedDailyCost;
        var suggestedDailyCost = data.suggestedDailyCost;
        // HERE WE MAKE THE CIRCLE
        makeCircle(arrayUsage, predictedDailyCost, suggestedDailyCost);
        data.notificationArray.forEach(function(el) {
            makeNotification(el.id, el.hour, el.message, el.type);
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
