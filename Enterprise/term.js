chrome.storage.sync.get({
    term: true
}, function(items) {
    var select = $("select").eq(0);
    var val1 = select.find("option").eq(0).prop("value");
    var val2 = select.find("option").eq(1).prop("value");
    if (val2.length == 6 || val1.length == 6) {
        if (val1 == "") {
            select.val(val2);
            chrome.storage.sync.set({
                termNum: val2
            });
        } else {
            select.val(val1);
            chrome.storage.sync.set({
                termNum: val1
            });
        }
        if (items.term && $(":input[value='Submit']")[0])
            $(":input[value='Submit']")[0].click();
    }

});

//TODO:
//add checking if you can take class
//fix default checking
//fix ungodly options.js code