var tasks;
var actions;
var clone;
var old = 1;

function updateTasks() {
    tasks.children().slice(1).remove();
    if (actions != null) {
        if (actions.length == 0)
            tasks.append("<span>NO TASKS</span>")
        else
            for (var i = 0; i < actions.length; i++) {
                var task = $("<div></div");
                task.append("<button>Delete this task</button><br>");
                task.append("<span>URL: " + actions[i].url + "</span>");

                var list = $("<ul></ul");
                for (var j = 0; j < Object.keys(actions[i].tasks).length; j++) {
                    var li = $("<li>" + actions[i].tasks[j].type + ":" + actions[i].tasks[j].elem + (actions[i].tasks[j].which ? "(" + actions[i].tasks[j].which + ")" : "") + (actions[i].tasks[j].value ? " - " + actions[i].tasks[j].value : "") + "</li>");
                    list.append(li);
                }
                task.append(list);
                tasks.append(task);
                tasks.append("<br>")

            }
    }
}

function saveTasks() {
    chrome.storage.local.set({
        actions: actions
    }, function() {
        $("#save").text("Options saved");
        setTimeout(function() {
            $("#save").text("Save Options");
        }, 2000);
    });
}

function addTask(obj) {
    actions.push(obj);
}

function clear() {
    $("#addURL").val("");
    $(".addSelector").val("");
    $(".addValue").val("");
}

$(function() {
    tasks = $("#tasks");
    clone = $(".copy").clone(false);
    chrome.storage.local.get({
        actions: [],
        enabled: true
    }, function(items) {
        actions = items.actions;
        $("#enable").prop("checked", items.enabled);
        updateTasks();
    });
    $("#addActions").on("change keyup", function() {

        var valid = isValid($(this).val(), 1, 10);
        if (valid != 0)
            $(this).val(valid < 0 ? 1 : 10);

        var clones = $(".copy");

        console.log("OLD: " + old + " | NEW: " + $(this).val());
        console.log(clones);
        var length = clones.length;
        if (old != $(this).val()) {
            for (var i = $(this).val() - 1; i < old - 1; i++)
                clones.eq(length - i - 1).remove();
            for (var i = old - 1; i < $(this).val() - 1; i++)
                $("#save").before(clone.clone());
        }
        old = $(this).val();
    });
    $("#addTask").on('change keyup', '.addWhich', function() {
        var valid = isValid($(this).val(), 0, 100);
        if (valid != 0)
            $(this).val(0);
    });
    $("#addTask").on('change', 'select', function() {
        if ($(this).val() == "val")
            $(".inputy").eq($("select").index(this)).css("display", "inline-block");
        else
            $(".inputy").eq($("select").index(this)).hide();

    });
    tasks.on('click', 'button', function() {
        actions.splice($("button").index(this), 1);
        saveTasks();
        updateTasks();
    });

    $("#enable").click(function() {
        console.log($("#enable").is(":checked"));
        chrome.storage.local.set({
            enabled: $("#enable").is(":checked")
        });
    });
    $("#save").click(function() {
        var obj = {
            url: $("#addURL").val(),
            tasks: {}
        };
        var shouldReturn = true;

        if (obj.url == "") {
            $("#addURL").css("background-color", "red");
            shouldReturn = false;
        } else
            $("#addURL").css("background-color", "transparent");

        var numTasks = $("#addActions").val();
        var types = $(".addType");
        var elems = $(".addSelector");
        var whichs = $(".addWhich");
        var values = $(".addValue");

        for (var i = 0; i < numTasks; i++) {
            var task = {};
            task.type = types.eq(i).val();
            task.elem = elems.eq(i).val();
            if (whichs.eq(i).val() != 0)
                task.which = whichs.eq(i).val();

            if (task.type == "val") {
                task.value = values.eq(i).val();
                if (task.value == "") {
                    values.eq(i).css("background-color", "red");
                    shouldReturn = false;
                } else
                    values.eq(i).css("background-color", "transparent");
            }

            obj.tasks[i] = task;

            if (task.type == "") {
                types.eq(i).css("background-color", "red");
                shouldReturn = false;
            } else
                types.eq(i).css("background-color", "transparent");

            if (task.elem == "") {
                elems.eq(i).css("background-color", "red");
                shouldReturn = false;
            } else
                elems.eq(i).css("background-color", "transparent");

        }
        console.log(obj);
        if (shouldReturn) {
            addTask(obj);
            saveTasks();
            updateTasks();
            clear();
        }
    });
});

function isInt(str) {
    var n = ~~Number(str);
    return String(n) == str;
}

function isValid(str, min, max) {
    var n = ~~Number(str);
    if (isInt(str) && n >= min && n <= (max ? max : 999999))
        return 0;
    else if (isInt(str) && n > (max ? max : 999999))
        return 1;
    else
        return -1;

}