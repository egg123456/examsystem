$(function() {
    $.ajax({
        type: "get",
        url: "/test/allPaper",
        dataType: "json",
        success: function(r) {
            for (var i = 0; i < r.length; i++) {
                $("#sel").append(`<option value="${i+1}">第${i+1}套试卷</option>`);
            }
        },
        error: function(err) {
            console.log(err)
        }
    });
    var sendId;
    $("#begintest").on("click", function() {
        if ($("#sel option:selected").val() == 0) {
            sendId = Math.floor(Math.random() * 5 + 1);
        } else {
            sendId = $("#sel option:selected").val();
        }
        $.ajax({
            type: "get",
            url: "/exam/send",
            data: { "id": sendId },
            dataType: "json",
            success: function(r) {
                console.log(r);
            },
            error: function(err) {
                console.log(err);
            }
        })
        window.location.href = "/exam";
    });
})