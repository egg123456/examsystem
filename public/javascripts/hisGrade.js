$(function(){
    var sendId = $("#sendId").html();
    $.ajax({
        type:"get",
        url:"/hisGrade/getHistory",
        data:{"id":sendId},
        dataType:"json",
        success:function(r){
            $.ajax({
                type:"get",
                url:"/hisGrade/getTest",
                data:{"tid":r[0].tId},
                dataType:"json",
                success:function(a){
                    var tAns = [];//用来存储准确的答案
                    var trueId = []; // 用户正确答案
                    var errId = [];// 用户错误答案
                    var userA = r[0].userAnswer;//从数据库拿到用户的做题答案，并把答案字符串转化为答案数组 4
                    var b = 0;
                    var tid;
                    var btn = $("a");
                    for(var i=0;i<a.length;i++){
                        tAns.push(a[i].Answer);
                    }
                    userA = userA.split(",");
                    console.log(userA);
                    console.log(tAns);
                    userA.forEach(function(ele,index){
                        if(ele === tAns[index]){
                            trueId.push(index);
                        }else{
                            errId.push(index);
                        }
                    });
                    console.log(trueId);
                    trueId.forEach(function(ele,index){
                        $(btn[ele]).css("background-color","green");
                    });
                    errId.forEach(function(ele,index){
                        $(btn[ele]).css("background-color","red");
                    })
                    var b = 0;
                    var tid;
                    var btn = $("a");
                    $("ol").empty();
                    $("#prev").attr("disabled", true);
                    $("#prev").css("background-color", "#ccc");
                    for(var i=0;i<a.length;i++){
                        $('ol').append(`<li class="tid"><span>第${i+1}题 . </span>${a[i].Question}</br>
                        <div class="form"><input type="radio" name="option${i}" value="${a[i].qOption.split(',')[0]}">${a[i].qOption.split(',')[0]}</br></br><input type="radio" name="option${i}" value="${a[i].qOption.split(',')[1]}">${a[i].qOption.split(',')[1]}</br></br><input type="radio" name="option${i}" value="${a[i].qOption.split(',')[2]}">${a[i].qOption.split(',')[2]}</br></br><input type="radio" name="option${i}" value="${a[i].qOption.split(',')[3]}">${a[i].qOption.split(',')[3]} <span>正确答案是: ${a[i].Answer}</span></div>
                        </li>`)
                    }
                    btn.on("click",function(){
                        tid = Number($(this).html()-1);
                        b=tid;
                        $("ol").css("top",-300*Number($(this).html()-1)+"px");
                        switch(b){
                            case 0:$("#prev").attr("disabled", true);
                            $("#prev").css("background-color", "#ccc");
                            $("#next").attr("disabled", false);
                            $("#next").css("background-color", "#B0E0E6");
                            break;
                            case 19:$("#next").attr("disabled", true);
                            $("#next").css("background-color", "#ccc");
                            $("#prev").attr("disabled", false);
                            $("#prev").css("background-color", "#B0E0E6");
                            break;
                            default:$("#next").attr("disabled", false);
                            $("#prev").attr("disabled", false);
                            $("#next").css("background-color", "#B0E0E6");
                            $("#prev").css("background-color", "#B0E0E6");
                        }
                    });
                    $("#next").on("click",function(){
                        $("#prev").attr("disabled", false);
                        if(b===18){
                            //禁用
                            $("#next").attr("disabled", true);
                            $("#next").css("background-color", "#ccc");
                        }else{
                            $("#prev").css("background-color", "#B0E0E6");
                        }
                        b++;
                        $("ol").css("top",-300*b+"px");
                    });
                    //上一题
                    $("#prev").on("click",function(){
                        if(b===1){
                            //禁用
                            $("#prev").attr("disabled", true);
                            $("#prev").css("background-color", "#ccc");
                        }else{
                            $("#next").css("background-color", "#B0E0E6");
                        }
                        $("#next").attr("disabled", false);
                        b--;
                        $("ol").css("top",-300*b+"px");
                    });
                    var arr = $("li");
                    arr.each(function(){
                        _index = $(this).index();//获取到当前题目所在的index+1即为题号
                        console.log(_index);
                        $(this).children(".form").each(function(){
                            $(this).children("input").each(function(){
                                if($(this).val().slice(0,1)==userA[_index]){
                                    $(this).attr("checked",true);
                                }
                            })
                            
                        });
                    })
                },
                error:function(err){
                    console.log(err);
                }
            });
        },
        error:function(err){
            console.log(err);
        }
    });
});