var rows = $(".datadisplaytable").find("tr").slice(1);
$(".datadisplaytable").find("tr").eq(0).children().eq(1).after("<th class='ddheader' scope='col'>Sections</th>");
$(".datadisplaytable").find("tr").eq(0).children().slice(1).before("<th class='ddheader' scope='col'>&nbsp;&nbsp;</th>");
var term = $(":input[name='term_in']").val();
for (var i = 0; i < rows.length; i++) {
    var children = rows.eq(i).children();
    var course = children.eq(3).text();
    var num = children.eq(4).text();
    var parts = window.location.href.split("/");
    children.eq(1).after("<td class='dddefault'><form action='" + parts[0] + "//" + parts[2] + "/BANPROD1/bwskfcls.P_GetCrse' method='POST' onsubmit='return checkSubmit()'><input type='hidden' name='term_in' value='" + term + "'><input type='hidden' name='sel_subj' value='dummy'><input type='hidden' name='sel_subj' value='" + course + "'><input type='hidden' name='SEL_CRSE' value='" + num + "'><input type='hidden' name='SEL_TITLE' value=''><input type='hidden' name='BEGIN_HH' value='0'><input type='hidden' name='BEGIN_MI' value='0'><input type='hidden' name='BEGIN_AP' value='a'><input type='hidden' name='SEL_DAY' value='dummy'><input type='hidden' name='SEL_PTRM' value='dummy'><input type='hidden' name='END_HH' value='0'><input type='hidden' name='END_MI' value='0'><input type='hidden' name='END_AP' value='a'><input type='hidden' name='SEL_CAMP' value='dummy'><input type='hidden' name='SEL_SCHD' value='dummy'><input type='hidden' name='SEL_SESS' value='dummy'><input type='hidden' name='SEL_INSTR' value='dummy'><input type='hidden' name='SEL_INSTR' value='%'><input type='hidden' name='SEL_ATTR' value='dummy'><input type='hidden' name='SEL_ATTR' value='%'><input type='hidden' name='SEL_LEVL' value='dummy'><input type='hidden' name='SEL_LEVL' value='%'><input type='hidden' name='SEL_INSM' value='dummy'><input type='hidden' name='sel_dunt_code' value=''><input type='hidden' name='sel_dunt_unit' value=''><input type='hidden' name='call_value_in' value=''><input type='hidden' name='rsts' value='dummy'><input type='hidden' name='crn' value='dummy'><input type='hidden' name='path' value='1'><input type='submit' name='SUB_BTN' value='View Sections'></form></td>");
    children = $(rows[i]).children();

    children.eq(7).text(children.eq(7).text().replace("Urbana-Champaign", "UIUC"));
    children.eq(8)[0].innerHTML = "&nbsp;&nbsp;&nbsp;" + children.eq(8).text().trim().substring(0, 1);
    children.slice(1).before("<td>&nbsp;&nbsp;</td>");

}

$(".plaintable[summary*='Summary']").wrap("<table class='plaintable'><tbody><tr id = 'crnTable'><th></th></tr></tbody></table>");
$("#crnTable").append("<th>&nbsp;&nbsp;&nbsp;&nbsp;</th>");
$("#crnTable").append("<td class = 'pldefault'><table class='plaintable'><tbody><tr>" +
    "<td class = 'pldefault'><span id ='crnError'>Enter 1-10 CRNS:</span></th></tr><tr><th><textarea rows='4' cols='50' id='crnArea'></textarea></th></tr><tr><th><button id='crnSubmit'>Parse CRNs</button>&nbsp;&nbsp;&nbsp;<button id='crnClear'>Clear CRNs</button></th></tr></span>" +
    "</td></tbody></table>");

var crnBoxes = $("input[id^='crn_id']");
var clear = false;
$("#crnSubmit").click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    var ar = [];
    var stringp = $("#crnArea").val().split("\n");
    for (var i = 0; i < stringp.length; i++) {
        var work = stringp[i];
        var type = work.split(" ")
        for (var j = 0; j < type.length; j++) {
            Array.prototype.push.apply(ar, type[j].split(","));
        }

    }
    for (var i = 0; i < ar.length; i++)
        if (ar[i] == "") {
            ar.splice(i, 1);
            i--;
        }
    var reg = /^[0-9]+$/;
    var ers = [];
    var text = "Enter 1-10 CRNS:";

    for (var i = 0; i < ar.length; i++)
        if (!reg.test(ar[i]) || ar[i].length != 5)
            ers.push(ar[i]);
    if (ers.length != 0)
        text += " Invalid CRN" + (ers.length == 1 ? "" : "s") + ": " + ers;
    else {
        if (ar.length > 10 || ar.length < 1)
            text += " Too " + (ar.length > 10 ? "many" : "few") + " CRNs!";
        else {
            for (var i = 0; i < ar.length; i++)
                crnBoxes.eq(i).val(ar[i]);
            chrome.storage.sync.get({
                clearArea: false
            }, function(items) {
                if (items.clearArea)
                    clearArea();
            });
        }
    }
    $("#crnError").text(text);

    return false;

});

function clearArea() {
    $("#crnArea").val("");
    $("#crnError").text("Enter 1-10 CRNS:");
}

$("#crnClear").click(function(event) {
    clearArea();
    return false;
});

$("input[value='Reset']").on('click', false);
$("input[value='Reset']").on('click', function() {
    $("select[id^='action_id']").each(function() {
        $(this).val($(this).children().eq(0).prop("value"))
    });
    $("input[id^='crn_id']").val("");
});