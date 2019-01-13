$(function() {
    var i = 600; //倒计时变量
    var oId; //存储用户答题的答案
    var test; //存储试卷答案
    var grade = 0; //成绩
    var userA = ""; //用户回答
    var tid1 = ""; //试卷中题目id
    $('#show').on('click', function() {
        //倒计时交卷
        var tid = $("#sendId").html()
        var interval = setInterval(function() {
            i--;
            if (i === 0) {
                getGrade();
                clearInterval(interval)
            }
            $(".time").html(i);
        }, 1000);
        $.ajax({
            type: 'get',
            url: '/exam/queryAll',
            dataType: 'json',
            success: function(r) {
                console.log(r);
                console.log(r[tid - 1].tId);
                tid1 = r[tid - 1].tId;
                $.ajax({
                    type: 'get',
                    url: '/exam/paper',
                    dataType: 'json',
                    data: { "tid": r[tid - 1].tId },
                    success: function(a) {
                        var b = 0; //控制上下题切换的变量
                        var btn = $(".examPage a"); //选中所有的a,就说左边的题号
                        var tid; //左边选项的题号
                        test = a;
                        console.log(test)
                        $("#show").attr("disabled", true);
                        $("#show").css("background-color", "#ccc");
                        $("#prev").attr("disabled", true);
                        $("#prev").css("background-color", "#ccc");
                        $("ol").empty();
                        for (var i = 0; i < a.length; i++) {
                            $('ol').append(`<li class="tid"><span>第${i+1}题 . </span>${a[i].Question}</br>
                            <div class="form"><input type="radio" name="option${i}" value="${a[i].qOption.split(',')[0]}">${a[i].qOption.split(',')[0]}</br></br><input type="radio" name="option${i}" value="${a[i].qOption.split(',')[1]}">${a[i].qOption.split(',')[1]}</br></br><input type="radio" name="option${i}" value="${a[i].qOption.split(',')[2]}">${a[i].qOption.split(',')[2]}</br></br><input type="radio" name="option${i}" value="${a[i].qOption.split(',')[3]}">${a[i].qOption.split(',')[3]}</div>
                            </li>`)
                        }
                        //答案   <span>答案是:${a[i].Answer}<span>
                        btn.on("click", function() {
                            tid = Number($(this).html() - 1);
                            b = tid;
                            $("ol").css("top", -300 * Number($(this).html() - 1) + "px");
                            oId = checked();
                            for (var i = 0; i < oId.length; i++) {
                                $(btn[oId[i].li_index]).css("background-color", "green");
                            }
                            switch (b) {
                                case 0:
                                    $("#prev").attr("disabled", true);
                                    $("#prev").css("background-color", "#ccc");
                                    break;
                                case 19:
                                    $("#next").attr("disabled", true);
                                    $("#next").css("background-color", "#ccc");
                                    $("#prev").attr("disabled", false);
                                    $("#prev").css("background-color", "#B0E0E6");
                                    break;
                                default:
                                    $("#next").attr("disabled", false);
                                    $("#prev").attr("disabled", false);
                                    $("#next").css("background-color", "#B0E0E6");
                                    $("#prev").css("background-color", "#B0E0E6");
                            }
                        });
                        $("body").on("click", function() {
                                oId = checked();
                                for (var i = 0; i < oId.length; i++) {
                                    $(btn[oId[i].li_index]).css("background-color", "green");
                                }
                            })
                            //点击上下题来切换题号
                        $("#next").on("click", function() {
                            $("#prev").attr("disabled", false);
                            if (b === 18) {
                                //禁用
                                $("#next").attr("disabled", true);
                                $("#next").css("background-color", "#ccc");
                            } else {
                                $("#prev").css("background-color", "#B0E0E6");
                            }
                            b++;
                            $("ol").css("top", -300 * b + "px");
                            oId = checked();
                            for (var i = 0; i < oId.length; i++) {
                                $(btn[oId[i].li_index]).css("background-color", "green");
                            }
                        });
                        //上一题
                        $("#prev").on("click", function() {
                            if (b === 1) {
                                //禁用
                                $("#prev").attr("disabled", true);
                                $("#prev").css("background-color", "#ccc");
                            } else {
                                $("#next").css("background-color", "#B0E0E6");
                            }
                            $("#next").attr("disabled", false);
                            b--;
                            $("ol").css("top", -300 * b + "px");
                            oId = checked();
                            for (var i = 0; i < oId.length; i++) {
                                $(btn[oId[i].li_index]).css("background-color", "green");
                            }
                        });
                        //获取到题的答案
                        var arr = $("li");
                        //获取完成的答题的题号
                        function checked() {
                            var answer = [];
                            var oid = [];
                            var _index;
                            arr.each(function() {
                                _index = $(this).index();
                                $(this).children(".form").children().each(function() {
                                    if ($(this).is(":checked")) {
                                        oid.push({ "li_index": _index, "answer": $(this).val() });
                                    }
                                });
                            })
                            return oid;
                        }
                    },
                    error: function(err) {
                        console.log(err);
                    }
                })
            },
            error: function(err) {
                console.log(err);
            }
        })
    });

    //题号li_index 答案 answer_index
    //获取答案 单选
    //评分部分

    function getGrade() {
        var tAns = [];
        for (var i = 0; i < test.length; i++) {
            tAns.push(test[i].Answer);
        }
        // console.log(oId[0].answer.substr(0,1));
        oId.forEach(function(elem) {
            if (tAns[elem.li_index] === elem.answer.substr(0, 1)) {
                grade += 5;
            }
            userA += elem.answer.substr(0, 1) + ",";
        });
        userA = userA.slice(0, -1);
        $(".bg").attr("style", "display:block");
        $("#grade").html(`你这次考试的成绩是${grade}分，再接再厉！`);
    }
    $("#submit").on("click", function() {
        //将考试分数和答题记录传回到数据库 grade表中
        var username = sessionStorage.username;
        getGrade();
        // console.log(userA);
        var year = (new Date().getFullYear()).toString(),
            month = (new Date().getMonth() > 10 ? new Date().getMonth() : "0" + new Date().getMonth()).toString(),
            day = new Date().getDay() > 10 ? new Date().getDay() : "0" + new Date().getDay(),
            time = "";
        // console.log(year, month, day);
        time = year + month + day;

        $.ajax({
            type: "get",
            url: "/exam/updateGrade",
            data: { "userName": username, "userClass": "", "tId": tid1, "Grade": grade, "Time": time, "UserAnswer": userA },
            dataType: "json",
            success: function(r) {
                console.log(r.msg);
            },
            error: function(err) {
                console.log(err);
            }
        })
    });
});