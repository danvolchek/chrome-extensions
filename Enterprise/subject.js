$(".dataentrytable").find("tbody").prepend("<tr><td></td></tr>");
$(".dataentrytable").find("tbody").prepend("<tr><td><label for='subj_id'><span class='fieldlabeltext'>Search:</span></label></td><td><input id ='subjectSearch' type='text'></input></td></tr>")
var options = $("option");
var searchBox = $("#subjectSearch");
searchBox.focus();
var amountShown = 0;

searchBox.keydown(function(event) {
    if (event.which == 13 /* && amountShown == 1*/ ) {
        event.stopPropagation();
        event.preventDefault();
        for (var i = 0; i < 190; i++)
            if (options.eq(i).is(":visible")) {
                options.eq(i).attr("selected", "selected");
                $(":input[value*='Search']")[0].click();
                return true;
            }
    }
    return event.which != 13;
});
searchBox.keyup(function(event) {
    amountShown = 0;
    var searchText = searchBox.val().toLowerCase();
    for (var i = 0; i < 190; i++) {
        var option = options.eq(i);
        var optionText = option.text().toLowerCase();
        if (optionText.substring(0, searchText.length) == searchText /*|| (searchText.length > 1 && optionText.indexOf(searchText) != -1)*/ ) {
            amountShown++;
            option.show();
        } else {

            option.hide();
        }
    }
});
$("select").eq(0).css({
    "min-width": $("select").width() + "px"
});