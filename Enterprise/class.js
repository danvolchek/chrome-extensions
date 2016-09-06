if ($("caption").length == 1) {
    var rows = $(".datadisplaytable").find("tr").slice(2);
    var obj = {};
    var last = "";

    chrome.storage.sync.get({
        shouldColor: true,
        shouldColorClosed: true,
        closedColor: "ff0000",
        shouldColorOpen: true,
        openColor: "008200",
        shouldColorReg: true,
        regColor: "800080",
        shouldColorSwitch: false,
        switchColor: "CCCC00",
        schedule: null,
        closedC: true
    }, function(items) {
        if (items.shouldColor) {
            var lastColor = ""; //when theres 2 times per section ie cs233
            for (var i = 0; i < rows.length; i++) {
                var inner = rows.eq(i).children().toArray();
                if (items.shouldColorClosed && rows.eq(i).find("abbr").eq(0).text() == "C") {
                    for (var j = 0; j < inner.length; j++) {
                        inner[j].innerHTML = "<font color='#" + items.closedColor + "'>" + inner[j].innerHTML + "</font>";
                    }
                    lastColor = items.closedColor;
                } else if (items.shouldColorReg && rows.eq(i).children().eq(0).text() == " ") {
                    var color = items.regColor;
                    if (rows.eq(i).children().eq(1).text() == " ")
                        color = lastColor;

                    for (var j = 0; j < inner.length; j++) {
                        inner[j].innerHTML = "<font color='#" + color + "'>" + inner[j].innerHTML + "</font>";
                    }
                    lastColor = color;
                } else if ((items.shouldColorOpen || items.shouldColorSwitch) && rows.eq(i).children().eq(0).children().length == 3) {
                    var schedule = JSON.parse(items.schedule);
                    var object = {};
                    parseTime(rows.eq(i).children().eq(9).text().split("-"), rows.eq(i).children().eq(8).text(), object);
                    //console.log(object);
                    var conflicts = isConflict(schedule, object);
                    //console.log("DONE");

                    var color = items.shouldColorSwitch && !conflicts ? items.switchColor : (items.shouldColorOpen ? items.openColor : "000000");
                    for (var j = 0; j < inner.length; j++) {
                        inner[j].innerHTML = "<font color='#" + color + "'>" + inner[j].innerHTML + "</font>";
                    }
                    lastColor = color;
                }

            }
        }

        $(".datadisplaytable").find("tr").eq(1).children().not("th:eq(0)").before("<th class='ddheader' scope='col'>&nbsp;</th>");
        $(".datadisplaytable").find("tr").eq(0).children().attr("colspan", "50");
        for (var i = 0; i < rows.length; i++) {
            rows.eq(i).children().not("td:eq(0)").before("<td class='dddefault'>&nbsp;</td>");
        }

        $("caption").append(" | Show closed sections: <input id = 'closedCheckbox' type='checkbox' " + (items.closedC ? "checked" : "") + "></input> - Show: <select id='showOnly'><option value='N'>All Types</option><option value='L'>Lectures</option><option value='D'>Discussions</option><option value='Y'>Labs</option><option value='Q'>Quizzes</option></select>");
        showhide();

        $("#closedCheckbox").click(function() {
            showhide();
        });

        $("#showOnly").change(function() {
            showhide();
        });

    });

    function isConflict(schedule, course) {
        for (var day in course) {
            //console.log(day);
            for (var i = 0; i < course[day].length; i++) {
                for (var j = 0; j < schedule[day].length; j++) {
                    //console.log(schedule[day][j].course);
                    //console.log((course[day][i].end >= schedule[day][i].start && course[day][i].end <= schedule[day[i]].end));
                    //console.log((course[day][i].start >= schedule[day][i].start && course[day][i].start <= schedule[day[i]].end));
                }
            }
        }
        return true;
    }

    function showhide() {
        for (var i = 0; i < rows.length; i++) {
            var action = true;
            var text = rows.eq(i).children().eq(8).text();
            var type = "N";
            if (text.length < 3)
                type = "L";
            if (text.length == 3) {
                if (text.charAt(0) == 'L' || text.charAt(1) == 'Y')
                    type = "Y";
                else if (text.charAt(1) == "L")
                    type = "L";
                else if (text.charAt(0) == 'D')
                    type = "D";
                else if (text.charAt(0) == 'Q')
                    type = "Q";

            }

            //when theres 2 times per section ie cs233
            if (!$("#closedCheckbox").is(':checked') && (rows.eq(i).find("abbr").eq(0).text() == "C" || (i != 0 && rows.eq(i - 1).find("abbr").eq(0).text() == "C" && rows.eq(i).children().eq(1).text() == " "))) {
                action = false;
            }
            if ($("#showOnly").val() != "N" && $("#showOnly").val() != type)
                action = false;

            if (action)
                rows.eq(i).show();
            else
                rows.eq(i).hide();
        }
    }
}