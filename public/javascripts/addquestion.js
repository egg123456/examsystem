$(function() {
    // 定义选中的题目的id,注意是数组，需要存储所有的题目id
    var searchId = [];
    var tempItem = []; //将通过题目难度获取到的题目存在这个临时数组中
    var tempNum = []; //将选中的题目难度存在这个数组中
    var tempCheckNum = 0; //获取临时数组中的的题目长度
    var showT = []; //定义一个数组保存所有题目
    var selectShow = [];
    var selectHardNum = ["html", "css", "js"]; //存储题目类型的数组

    $('.hello').show();
    $('.choose').hide();
    $('.table-responsive').hide();

    //双击修改
    $('.changebtn').show();
    $('.changebtn-2').hide();


    // 修改和保存
    // 修改数据
    $(document).on("click", "#showAll td .changebtn", function() {
        $(this).parent().children('.changebtn-2').show();
        $(this).hide();
        $(this).parent().parent().children('td').children('textarea').show();
        $(this).parent().parent().children('.Question').children('textarea').val($(this).parent().parent().children('.Question').text());
        $(this).parent().parent().children('.class').children('textarea').val($(this).parent().parent().children('.class').text());
        $(this).parent().parent().children('.Answer').children('textarea').val($(this).parent().parent().children('.Answer').text());
        $(this).parent().parent().children('.qLevel').children('textarea').val($(this).parent().parent().children('.qLevel').text());
        $(this).parent().parent().children('.qOption').children('textarea').val($(this).parent().parent().children('.qOption').text());
        $(this).parent().parent().children('.Time').children('textarea').val($(this).parent().parent().children('.Time').text());
    });


    //保存数据
    $(document).on("click", "#showAll td .changebtn-2", function() {
        $(this).parent().children('.changebtn').show();
        $(this).hide();
        $(this).parent().parent().children('td').children('textarea').hide();
        var id = $(this).parent().parent().children('.id').text();
        console.log(id);
        var newQuestion = $(this).parent().parent().children('.Question').children('textarea').val();
        var newclass = $(this).parent().parent().children('.class').children('textarea').val();
        var newAnswer = $(this).parent().parent().children('.Answer').children('textarea').val();
        var newqLevel = $(this).parent().parent().children('.qLevel').children('textarea').val();
        var newqOption = $(this).parent().parent().children('.qOption').children('textarea').val();
        var data = {
            "Question": newQuestion,
            "Class": newclass,
            "qOption": newqOption,
            "qLevel": newqLevel,
            "Answer": newAnswer,
            "id": id
        };
        $.ajax({
            type: "post",
            url: "/addquestion/update",
            data: data,
            datatype: "json",
            success: function(a) {
                alert("修改成功！");
            },
            error: function() {

            }
        })

    });



    //添加题库题
    $("#submit").on("click", function() {
        $('#show-shijuan').hide();
        var Question = $("#Question").val();
        var Class = $("#Class").val();
        var Answer = $("#Answer").val();
        var qLevel = $("#qLevel").val();
        var A = $("#A").val();
        var B = $("#B").val();
        var C = $("#C").val();
        var D = $("#D").val();
        var Time = new Date().toLocaleDateString();
        console.log(Class);
        if (Question != " " && Class != "" && Answer != "" && qLevel != "" && A != "" && B != "" && C != "" && D != "") {
            var qOption = "A:" + A + "," + "B:" + B + "," + "C:" + C + "," + "D:" + D;
            var data = {
                "Question": Question,
                "Class": Class,
                "Answer": Answer,
                "qLevel": qLevel,
                "qOption": qOption,
                "Time": Time
            };
            $.ajax({
                type: "post",
                url: "/addquestion/addUser",
                data: data,
                datatype: "json",
                success: function(a) {
                    // $("div").html(a.msg);
                    alert("添加成功!");
                    $("#Question").val("");
                    $("#Class").val("");
                    $("#Answer").val("");
                    $("#qLevel").val("");
                    $("#A").val("");
                    $("#B").val("");
                    $("#C").val("");
                    $("#D").val("");
                },
                error: function(err) {
                    alert("添加失败！");
                    // $("div").html("添加失败");
                }
            })
        } else {
            alert("请确保所有项目填写完整！！");
        }


    })


    // 显示所有数据 试题列表按钮
    $("#show").on("click", function() {
        $('.choose').slideDown();
        $("#testIdShow").hide();
        $('.table-responsive').slideDown();
        $("#showPaper").hide();
        $("#show-shijuan").show();
        $.ajax({
            type: "post",
            url: "/addquestion/show",
            datatype: "json",
            success: function(a) {
                $('.hello').hide();
                showT = [];
                $("#showAll").empty();
                for (var i = 0; i < a.length; i++) {
                    // 把返回来的数据内容全都存在一个临时的数组中,然后再实现查询
                    showT.push(a[i]);
                    $("#showAll").append(`
                    <tr >
                        <td class="thCheck">
                            <input type="checkbox" class="checkBox">
                         </td>
                         <td class="id td-show">${a[i].id}</td>
                         <td class="Question td-show" title="${a[i].Question}"><textarea></textarea>${a[i].Question}</td>
                         <td class="class td-show" title="${a[i].Class}"><textarea></textarea>${a[i].Class}</td>
                         <td class="Answer td-show" title="${a[i].Answer}"><textarea></textarea>${a[i].Answer}</td>
                         <td class="qLevel td-show" ><textarea></textarea>${a[i].qLevel}</td>
                         <td class="qOption td-show" title="${a[i].qOption}"><textarea></textarea>${a[i].qOption}</td>
                         <td class="Time td-show">${a[i].Time}</td>
                         <td>
                            <button class="btn btn-success changebtn">修改</button>
                            <button class="btn btn-danger changebtn-2" style="display:none;">保存</button>
                         </td>
                    </tr>`);
                }
                $(".checkBox").on("click", function() {
                    searchId = [];
                    $(".checkBox").each(function() {
                        if ($(this).is(":checked")) {
                            var tempId = $(this).parent().parent().children(".id").html();
                            searchId.push(tempId);
                        }
                    })
                    $(".selectId").show();
                    $(".selectId").html(`已选中${searchId.length}道题目！`);
                    // 预览选中的题目模块需要的selecShow,存储选中的题目
                    selectShow = [];
                    searchId.forEach(function(elem) {
                        var tempId = elem;
                        showT.forEach(function(elem) {
                            if (elem.id == tempId) {
                                selectShow.push(elem);
                            }
                        })
                    })
                });
                // 每次试卷难度的复选框选中之后
                $(".test").on("click", function() {
                        selectByItem(searchId, tempItem, tempNum);
                    })
                    // 选择初始的下拉框的值
                $(".op").on("change", function() {
                    var selectHard = $("select option:checked").text();
                    selectHardNum.forEach(function(elem) {
                        if (elem === selectHard) {
                            $("#showAll").children("tr").children(".class").each(function() {
                                var tempHtml = $(this).html().trim().replace("<textarea></textarea>", "");
                                if (tempHtml == selectHard) {
                                    $(this).parent().show();
                                } else {
                                    $(this).parent().hide();
                                }
                            })
                        } else if (selectHard == "请选择试题类型") {
                            $("#showAll").children("tr").children(".class").each(function() {
                                $(this).parent().show();
                            })
                        }
                    })
                })

            },
            error: function(err) {
                $("#show_list").html("找不到数据哦");
            }
        })

    });
    // 开始实现分类查询,根据题目难度查询
    var selectByItem = function() {
            var iTem = $(".test");
            tempItem = []; //将通过题目难度获取到的题目存在这个临时数组中
            tempNum = []; //将选中的题目难度存在这个数组中
            // 获取选中题目难度存入数组
            iTem.each(function() {
                if ($(this).is(":checked")) {
                    tempNum.push($(this).val());
                }
            })
            switch (tempNum.length) {
                case 0:
                    notSort();
                    break;
                case 1:
                    sortDeal1(tempNum);
                    break;
                case 2:
                    sortDeal2(tempNum);
                    break;
                case 3:
                    notSort();
                    break;
            }
        }
        // 处理排序后的结果
    var sortDeal1 = function(tempNum) {
        if (tempNum[0] == 1) {
            $("#showAll").children("tr").each(function() {
                var htmlLen = $(this).children(".qLevel").html().length;
                if ($(this).children(".qLevel").html().slice(htmlLen - 1) != 1) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            })
        } else if (tempNum[0] == 2) {
            $("#showAll").children("tr").each(function() {
                var htmlLen = $(this).children(".qLevel").html().length;
                if ($(this).children(".qLevel").html().slice(htmlLen - 1) != 2) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            })
        } else if (tempNum[0] == 3) {
            $("#showAll").children("tr").each(function() {
                var htmlLen = $(this).children(".qLevel").html().length;
                if ($(this).children(".qLevel").html().slice(htmlLen - 1) != 3) {
                    $(this).hide();
                    console.log($(this));
                } else {
                    $(this).show();
                }
            })

        }
    }
    var sortDeal2 = function(tempNum) {
            if ((Number(tempNum[0]) + Number(tempNum[1])) === 3) { //1+2
                $("#showAll").children("tr").each(function() {
                    var htmlLen = $(this).children(".qLevel").html().length;
                    if ($(this).children(".qLevel").html().slice(htmlLen - 1) == 3) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                })
            } else if ((Number(tempNum[0]) + Number(tempNum[1])) == 4) { //1+3
                $("#showAll").children("tr").each(function() {
                    var htmlLen = $(this).children(".qLevel").html().length;
                    if ($(this).children(".qLevel").html().slice(htmlLen - 1) == 2) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                })
            } else if ((Number(tempNum[0]) + Number(tempNum[1])) === 5) { //2+3
                $("#showAll").children("tr").each(function() {
                    var htmlLen = $(this).children(".qLevel").html().length;
                    if ($(this).children(".qLevel").html().slice(htmlLen - 1) == 1) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                })

            }
        }
        // 不排序后的结果
    var notSort = function() {
        $("#showAll").children("tr").show();
        // 题目没选中后显示选中0个题目，没有排序前
        $(".selectId").html(`已选中${searchId.length}道题目！`); //初始化0条数据

    }


    //刷新
    $(document).on("click", "#show-list", function() {
        console.log($(this));
        $('.choose').hide().slideDown();
        $('.table-responsive').hide().slideDown();
        $("#showPaper").css("display", "none");
        $.ajax({
            type: "post",
            url: "/addquestion/show",
            datatype: "json",
            success: function(a) {
                $("#showAll").empty();
                $('.hello').hide();
                showT = [];
                for (let i = 0; i < a.length; i++) {
                    showT.push(a[i]);
                    $("#showAll").append(`<tr >
                        <td class="thCheck">
                            <input type="checkbox" class="checkBox">
                         </td><td class="id td-show" >${a[i].id}</td><td class="Question td-show"><textarea></textarea>${a[i].Question}</td><td class="class td-show"><textarea></textarea>${a[i].Class}</td>
                         <td class="Answer td-show"><textarea></textarea>${a[i].Answer}</td><td class="qLevel td-show"><textarea></textarea>${a[i].qLevel}</td><td class="qOption td-show"><textarea></textarea>${a[i].qOption}</td><td class="Time td-show">${a[i].Time}</td>
                         <td><button class="btn btn-success changebtn">修改</button>
                         <button class="btn btn-danger changebtn-2" style="display:none;">保存</button>
                         </td></tr>`);
                }
            },
            error: function(err) {
                $("#show_list").html("找不到数据哦");
            }
        });
        // 使得所有选中的checkbox变成没有选中状态
        $(".checkBox").each(function() {
                if ($(this).is(":checked")) {
                    $(this).attr("checked", false);
                }

            })
            // 再遍历查找没有选中的checkbox即题目的个数
        searchId = [];
        $(".selectId").html(`已选中${tempCheckNum}道题目！`);

    });
    // 预览选中题目
    $("#showChecked").on("click", function() {
        // 定义选中的题目,存入数组中
        $("#IdChecked").empty();
        if (searchId.length) {
            selectShow.forEach(function(elem, index) {
                var qOption = elem.qOption.split(",");
                $("#IdChecked").append(`<strong>第${index+1}题</strong><div>${elem.Question}</div>
            <div><span>${qOption[0]}</span><span>${qOption[1]}</span>
            <span>${qOption[2]}</span><span>${qOption[3]}</span></div>`);
            })
        } else {
            $("#IdChecked").append(`<div class="text-center">你还没有选中题目哦</div>`);
        }
    })

    // 试卷列表
    $("#pre-show").on("click", function() {
        $("#testIdShow").hide();
        $('.choose').hide();
        $('.table-responsive').hide();
        $(".selectId").hide();
        $(".hello").hide();
        $("#showPaper").slideDown();
        $.ajax({
            type: "post",
            url: "/addquestion/paperQuery",
            datatype: "json",
            success: function(r) {
                $("#paperList").empty();
                $("#showPaper").show();
                for (let j = 0; j < r.length; j++) {
                    $("#paperList").append(`<tr class="paperList"><td class="paperId">${r[j].id}</td><td class="tId">${r[j].tId}</td><td>${r[j].Time}</td></tr>`)
                }
                // 点击试卷列表的试卷id会弹出试卷信息
                $(".paperList").on("click", function() {
                    var id = $(this).children(".id").html();
                    var tId = $(this).children(".tId").html();
                    $.ajax({
                        type: "post",
                        url: "/addquestion/paperMake",
                        data: "id=" + tId,
                        datatype: "json",
                        success: function(r) {
                            $("#pull-left").empty();
                            $("#showPaper").hide();
                            $("#testIdShow").show();
                            $("#testIdShow").css("cursor", "pointer");
                            r.forEach(function(elem, index) {
                                var qOption = elem.qOption.split(",");
                                $("#testIdShow").children("#pull-left").append(`<strong class="col-md-12 text-left">第${index+1}题</strong><div class="text-left col-md-12 rQ">${elem.Question}</div>
                                <div class="col-md-12 text-left rOption"><span>${qOption[0]}</span><span>${qOption[1]}</span>
                                <span>${qOption[2]}</span><span>${qOption[3]}</span></div>`);

                            })
                            $("#pull-left").append(`<button class="btn btn-info fix-btn">返回试卷列表</button>`);

                        },
                        error: function(err) {
                            alert("试卷展示出错！");
                        }
                    })
                })
            },
            error: function(err) {
                console.log("试卷展示错误");
            }
        })
    });
    //生成试卷按钮
    $("#show-shijuan").on("click", function() {
        $(".selectId").html(`已选中${searchId.length}道题目！`);
        // 判断试题id数目是否为20个,我们规定要插入20个
        if (searchId.length === 20) {
            $.ajax({
                type: "post",
                url: "/addquestion/paperMake",
                data: "id=" + searchId,
                success: function(r) {
                    for (var i = 0; i < r.length; i++) {
                        $("#paper").append(`<div><span>${i+1}</span></span>:${r[i].Question}</div`);
                        var qOption = r[i].qOption.split(",");
                        $("#paper").append(`<span>${qOption[0]}</span><span>${qOption[1]}</span><span>${qOption[2]}</span><span>${qOption[3]}</span><span style="color:red;">&nbsp;&nbsp;&nbsp;正确答案为:${r[i].Answer}</span>`)
                    }
                    $("#savePaper").attr("disabled", false);
                },
                error: function(err) {
                    console.log(err);
                }

            })
        } else if (searchId.length < 20) {
            // 如果没有选够20条数据
            $("#savePaper").attr("disabled", true);
            // 调用试题id存储
            // selectTestNum(searchId);
            while (searchId.length != 20) {
                var ramdNum = Math.floor(Math.random() * showT.length);
                if (searchId.indexOf(ramdNum) == -1) {
                    searchId.push(ramdNum);
                }
            }
            $.ajax({
                type: "post",
                url: "/addquestion/paperMake",
                data: "id=" + searchId,
                success: function(r) {
                    for (var i = 0; i < r.length; i++) {
                        $("#paper").append(`<div><span>${i+1}</span></span>:${r[i].Question}</div`);
                        var qOption = r[i].qOption.split(",");
                        $("#paper").append(`<span>${qOption[0]}</span><span>${qOption[1]}</span><span>${qOption[2]}</span><span>${qOption[3]}</span><span style="color:red;">&nbsp;&nbsp;&nbsp;正确答案为:${r[i].Answer}</span>`)
                    }
                    $("#savePaper").attr("disabled", false);
                },
                error: function(err) {
                    console.log(err);
                }

            })
            $(".selectId").show();
            $(".selectId").html(`已选中${searchId.length}道题目！`);
        } else {
            $("#paper").empty();
            $("#paper").append(`<span style="margin:0 auto">请选中刚好20条数据！！！</span>`);
            // 使选中的题目变成非选中的
            $("#savePaper").attr("disabled", true);
        }
    })

    // 试卷插入
    $("#savePaper").on("click", function() {
            var paperId = searchId.join(",");
            var time = new Date();
            var str = "" + time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
            $.ajax({
                type: "post",
                data: { tId: paperId, Time: str },
                url: "/addquestion/paperInsert",
                success: function(r) {
                    alert("添加成功");
                },
                error: function(err) {
                    console.log("试卷插入错误！！");
                }
            })
        })
        // 返回试卷列表
    $("#pull-left").on("click", ".fix-btn", function() {
        $("#testIdShow").hide();
        $('.choose').hide();
        $('.table-responsive').hide();
        $(".selectId").hide();
        $(".hello").hide();
        $("#showPaper").slideDown();
        $.ajax({
            type: "post",
            url: "/addquestion/paperQuery",
            datatype: "json",
            success: function(r) {
                $("#paperList").empty();
                $("#showPaper").show();
                for (let j = 0; j < r.length; j++) {
                    $("#paperList").append(`<tr class="paperList"><td class="paperId">${r[j].id}</td><td class="tId">${r[j].tId}</td><td>${r[j].Time}</td></tr>`)
                }
                // 点击试卷列表的试卷id会弹出试卷信息
                $(".paperList").on("click", function() {
                    $("#myModal3").trigger("click");
                    var id = $(this).children(".id").html();
                    var tId = $(this).children(".tId").html();
                    $.ajax({
                        type: "post",
                        url: "/addquestion/paperMake",
                        data: "id=" + tId,
                        datatype: "json",
                        success: function(r) {
                            $("#pull-left").empty();
                            $("#showPaper").hide();
                            $("#testIdShow").show();
                            $("#testIdShow").css("cursor", "pointer");
                            r.forEach(function(elem, index) {
                                var qOption = elem.qOption.split(",");
                                $("#testIdShow").children("#pull-left").append(`<strong class="col-md-12 text-left">第${index+1}题</strong><div class="text-left col-md-12 rQ">${elem.Question}</div>
                                <div class="col-md-12 text-left rOption"><span>${qOption[0]}</span><span>${qOption[1]}</span>
                                <span>${qOption[2]}</span><span>${qOption[3]}</span></div>`);

                            })
                            $("#pull-left").append(`<button class="btn btn-info fix-btn">返回试卷列表</button>`);

                        },
                        error: function(err) {
                            alert("试卷展示出错！");
                        }
                    })
                })
            },
            error: function(err) {
                console.log("试卷展示错误");
            }
        })
    });
});