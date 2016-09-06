function save_options() {
    if ($("#save").text() == "Save unsaved changes") {
        $("#save").text("Saving options");


        var term = $('#term').is(":checked");
        var school = $('#school').is(":checked");
        var fafsa = $('#fafsa').is(":checked");
        var closedC = $('#closedC').is(":checked");
        var clearArea = $('#clearArea').is(":checked");
        var shouldColor = $('#shouldColor').is(":checked");
        var shouldColorClosed = $('#shouldColorClosed').is(":checked");
        var closedColor = $('#closedColor')[0].jscolor.toHEXString().substring(1);
        var shouldColorOpen = $('#shouldColorOpen').is(":checked");
        var openColor = $('#openColor')[0].jscolor.toHEXString().substring(1);
        var shouldColorReg = $('#shouldColorReg').is(":checked");
        var regColor = $('#regColor')[0].jscolor.toHEXString().substring(1);
        var shouldColorSwitch = $('#shouldColorSwitch').is(":checked");
        var switchColor = $('#switchColor')[0].jscolor.toHEXString().substring(1);
        var noWeekend = $('#noWeekend').is(":checked");
        chrome.storage.sync.set({
            term: term,
            school: school,
            fafsa: fafsa,
            closedC: closedC,
            clearArea: clearArea,
            shouldColor: shouldColor,
            shouldColorClosed: shouldColorClosed,
            closedColor: closedColor,
            shouldColorOpen: shouldColorOpen,
            openColor: openColor,
            shouldColorReg: shouldColorReg,
            regColor: regColor,
            shouldColorSwitch: shouldColorSwitch,
            switchColor: switchColor,
            noWeekend: noWeekend
        }, function() {
            // Update status to let user know options were saved.
            $("#save").text("Options saved");
        });
    }
}
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
$(function() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        term: true,
        school: true,
        fafsa: true,
        closedC: false,
        clearArea: false,
        shouldColor: true,
        shouldColorClosed: true,
        closedColor: "FF0000",
        shouldColorOpen: true,
        openColor: "008200",
        shouldColorReg: true,
        regColor: "800080",
        shouldColorSwitch: false,
        switchColor: "CCCC00",
        termNum: false,
        noWeekend: true,
        schedule: null
    }, function(items) {
        $('#term').prop('checked', items.term);
        $('#school').prop('checked', items.school);
        $('#fafsa').prop('checked', items.fafsa);
        $('#closedC').prop('checked', items.closedC);
        $('#clearArea').prop('checked', items.clearArea);
        $('#shouldColor').prop('checked', items.shouldColor);
        $('#shouldColorClosed').prop('checked', items.shouldColorClosed);
        $('#closedColor')[0].jscolor.fromString(items.closedColor);
        $('#shouldColorOpen').prop('checked', items.shouldColorOpen);
        $('#openColor')[0].jscolor.fromString(items.openColor);
        $('#shouldColorReg').prop('checked', items.shouldColorReg);
        $('#regColor')[0].jscolor.fromString(items.regColor);
        $('#shouldColorSwitch').prop('checked', items.shouldColorSwitch);
        $('#switchColor')[0].jscolor.fromString(items.switchColor);
        $('#noWeekend').prop('checked', items.noWeekend);

        $('#save').on('click', save_options);
        $(".jscolor").change(function() {
            if ($(this).val() == $(this).attr('default'))
                $(this).next().hide();
            else
                $(this).next().show();
        });
        $(".reset").click(function() {
            $(this).prev()[0].jscolor.fromString($(this).prev().attr('default'));
            $(this).hide();
            shouldSave();
        });

        $(".jscolor").change();

        $("input[id*='Color']").click(function() {
            animate(false)
        });

        animate(true);

        $("input").change(function() {
            shouldSave();
        });

        $("#resetAll").click(function() {
            resetAll();
            $(".reset").click();
            shouldSave();
            animate(false);
        });

        $("#resetTerm").text("Reset Saved Term - " + items.termNum);

        if (items.schedule)
            console.log(JSON.parse(items.schedule));
        else
            console.log("Not visited concise page");

    });

    $("#resetTerm").click(function() {
        chrome.storage.sync.set({
            termNum: false
        }, function(result) {
            $("#resetTerm").text("Reset Saved Term - " + false);
        });
    });

});

