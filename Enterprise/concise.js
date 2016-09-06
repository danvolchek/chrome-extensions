var obj = {};
var last = "";
chrome.storage.sync.get({
    termNum: false
}, function(items) {
    var parts = window.location.href.split("/");
    $(".datadisplaytable").eq(1).find("tr").each(function() {

        var time = $(this).children().eq(9).text().split("-");
        if (time.length == 2) {
            parseTime(time, $(this).children().eq(8).text(), obj);
            last = $(this).children().eq(1).text();
        }

        if (items.termNum) {
            var text = $(this).children().eq(1).text();
            if (text == "Course") {
                $(this).children().eq(1).after("<td class='ddheader'>Section</td>");
            } else if (text.length < 2) {
                $(this).children().eq(1).after("<td class='dddefault'>&nbsp;</td>");
            } else {
                var course = text.split(" ")[0];
                var num = text.split(" ")[1];
                $(this).children().eq(1).after("<td class='dddefault'><form style='display:inline;' action='" + parts[0] + "//" + parts[2] + "/BANPROD1/bwskfcls.P_GetCrse' method='POST' onsubmit='return checkSubmit()'><input type='hidden' name='term_in' value='" + items.termNum + "'><input type='hidden' name='sel_subj' value='dummy'><input type='hidden' name='sel_subj' value='" + course + "'><input type='hidden' name='SEL_CRSE' value='" + num + "'><input type='hidden' name='SEL_TITLE' value=''><input type='hidden' name='BEGIN_HH' value='0'><input type='hidden' name='BEGIN_MI' value='0'><input type='hidden' name='BEGIN_AP' value='a'><input type='hidden' name='SEL_DAY' value='dummy'><input type='hidden' name='SEL_PTRM' value='dummy'><input type='hidden' name='END_HH' value='0'><input type='hidden' name='END_MI' value='0'><input type='hidden' name='END_AP' value='a'><input type='hidden' name='SEL_CAMP' value='dummy'><input type='hidden' name='SEL_SCHD' value='dummy'><input type='hidden' name='SEL_SESS' value='dummy'><input type='hidden' name='SEL_INSTR' value='dummy'><input type='hidden' name='SEL_INSTR' value='%'><input type='hidden' name='SEL_ATTR' value='dummy'><input type='hidden' name='SEL_ATTR' value='%'><input type='hidden' name='SEL_LEVL' value='dummy'><input type='hidden' name='SEL_LEVL' value='%'><input type='hidden' name='SEL_INSM' value='dummy'><input type='hidden' name='sel_dunt_code' value=''><input type='hidden' name='sel_dunt_unit' value=''><input type='hidden' name='call_value_in' value=''><input type='hidden' name='rsts' value='dummy'><input type='hidden' name='crn' value='dummy'><input type='hidden' name='path' value='1'><input type='submit' name='SUB_BTN' value='Section'></form></td>");
            }
        }
    });

    console.log(obj);

    chrome.storage.sync.set({
        schedule: JSON.stringify(obj)
    });
});