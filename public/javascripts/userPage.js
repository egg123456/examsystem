$(function() {
    var username = sessionStorage.username;

    // 修改密码
    $('#reset').on('click', function() {
        var pwd = $('#password').val();
        var cpwd = $('#checkpassword').val();
        // var uname = $('#username').val();
        if (cpwd === pwd) {
            $.ajax({
                type: "get",
                url: "/resetPwd/update",
                data: { "userName": username, "passWord": pwd },
                dataType: "json",
                success: function(response) {
                    alert("修改成功！");
                },
                err: function(err) {
                    console.log(err);
                }
            });
        } else {
            alert("两次密码不同！");
        }
    })

    // 在线考试
    $('#test').on('click', function() {
        $('#totest').css('display', 'block').siblings().css('display', 'none');
    });
    $('#ugmark').css('visibility', 'hidden');

    // 成绩排序
    $('#uGrade').on('click', function() {
        $('#ugmark').css('visibility', 'visible');
        $('#utmark').css('visibility', 'hidden');
    });
    // 时间排序
    $('#uTime').on('click', function() {
        $('#utmark').css('visibility', 'visible');
        $('#ugmark').css('visibility', 'hidden');
    });

    // 成绩查询
    $('#pre-show').on('click', function() {
        $('#tograde').css('display', 'block').siblings().css('display', 'none');
        $.ajax({
            type: "get",
            url: "/userPage/queryGrade",
            dataType: "json",
            data: { "userName": username },
            success: function(a) {
                $('#showGrade').html("");
                for (var i = 0; i < a.length; i++) {
                    console.log($(a[i].userName));
                    $('#showGrade').append(`<tr><th>${i+1}</th><td>${a[i].userName}</td><td>${a[i].Grade}</td><td>${a[i].Time}</td><td><button class="btn btn-info showpaper" data-toggle="modal" data-target="#myModal2">查看试卷</button></td></tr>`);
                }
                history();
            }
        });
    });

    var countGrade = 0; //给成绩排序那里定义一个计数变量
    $('#uGrade').on('click', function() {
        countGrade++;
        if (countGrade % 2 == 1) {
            $.ajax({
                type: "get",
                url: "/userPage/upGrade",
                dataType: "json",
                success: function(a) {
                    $('#ugmark').removeClass('glyphicon-arrow-down');
                    $('#ugmark').addClass('glyphicon-arrow-up');
                    $('#showGrade').html("");
                    for (var i = 0; i < a.length; i++) {
                        $('#showGrade').append(`<tr><th>${i+1}</th><td>${a[i].userName}</td><td>${a[i].Grade}</td><td>${a[i].Time}</td><td><button class="btn btn-info showpaper" data-toggle="modal" data-target="#myModal2">查看试卷</button></td></tr>`);
                    }
                    history();
                }
            });
        } else {
            $.ajax({
                type: "get",
                url: "/userPage/downGrade",
                dataType: "json",
                success: function(a) {
                    $('#ugmark').removeClass('glyphicon-arrow-up');
                    $('#ugmark').addClass('glyphicon-arrow-down');
                    $('#showGrade').html("");
                    for (var i = 0; i < a.length; i++) {
                        $('#showGrade').append(`<tr><th>${i+1}</th><td>${a[i].userName}</td><td>${a[i].Grade}</td><td>${a[i].Time}</td><td><button class="btn btn-info showpaper" data-toggle="modal" data-target="#myModal2">查看试卷</button></td></tr>`);
                    }
                    history();
                }
            });
        }
    });
    var countTime = 0; //给时间排序那里定义一个计数变量
    $('#uTime').on('click', function() {
        countTime++;
        if (countTime % 2 == 1) {
            $.ajax({
                type: "get",
                url: "/userPage/upTime",
                dataType: "json",
                success: function(a) {
                    $('#utmark').removeClass('glyphicon-arrow-down');
                    $('#utmark').addClass('glyphicon-arrow-up');
                    $('#showGrade').html("");
                    for (var i = 0; i < a.length; i++) {
                        $('#showGrade').append(`<tr><th>${i+1}</th><td>${a[i].userName}</td><td>${a[i].Grade}</td><td>${a[i].Time}</td><td><button  class="btn btn-info showpaper" data-toggle="modal" data-target="#myModal2">查看试卷</button></td></tr>`);
                    }
                    history();
                }
            });
        } else {
            $.ajax({
                type: "get",
                url: "/userPage/downTime",
                dataType: "json",
                success: function(a) {
                    $('#utmark').removeClass('glyphicon-arrow-up');
                    $('#utmark').addClass('glyphicon-arrow-down');
                    $('#showGrade').html("");
                    for (var i = 0; i < a.length; i++) {
                        $('#showGrade').append(`<tr><th>${i+1}</th><td>${a[i].userName}</td><td>${a[i].Grade}</td><td>${a[i].Time}</td><td><button class="btn btn-info showpaper" data-toggle="modal" data-target="#myModal2">查看试卷</button></td></tr>`);
                    }
                    history();
                }
            });
        }

    });

    function history() {
        $(".showpaper").on('click', function() {
            // 索引值对应试卷id $(this).parent().parent().children().first().html()
            //索引值 $(".showpaper").index($(this)) 对应的试卷id
            var sendId = $(this).parent().parent().children().first().html()
            $.ajax({
                type: "get",
                url: "/hisGrade/send",
                data: { "id": sendId },
                dataType: "json",
                success: function(r) {
                    console.log(r);
                },
                error: function(err) {
                    console.log(err);
                }
            })
            window.location.href = "/hisGrade";
        })
    }

})