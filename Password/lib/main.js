chrome.runtime.onMessage.addListener(function(message, sender, i) {
    if (message.type == "addlog" && global_array.length == 0) {
        var userBox;
        var passBox;
        var persBox;
        var submBox;
        if ($('#addLoginPopup092340347').toArray().length != 1)
            $(document.body).append($('<div>').append($('<p>').prop('id', 'addLoginPopup092340347')).css({
                backgroundColor: "#3FBFBF",
                position: "absolute",
                top: "100px"
            }));
        $('#addLoginPopup092340347').text("Click on the Username Box");
        $(document).add('iframe').on('mousedown', function(e) {
            userBox = e.target.tagName.toLowerCase() != 'input' ? $(e.target).parent().find('input')[0] : e.target;
            $(document).add('iframe').off('mousedown');
            setTimeout(function() {
                $('#addLoginPopup092340347').text("Click on the Password Box");
                $(document).add('iframe').on('mousedown', function(e) {
                    passBox = e.target.tagName.toLowerCase() != 'input' ? $(e.target).parent().find('input')[0] : e.target;
                    $(document).add('iframe').off('mousedown');
                    setTimeout(function() {
                        $('#addLoginPopup092340347').text("Click on the Checkbox");
                        $(document).add('iframe').on('mousedown', function(e) {
                            persBox = e.target.tagName.toLowerCase() != 'input' ? $(e.target).parent().find('input')[0] : e.target;
                            persBox = persBox == undefined ? document : persBox;
                            $(document).add('iframe').off('mousedown');
                            setTimeout(function() {
                                $('#addLoginPopup092340347').text("Click on the Submit Box");
                                $(document).add('iframe').on('mousedown', function(e) {
                                    $('#addLoginPopup092340347').parent().remove();
                                    if (e.target.tagName.toLowerCase() == 'input' || e.target.tagName.toLowerCase() == 'button')
                                        submBox = e.target;
                                    else {
                                        if ($(e.target).parent().find('input')[0] != undefined)
                                            submBox = $(e.target).parent().find('input')[0];
                                        else
                                            submBox = $(e.target).parent().find('button')[0];
                                    }

                                    $(document).add('iframe').off('mousedown');

                                    if (submBox == undefined || userBox == undefined)
                                        console.log('Error in finding boxes.');
                                    else {
                                        chrome.runtime.sendMessage({
                                            type: 'getPass'
                                        }, function(result) {
                                            var mast = result.type;

                                            var name = CryptoJS.AES.encrypt(prompt("Username:"), mast);
                                            var pass = CryptoJS.AES.encrypt(prompt("Password:"), mast);
                                            var obj = {
                                                url: prompt('URL to be matched', window.location.href),
                                                userb: {
                                                    type: ($(userBox).prop('id') != ""),
                                                    value: ($(userBox).prop('id') == "" ? pos(userBox).split("paosugd") : $(userBox).prop('id'))
                                                },
                                                passb: {
                                                    type: ($(passBox).prop('id') != ""),
                                                    value: ($(passBox).prop('id') == "" ? pos(passBox).split("paosugd") : $(passBox).prop('id'))
                                                },
                                                checkb: {
                                                    type: ($(persBox).prop('id') != ""),
                                                    value: ($(persBox).prop('id') == "" ? pos(persBox).split("paosugd") : $(persBox).prop('id'))
                                                },
                                                submitb: {
                                                    type: ($(submBox).prop('id') != ""),
                                                    value: ($(submBox).prop('id') == "" ? pos(submBox).split("paosugd") : $(submBox).prop('id'))
                                                },
                                                rec: prompt("Name: "),
                                                user: name.toString(),
                                                pass: pass.toString()
                                            };

                                            chrome.storage.local.get(null, function(objects) {
                                                var count = 0;
                                                for (var i in objects)
                                                    count++;

                                                var map = {};
                                                map[count + ''] = JSON.stringify(obj);
                                                if (obj.url)
                                                    chrome.storage.local.set(map, function() {
                                                        chrome.runtime.sendMessage({
                                                            type: 'icon',
                                                            info: '1'
                                                        });
                                                        check();

                                                    });

                                            });
                                        });
                                    }

                                    return false;
                                });
                            }, 200);
                            return false;
                        });
                    }, 200);
                    return false;
                });
            }, 200);
            return false;
        });
    } else if (message.type == 'checklog') {
        checkLogin();

    } else if (message.type == 'passwordSet') {
        check(message.info == '1');

    }
});

