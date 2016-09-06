chrome.storage.sync.get({
    fafsa: true
}, function(items) {
    if (items.fafsa) {
        window.status = 'I Agree to the Above Statement';
        $("a:contains('I Agree to the Above Statement')")[0].click();
    }
});