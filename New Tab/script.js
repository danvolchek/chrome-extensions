//for blank just omit img
var obj = [{
    fullName: "Name at top of screen",
    name: "Name",
    slots: [{
        img: "google.png",
        name: "Google",
        url: "https://google.com/"
    }, {

    }, {
        img: "github.png",
        name: "Github",
        url: "https://github.com"
    }, {

    }, {
        img: {
            left: "github.png",
            right: "google.png"
        },
        name: {
            left: "Github!",
            right: "Google!"
        },
        url: {
            left: "https://github.com/",
            right: "https://google.com/"
        }
    }, {}]
}, {
    fullName: "Page 2 Example",
    name: "2",
    slots: [{}, {
        img: "github.png",
        name: "Github",
        url: "https://github.com"
    }, {}, {}, {}, {
        img: "google.png",
        name: "Google",
        url: "https://google.com/"
    }]
}];




var saved = {};
var current = 0;
var circles;
var imgs;
var spans;
var as;
var labels;
var lastPos = -2;

//OPTIONS
var hoverPersist = true;
var showTitle = true;
var showLables = true;
var showCircles = true;
var showNames = true;

function updateImages() {
    if (current != lastPos) {
        if (showCircles)
            for (var i = 0; i < circles.length; i++) {
                circles.eq(i).css("opacity", i == current ? 0.6 : 0.2);
                if (showLables) {
                    labels.eq(i).stop(true, true);
                    if (lastPos != -2 && !circles.eq(i).is(":hover")) {
                        if (i == current)
                            labels.eq(i).fadeTo("slow", 1).delay(700).fadeTo("slow", 0);
                        else
                            labels.eq(i).fadeTo("slow", 0);
                    }
                }
            }
        if (showTitle)
            $("#title").text(obj[current].fullName ? obj[current].fullName : (obj[current].name ? obj[current].name : ""));

        for (var i = 0; i < obj[current].slots.length; i++) {
            var anchor = as.eq(i);
            if (typeof obj[current].slots[i].url == "object") {
                anchor.attr({
                    left: obj[current].slots[i].url.left,
                    right: obj[current].slots[i].url.right
                });
                if (!obj[current].slots[i].img.left || !obj[current].slots[i].img.right) {
                    anchor.removeAttr("href");
                } else
                    anchor.attr("href", saved[current][i] ? anchor.attr(saved[current][i]) : obj[current].slots[i].url.left);

                anchor.on("mousemove", function(e) {
                    var a = $(this);
                    var index = as.index(this);
                    var which = e.pageX >= a.offset().left + a.width() / 2 ? "right" : "left";

                    if (hoverPersist)
                        saved[current][index] = which;

                    var hold = a.attr("href");
                    var hnew = a.attr(which);
                    if (hnew != hold) {
                        var img = imgs.eq(index);
                        var span = spans.eq(index);
                        if (img.attr("left"))
                            img[0].src = img.attr(which);
                        if (showNames && span.attr("left"))
                            span.text(span.attr(which));
                        a.attr("href", hnew);
                    }
                });
            } else {
                anchor.off("mousemove");
                if (!obj[current].slots[i].img) {
                    anchor.removeAttr("href");
                } else
                    anchor.attr("href", obj[current].slots[i].url);
            }

            var image = imgs.eq(i);
            if (typeof obj[current].slots[i].img == "object") {
                var imgl = obj[current].slots[i].img.left ? obj[current].slots[i].img.left : "blank.png";
                var imgr = obj[current].slots[i].img.right ? obj[current].slots[i].img.right : "blank.png";
                image.attr({
                    left: "imgs/" + imgl,
                    right: "imgs/" + imgr
                });
                image.attr("src", (saved[current][i] ? image.attr(saved[current][i]) : "imgs/" + imgl));
            } else
                image.attr("src", "imgs/" + (obj[current].slots[i].img ? obj[current].slots[i].img : "blank.png"));

            var span = spans.eq(i);
            if (showNames)
                if (typeof obj[current].slots[i].name == "object") {
                    span.attr({
                        left: obj[current].slots[i].name.left,
                        right: obj[current].slots[i].name.right
                    });
                    span.text(saved[current][i] ? span.attr(saved[current][i]) : obj[current].slots[i].name.left);
                } else {
                    span.text(obj[current].slots[i].img ? obj[current].slots[i].name : "");
                }
        }
    }
}
$(function() {
    var circs = $('#circles');
    for (var i = 0; i < obj.length; i++)
        circs.append("<li><table><tr><td class = 'tlabel'><span class='label'></span></td><td class = 'tlabel'><img class='circle'></img></td></tr></table></li>")
    circs.css("margin-top", "-" + (circs.height() / 2) + "px");
    circles = $(".circle");
    imgs = $("img").not(".circle");
    spans = $("span").not(".label").not("#title");
    as = $("a");
    labels = $(".label");
    $(window).bind('mousewheel', function(e) {
        if (e.originalEvent.wheelDelta / 120 > 0) {
            if (current > 0)
                current--;
        } else {
            if (current < obj.length - 1)
                current++;
        }
        if (lastPos == -2)
            lastPos = -1;
        updateImages();

        lastPos = current;

    });

    if (showCircles)
        circles.click(function(e) {
            lastPos = -1;
            current = circles.index(this);
            updateImages();
        });

    if (showCircles && showLables)
        circles.hover(function(e) {
            labels.eq(circles.index(this)).stop(true, true);
            labels.eq(circles.index(this)).fadeTo(150, 1);
        }, function(e) {
            labels.eq(circles.index(this)).stop(true, true);
            labels.eq(circles.index(this)).fadeTo(150, 0);
        });
    if (showCircles) {
        for (var i = 0; i < circles.length; i++) {
            if (showLables)
                labels.eq(i).text(obj[i].name);
            circles.eq(i).css("opacity", i == current ? 0.6 : 0.2);
        }
    } else
        circles.hide();

    $("#d").width($("table").width());

    $(window).resize(function() {
        imgs.width($(document.body).width() / 4.7);
        $("#d").width($("table").width());
    });

    for (var i = 0; i < obj.length; i++)
        saved[i] = {};

    updateImages();

});