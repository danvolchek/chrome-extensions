var passwordSet = '0';
var pageHasPass = '0';

var password;

var str = 'POPUP\n' +
    ' -Click the lock icon to enter in a new password.\n' +
    ' -Click Hard Reset to clear all storage variables - even ones not listed. This should fix the extension if something is badly broken.\n' +
    ' -Click Soft reset to clear the listed logins - its either to do this than remove them all one by one.\n' +
    ' -Hover over the question mark for info about logins. You can left click a login to go to that site, or right click a login to delete it.\nICON\n' +
    ' -The left side of the icon turns green if you have a correct password entered. The right side turns green if the current page has a login associated with it.\nPAGE\n' +
    '--The following only work when a page has a login on it. If it does not, the username and password box act normally.--\n' +
    " -If the correct password is set and Enter is pressed on the username/password box:\n" +
    '  -If both the username and password boxes are empty will make the extension enter in the details.\n' +
    '  -If both contain text, the extension will just hit enter, assuming that you want to login to a different account.\n' +
    '  -If one contains text and the other does not, hitting enter will do nothing.\n' +
    " -If the password is not set and Enter is pressed on the username/password box:\n" +
    "  -A dialog box will popup prompting the password, and if entered correctly, will login with correct details";
chrome.storage.local.get(null, function(objects) {
    console.log(objects)
});

function newPass(requesting) {
    var pass = prompt("Password:");
    if (pass === "") {
        passwordSet = '0';
        password = undefined;
        updateIcon();
    } else if (pass) {
        chrome.storage.local.get(null, function(objects) {
            if (objects[1] != undefined) {
                var test = JSON.parse(objects[1]).user;
                var bytes = [];
                for (var i = 0; i < test.length; ++i) {
                    bytes.push(test.charCodeAt(i));
                }
                if (CryptoJS.AES.decrypt(test, pass, bin2String(bytes.slice(0, 16))).toString(CryptoJS.enc.Utf8) == '') {
                    passwordSet = '0';
                    password = undefined;
                } else
                    passwordSet = '1';
            } else
                passwordSet = '1';
            if (passwordSet == '1')
                password = pass;

            if (requesting)
                chrome.tabs.sendMessage(requesting, {
                    type: 'passwordSet',
                    info: passwordSet
                });

            updateIcon();
        });

    } else {
        passwordSet = '0';
        password = undefined;

        if (requesting)
            chrome.tabs.sendMessage(requesting, {
                type: 'passwordSet',
                info: passwordSet
            });

        updateIcon();
    }



}

updateIcon();

function contextClicked(info, tab) {
    if (passwordSet == '1')
        chrome.tabs.sendMessage(tab.id, {
            type: "addlog"
        });
    else {
        newPass();
        if (passwordSet == '1')
            chrome.tabs.sendMessage(tab.id, {
                type: "addlog"
            });

    }
}

chrome.tabs.onActivated.addListener(function(ids) {
    chrome.tabs.get(ids.tabId, function(tab) {
        if (tab.url.substring(0, 9) != 'chrome://')
            chrome.tabs.sendMessage(ids.tabId, {
                type: 'checklog'
            });
        else {
            pageHasPass = '0';
            updateIcon();
        }
    })
});

chrome.tabs.onUpdated.addListener(function(id, changeInfo, tab) {
    if (tab.url.substring(0, 9) != 'chrome://')
        chrome.tabs.sendMessage(id, {
            type: 'checklog'
        });
    else {
        pageHasPass = '0';
        updateIcon();
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == 'icon') {
        pageHasPass = request.info == undefined ? pageHasPass : request.info;
        passwordSet = request.infoo == undefined ? passwordSet : request.infoo;
        updateIcon();

    } else if (request.type == 'pass') {
        newPass(sender.tab.id);
    } else if (request.type == 'info') {
        //TODO:
        //Create some way to showcase the info text
    } else if (request.type == 'getPass') {
        sendResponse({
            type: password
        });
    }
});

chrome.tabs.onRemoved.addListener(function(id, info) {
    chrome.tabs.query({
        active: true
    }, function(tabs) {
        for (var i in tabs)
            chrome.tabs.sendMessage(tabs[i].id, {
                type: 'checklog'
            });
    });
});

function updateIcon() {
    chrome.browserAction.setIcon({
        path: 'images/19_'.concat(passwordSet).concat('_').concat(pageHasPass).concat('.png')
    });
}

chrome.contextMenus.create({
    "type": "normal",
    "title": "Add a new login",
    "onclick": contextClicked
});