function updateStorage() {

    chrome.storage.local.get(null, function(objects) {
        var count = 0;
        var countAll = 0;
        for (var i in objects)
            count++;

        var str = "";
        for (var i = 0; i < count; i++)
            str += '<div id=' + i + ' u=' + JSON.parse(objects[i]).url + ' n=\"' + JSON.parse(objects[i]).rec + '\">' + JSON.parse(objects[i]).rec + "</div>";

        $('#vars')[0].innerHTML = str;
        $('#count').text("Logins (" + count + ")");

        $('div').filter(':not(#count)').off('click');
        for (var i = 0; i < count; i++) {
            $('#' + i).mousedown(function(e) {
                if (e.which == 3)
                    confir($(this).prop('id'));
                else if (e.which == 1)
                    chrome.tabs.update({
                        url: $(this).text() + '?autoLogin=true'
                    }, function(tab) {
                        window.close();
                    });
                //  else if (e.which == 2)
                //     rename($(this).prop('id'));
                return false;
            });
            $('#' + i).on('contextmenu', function() {
                return false;
            });
            $('#' + i).css({
                padding: '0',
                margin: '0'
            });

            $('#' + i).hover(function() {
                $(this).css("font-weight", "bold");
                $(this).text($(this).attr('u'));
            }, function() {
                $(this).css("font-weight", "normal");
                $(this).text($(this).attr('n'));
            });
        }
        //Get correct popup box width
        var arr = [];
        for (var i = 0; i < count; i++)
            if (JSON.parse(objects[i]).url.length > JSON.parse(objects[i]).rec.length) {
                arr.push(i);
                swap(i);
            }
        var str = "";
        for (var x = 0; x < parseInt(($('#vars').width() < 230 ? 230 : $('#vars').width()) / 7) + 2; x++)
            str += 'h';
        $('#wide').text(str);
        $('#wider').offset({
            top: ($('#wide').offset().top + 6)
        });

        for (var i in arr)
            swap(arr[i]);
    });

}

function swap(i) {
    $('#' + i).text($('#' + i).text() == $('#' + i).attr('u') ? $('#' + i).attr('n') : $('#' + i).attr('u'));
    $('#' + i).css('font-weight', $('#' + i).text() == $('#' + i).attr('n') ? 'normal' : 'bold');
}

function del(k) {

    chrome.storage.local.remove(k, function() {
        chrome.storage.local.get(null, function(objects) {
            var x = 0;
            var arr = [];
            var arr1 = [];
            for (var i in objects) {
                x++;
                arr.push(objects[i]);
                arr1.push(i + '');

            }

            chrome.storage.local.remove(arr1, function() {
                var o = {};
                for (var y = 0; y < arr.length; y++)
                    o[y + ''] = arr[y];
                chrome.storage.local.set(o, function() {
                    updateStorage();
                    chrome.tabs.query({
                        active: true
                    }, function(tabs) {
                        for (var i in tabs)
                            chrome.tabs.sendMessage(tabs[i].id, {
                                type: 'checklog'
                            });
                    });
                });

            });
        });

    });

}

function rename(k) {
    chrome.storage.local.get(k, function(result) {
        var work = JSON.parse(result[k]);
        var URL = prompt("New URL: ", work.url);
        if (work.url != URL && URL != "") {
            work.url = URL;

            var map = {};
            map[k] = JSON.stringify(work);
            chrome.storage.local.set(map, function() {
                updateStorage();
            });
        } else
            updateStorage();
    });
}

function confir(k) {
    $('#' + k).off('mousedown');

    var t = $('#' + k).text();
    $('#' + k).text('click again to remove');

    $('#' + k).on('contextmenu', function() {
        return false;
    });

    $('#' + k).mousedown(function() {
        del(k);
        return false;
    });

    $('#' + k).mouseleave(function() {
        updateStorage();
    });

}

function resetStorage() {
    $('div').filter(":not(#count #wide)").each(function(i) {
        del($(this).prop('id'));
    });
}

var infoHelpID;
$(function() {
    $('#helpNum').hide();

    $('#sreset').click(resetStorage);

    $('#sreset').hover(function() {
        $('#count').text('Remove Logins Below');
        $('#helpNum').text("1/1");
        $('#helpNum').show();
    }, function() {
        $('#helpNum').hide();
        updateStorage();
    });



    $('#hreset').click(function() {
        chrome.storage.local.clear(function() {
            updateStorage();
        });
        chrome.runtime.sendMessage({
            type: 'icon',
            info: '0',
            infoo: '0'
        });
    });
    $('#hreset').hover(function() {
        $('#count').text('Clear Entire Storage');
        $('#helpNum').text("1/1");
        $('#helpNum').show();
    }, function() {
        $('#helpNum').hide();
        updateStorage();
    });

    $('#help').hover(function() {
        $('#count').text("Left click a URL to go to it");
        $('#helpNum').text("1/2");
        $('#helpNum').show();
        infoHelpID = setInterval(function() {
            $('#count').text($('#count').text() == "Left click a URL to go to it" ? "Right click a URL to delete it" : "Left click a URL to go to it");
            $('#helpNum').text($('#count').text() == "Left click a URL to go to it" ? "1/2" : "2/2");
        }, 2000);
    }, function() {
        clearInterval(infoHelpID);
        $('#helpNum').hide();
        updateStorage();
    });

    $('#pass').hover(function() {
        $('#count').text('Click to input a password');
        $('#helpNum').text("1/1");
        $('#helpNum').show();
    }, function() {
        $('#helpNum').hide();
        updateStorage();

    });

    $('#pass').click(function(e) {
        chrome.runtime.sendMessage({
            type: 'pass'
        });
    });

    $('#wider').rainbow({
        colors: [
            '#ff0000',
            '#ff4000',
            '#ff7f00',
            '#ffaa00',
            '#ffd400',
            '#ffff00',
            '#80ff00',
            '#00ff00',
            '#00ff80',
            '#00ffff',
            '#00aaff',
            '#0055ff',
            '#0000ff',
            '#4600ff',
            '#8b00ff',
            '#8b00ff',
            '#8b00ff',
            '#4600ff',
            '#0000ff',
            '#0055ff',
            '#00aaff',
            '#00ffff',
            '#00ff80',
            '#00ff00',
            '#80ff00',
            '#ffff00',
            '#ffd400',
            '#ffaa00',
            '#ff7f00',
            '#ff4000',
            '#ff0000'
        ],
        animate: true,
        animateInterval: 100,
        pad: false,
        pauseLength: 100,
    });


    $('#count').click(function() {
        chrome.runtime.sendMessage({
            type: 'info'
        });
    });

    updateStorage();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == 'icon')
        updateStorage();
});

var curTabId = 0;

chrome.tabs.onActivated.addListener(function(info) {
    curTabID = info.tabId;
});