function notDefault() {
    return $('#term').is(":checked") == true &&
        $('#school').is(":checked") == true &&
        $('#fafsa').is(":checked") == true &&
        $('#closedC').is(":checked") == false &&
        $('#clearArea').is(":checked") == false &&
        $('#shouldColor').is(":checked") == true &&
        $('#shouldColorClosed').is(":checked") == true &&
        $('#closedColor')[0].jscolor.toHEXString().substring(1) == "FF0000" &&
        $('#shouldColorOpen').is(":checked") == true &&
        $('#openColor')[0].jscolor.toHEXString().substring(1) == "008200" &&
        $('#shouldColorReg').is(":checked") == true &&
        $('#regColor')[0].jscolor.toHEXString().substring(1) == "800080" &&
        $('#shouldColorSwitch').is(":checked") == false &&
        $('#switchColor')[0].jscolor.toHEXString().substring(1) == "CCCC00" &&
        $('#noWeekend').is(":checked") == true;
}

function resetAll() {
    $('#term').prop('checked', true);
    $('#school').prop('checked', true);
    $('#fafsa').prop('checked', true);
    $('#closedC').prop('checked', false);
    $('#clearArea').prop('checked', false);
    $('#shouldColor').prop('checked', true);
    $('#shouldColorClosed').prop('checked', true);
    $('#closedColor')[0].jscolor.fromString("ff0000");
    $('#shouldColorOpen').prop('checked', true);
    $('#openColor')[0].jscolor.fromString("008200");
    $('#shouldColorReg').prop('checked', true);
    $('#regColor')[0].jscolor.fromString("800080");
    $('#shouldColorSwitch').prop('checked', false);
    $('#switchColor')[0].jscolor.fromString("CCCC00");
    $('#noWeekend').prop('checked', true);
}

function shouldSave() {
    chrome.storage.sync.get({
        term: true,
        school: true,
        fafsa: true,
        closedC: false,
        clearArea: false,
        shouldColor: true,
        shouldColorClosed: true,
        closedColor: "FF0000",
        shouldColorOpen: true,
        openColor: "008200",
        shouldColorReg: true,
        regColor: "800080",
        shouldColorSwitch: false,
        switchColor: "CCCC00",
        noWeekend: true
    }, function(items) {
        var term = $('#term').is(":checked");
        var school = $('#school').is(":checked");
        var fafsa = $('#fafsa').is(":checked");
        var closedC = $('#closedC').is(":checked");
        var clearArea = $('#clearArea').is(":checked");
        var shouldColor = $('#shouldColor').is(":checked");
        var shouldColorClosed = $('#shouldColorClosed').is(":checked");
        var closedColor = $('#closedColor')[0].jscolor.toHEXString().substring(1);
        var shouldColorOpen = $('#shouldColorOpen').is(":checked");
        var openColor = $('#openColor')[0].jscolor.toHEXString().substring(1);
        var shouldColorReg = $('#shouldColorReg').is(":checked");
        var regColor = $('#regColor')[0].jscolor.toHEXString().substring(1);
        var shouldColorSwitch = $('#shouldColorSwitch').is(":checked");
        var switchColor = $('#switchColor')[0].jscolor.toHEXString().substring(1);
        var noWeekend = $('#noWeekend').is(":checked");
        var changed = term == items.term && school == items.school && fafsa == items.fafsa && closedC == items.closedC && clearArea == items.clearArea && shouldColor == items.shouldColor;
        changed = changed && shouldColorClosed == items.shouldColorClosed && closedColor == items.closedColor && shouldColorOpen == items.shouldColorOpen && openColor == items.openColor;
        changed = changed && shouldColorReg == items.shouldColorReg && regColor == items.regColor && shouldColorSwitch == items.shouldColorSwitch && switchColor == items.switchColor;
        changed = !(changed && noWeekend == items.noWeekend);
        $("#save").text(changed ? "Save unsaved changes" : "No changes to save");
    });
}

function animate(initial) {
    $(".color").each(function() {
        if ($(this).prev().find("input").is(":checked")) {
            if (initial)
                $(this).show();
            else
                $(this).show("slow");
        } else {
            if (initial)
                $(this).hide();
            else
                $(this).hide("slow");
        }
    });
    if ($("#shouldColor").is(":checked")) {
        if (initial)
            $("#colorContainer").show();
        else
            $("#colorContainer").show("slow");
    } else {
        if (initial)
            $("#colorContainer").hide();
        else
            $("#colorContainer").hide("slow");
    }

}

//space out tables
//add crn box
//add view sections buttons