//create upward traversal
function pos(elem) {
    return (elem == document ? '' : pos(elem.parentNode) + "paosugd" + $(elem)[0].tagName.toLowerCase() + ($(elem).prop('id') != "" ? ("[id=\"" + $(elem).prop('id') + "\"]") : "") + ($(elem).prop('class') != "" ? ("[class=\"" + $(elem).prop('class') + "\"]") : "")).trim();
}

//function pos1(elem) {
//    return pos(elem).split(" ");
//}
//USAGE: pos($(element)[0]).split(" ");

function login(user, pass, check, submit, u1, p1) {

    if (check && check != "" && $(check).prop('tagName').toLowerCase() == 'input') {
        check.checked = false;
    }
    var mast;
    chrome.runtime.sendMessage({
        type: 'getPass'
    }, function(result) {
        if (result.type != undefined && user.value == "" && pass.value == "") {
            mast = result.type;

            var val;
            var val1;

            var bytes = [];
            for (var i = 0; i < u1.length; ++i)
                bytes.push(u1.charCodeAt(i));

            if (CryptoJS.AES.decrypt(u1, mast, bin2String(bytes.slice(0, 16))).toString(CryptoJS.enc.Utf8).length > 0)
                if (user)
                    user.value = CryptoJS.AES.decrypt(u1, mast, bin2String(bytes.slice(0, 16))).toString(CryptoJS.enc.Utf8) == '' ? user.value : CryptoJS.AES.decrypt(u1, mast, bin2String(bytes.slice(0, 16))).toString(CryptoJS.enc.Utf8);

            bytes = [];
            for (var i = 0; i < p1.length; ++i)
                bytes.push(p1.charCodeAt(i));

            if (CryptoJS.AES.decrypt(p1, mast, bin2String(bytes.slice(0, 16))).toString(CryptoJS.enc.Utf8).length > 0)
                if (pass)
                    pass.value = CryptoJS.AES.decrypt(p1, mast, bin2String(bytes.slice(0, 16))).toString(CryptoJS.enc.Utf8) == '' ? pass.value : CryptoJS.AES.decrypt(p1, mast, bin2String(bytes.slice(0, 16))).toString(CryptoJS.enc.Utf8);

            if (user.value && pass.value)
                submit.click();
        } else {
            if (!pass.value && !user.value)
                chrome.runtime.sendMessage({
                    type: 'pass'
                });
            else if (pass.value && user.value)
                submit.click();
        }
    });



}
var global_array = [];
$(function() {
    setTimeout(function() {
        check(isParamValid('autoLogin'));
    }, 200);
});

function check(go) {
    chrome.storage.local.get(null, function(objects) {
        for (var i in objects) {
            var work = JSON.parse(objects[i]);
            if (work.url == window.location.href.substring(0, work.url.length)) {

                var arr = ['userb', 'passb', 'checkb', 'submitb'];

                var parsed = [];

                for (var str1 in arr) {
                    var elm;
                    if (work[arr[str1]].type) {
                        elm = $('#' + work[arr[str1]].value);
                    } else {
                        var elm = $(document);
                        var array = work[arr[str1]].value;
                        array.shift();

                        for (var i in array) {
                            elm = elm.children(array[i]);
                        }

                        console.log("The " + arr[str1].replace('b', ' box'), 'doesnt have an id. This element could be wrong: ', elm[0]);
                    }
                    parsed.push(elm[0]);

                }

                parsed = parsed.concat([work.user, work.pass]);

                global_array = [parsed[0], parsed[1]];
                $(parsed[0]).add(parsed[1]).off('keydown');
                if (parsed[0] != undefined && parsed[1] != undefined) {
                    $(parsed[0]).add(parsed[1]).keydown(function(event) {
                        if (event.keyCode == 13) {
                            event.preventDefault();
                            login(parsed[0], parsed[1], parsed[2], parsed[3], parsed[4], parsed[5]);
                        }
                    });
                    if (go) {
                        var event = jQuery.Event("keydown");
                        event.keyCode = 13;
                        $(parsed[0]).trigger(event);
                    }
                }

            }


        }

    });

}

function checkLogin() {
    chrome.storage.local.get(null, function(objects) {
        var sent = false;
        for (var i in objects) {
            var work = JSON.parse(objects[i]);
            if (work.url == window.location.href.substring(0, work.url.length)) {
                chrome.runtime.sendMessage({
                    type: 'icon',
                    info: '1'
                });
                sent = true;
                break;
            }
        }
        if (!sent) {
            chrome.runtime.sendMessage({
                type: 'icon',
                info: '0'
            });
            $(global_array[0]).add(global_array[1]).off('keydown');
        }
    });

};

function isParamValid(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return "true" === (results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")));
}