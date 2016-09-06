chrome.storage.sync.get({
    school: true
}, function(items) {
    if (items.school) {
        $(".big").eq(2)[0].click();
    }
});




//OPTIONS
//Autoselect Term: first done
//AutoAccept Fafsa: true/false done
//auto pick uiuc: true/flase done
//Show closed classes by default
//Clear box after parse: true/false