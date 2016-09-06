String.prototype.startsWith = function(other) {
    var length = other.length;
    if (this.length < length)
        return false;
    return this.substring(0, length) == other;
};

chrome.storage.local.get({
    actions: null
}, function(items) {
    var actions = items.actions;
    if (actions) {
        for (var i = 0; i < actions.length; i++) {
            if (window.location.href.startsWith(actions[i].url)) {
                var tasks = actions[i].tasks;
                for (var j = 0; j < Object.keys(tasks).length; j++) {
                    var task = tasks[j];
                    if (task.type == "click") {
                        $(task.elem)[task.which ? task.which : 0].click();
                    } else if (task.type == "val") {
                        $(task.elem).eq(task.which ? task.which : 0).val(task.value);
                    }
                }
            }
        }
    }
});