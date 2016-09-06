var total = 0;
$(".dataentrytable").find("tbody").each(function() {
    total += parseInt($(this).children().eq(1).find(".dedefault").text());
});
if (!isNaN(total))
    $(".dataentrytable").eq(0).before("<span>Total Credit Hours: " + total + ".000</span>");