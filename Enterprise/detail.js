chrome.storage.sync.get({
    termNum: false
}, function(items) {
    console.log(items.termNum);
    if (items.termNum)
        $(".captiontext").each(function() {
            if ($(this).text().indexOf("-") != -1) {
                var j = $(this).text().split("-");
                var course = j[1].trim().split(" ")[0];
                var num = j[1].trim().split(" ")[1];
                var parts = window.location.href.split("/");
                $(this).css({
                    display: "inline"
                });
                $(this).append("&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<form style='display:inline;' action='" + parts[0] + "//" + parts[2] + "/BANPROD1/bwskfcls.P_GetCrse' method='POST' onsubmit='return checkSubmit()'><input type='hidden' name='term_in' value='" + items.termNum + "'><input type='hidden' name='sel_subj' value='dummy'><input type='hidden' name='sel_subj' value='" + course + "'><input type='hidden' name='SEL_CRSE' value='" + num + "'><input type='hidden' name='SEL_TITLE' value=''><input type='hidden' name='BEGIN_HH' value='0'><input type='hidden' name='BEGIN_MI' value='0'><input type='hidden' name='BEGIN_AP' value='a'><input type='hidden' name='SEL_DAY' value='dummy'><input type='hidden' name='SEL_PTRM' value='dummy'><input type='hidden' name='END_HH' value='0'><input type='hidden' name='END_MI' value='0'><input type='hidden' name='END_AP' value='a'><input type='hidden' name='SEL_CAMP' value='dummy'><input type='hidden' name='SEL_SCHD' value='dummy'><input type='hidden' name='SEL_SESS' value='dummy'><input type='hidden' name='SEL_INSTR' value='dummy'><input type='hidden' name='SEL_INSTR' value='%'><input type='hidden' name='SEL_ATTR' value='dummy'><input type='hidden' name='SEL_ATTR' value='%'><input type='hidden' name='SEL_LEVL' value='dummy'><input type='hidden' name='SEL_LEVL' value='%'><input type='hidden' name='SEL_INSM' value='dummy'><input type='hidden' name='sel_dunt_code' value=''><input type='hidden' name='sel_dunt_unit' value=''><input type='hidden' name='call_value_in' value=''><input type='hidden' name='rsts' value='dummy'><input type='hidden' name='crn' value='dummy'><input type='hidden' name='path' value='1'><input type='submit' name='SUB_BTN' value='View Sections'></form>");
            }
        });
});