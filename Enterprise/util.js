function parseTime(time, days, obj) {
    var s = time[0].substring(0, time[0].indexOf("m") - 1).trim().split(":");
    var start = parseInt(s[0]) * 60;
    if (start != 12 * 60)
        start += (time[0].indexOf("p") != -1 ? 12 : 0) * 60
    start += parseInt(s[1]);

    var e = time[1].substring(0, time[1].indexOf("m") - 1).trim().split(":");
    var end = parseInt(e[0]) * 60;
    if (end != 12 * 60)
        end += (time[1].indexOf("p") != -1 ? 12 : 0) * 60
    end += parseInt(e[1]);

    var current = $(this).children().eq(1).text();
    for (var i = 0; i < days.length; i++) {
        if (!obj[days[i]])
            obj[days[i]] = [];
        obj[days[i]].push({
            course: (current.length < 2 ? last : current),
            start: start,
            end: end
        });
    }
}