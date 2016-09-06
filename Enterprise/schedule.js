//$("table[summary*='submit']").find("tr").after("<tr><td class='pldefault'>&nbsp;&nbsp;</td></tr>");
$("table[summary*='submit']").find("tr").last().after("<tr><td class='pldefault'><button id='downloadButton'>Loading Image</button></td></tr>");

var canvas;
var ready = false;
chrome.storage.sync.get({
    noWeekend: false
}, function(items) {
    var newWidth = $("table[summary*='weekly']").width() - ($("table[summary*='weekly']").find("tr").eq(0).children().eq(6).width() + $("table[summary*='weekly']").find("tr").eq(0).children().eq(7).width());
    if (items.noWeekend)
        $("table[summary*='weekly']").find("tbody").children().each(function() {
            var a = $(this).children(":gt(" + ($(this).children().length - 3) + ")");
            a.remove();
        });
    $("table[summary*='weekly']").width(newWidth);
    $("table[summary*='anchors']").width(newWidth);

    html2canvas($("table[summary*='weekly']")[0], {
        background: "#fff",
        onrendered: function(c) {
            canvas = c;
            $("#downloadButton").text("Download as Image");
            ready = true;
        }
    });
});
$("#downloadButton").click(function(event) {
    if (ready) {
        var fileName = "schedule.png";
        saveData(canvas.toDataURL(), fileName);
    }
    return false;
});

var saveData = (function() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function(data, fileName) {
        var blob = toBlob(data),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

function toBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);

        return new Blob([raw], {
            type: contentType
        });
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {
        type: contentType
    });
}