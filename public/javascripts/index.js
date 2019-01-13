$(function() {
    var l_name = $('#username'),
        l_pwd = $('#Password'),
        s_name = $('#username'),
        s_pwd = $('#Password'),

        register_pwd = $('#check_pwd'), //确认密码
        register_name = $('#real_name'), //真实姓名
        register_class = $('#UserClass'), //班级

        signUrl = '/log_sign', //登录地址
        registerUrl = '/register', //注册地址
        promat_info = $('#text-pro'),
        register_flag = 0, //检验用户名，密码格式标志位
        ck_code = '', //保存后台送过来的验证码
        var_code = $('#text_pwd'); //用户输入的验证码
    var ck_reg = /[\w_]*/;


    /************************************************************************/
    /**
     * 登录权限判断
     */
    function power() {
        $("input[type='radio'").attr('checked');
    }



    /************************************************************************/
    /**
     * 验证码获取
     */

    $('#text_pwd_txt').on('click', function() {
        $.ajax({
            url: '/code',
            data: 'data',
            type: 'post',
            datatype: 'json',
            success: function(d) {
                ck_code = d.code;
                $('#text_pwd_txt').html(d.code);
            },
            err: function(err) {
                console.log('获取验证码失败!');
            }
        });
    });
    /************************************************************************/
    /**
     * 登录状态设定，后台statu
     */
    // function ck_status(data) {
    //     $.ajax({
    //         url: '/h_status/h_status',
    //         data: data,
    //         type: 'post',
    //         datatype: 'json',
    //         success: function(d) {
    //             console.log(d);
    //         },
    //         err: function(err) {
    //             console.log('出错了');
    //         },
    //     });
    // }
    /************************************************************************/
    /**
     * 正则验证密码，用户名
     */
    function check_reg(str, n) {
        var str_temp = (ck_reg.exec(str)[0]);
        return str_temp === str;
    }
    /************************************************************************/

    /**
     * 登录
     */
    $('#btn_sign').on('click', function() {
        var data = { 'username': l_name.val(), 'password': l_pwd.val() }
        if (ck_code == var_code.val()) {
            $.ajax({
                url: signUrl,
                data: data,
                type: 'post',
                datatype: 'json',
                success: (d) => {
                    if (d.success === 1) {
                        sessionStorage.setItem("username", l_name.val());
                        if ($("input:radio[name='radio']:checked").val() === "管理员") {
                            if (d.result[0]["Lever"] == 2) {
                                window.open('/addquestion', '_self');
                            } else if (d.result[0]["Lever"] == 1) {
                                window.open('/sss', '_self');
                            } else {
                                alert("该账户无法以管理员权限登录");
                            }
                        } else {
                            window.open('/userPage', '_self');
                        }
                    } else {
                        console.log('用户' + l_name.val() + '登录失败');
                        console.log("登录失败的Result:", d.result);
                        promat_info.html(d.result);
                    }

                },
                error: (err) => {
                    // console.log('出错了');
                    console.log(err);
                }
            });
        } else {
            // console.log();
            promat_info.html('验证码错误!');
        }

    });
    /************************************************************************/
    /**
     * 检测用户名规范,检测注册密码规范
     */
    function stand() {
        if ((s_name.val().length <= 12) && (s_pwd.val().length <= 6 && s_pwd.val().length > 1)) {
            if (check_reg(s_name.val()) && check_reg(s_pwd.val())) {
                register_flag = 1;
                // console.log('用户名,密码格式正确');
            } else {
                // console.log('用户名，密码格式错误');
                promat_info.html('用户名，密码格式错误');
            }
        } else {
            // console.log('用户名或者密码长度错误');
            promat_info.html('用户名或者密码长度错误，用户名长度应小于等于12位，密码应小于等于6位且不为空');
        }
    }
    /************************************************************************/
    /**
     * 注册
     */
    $('#btn-register2').on('click', function() {
        var data = { 'username': s_name.val(), 'password': s_pwd.val(), 'name': register_name.val(), 'class': register_class.val() };
        console.log(data);
        stand();
        if (register_flag) {
            register_flag = 0;
            $.ajax({
                url: registerUrl,
                data: data,
                type: 'post',
                datatype: 'json',
                success: (d) => {
                    if (d.success) {
                        console.log('注册成功:');
                        console.log(d);
                        promat_info.html('恭喜，用户注册成功！请登录');
                    } else {
                        console.log('注册失败：');
                        console.log(d);
                        promat_info.html(d.result);
                    }
                },
                error: (err) => {
                    console.log('出错了');
                }
            });
        }

    });
    /************************************************************************/
})

$(function() {
    $('#btn-register1').click(function() {
        $('.btn_none').css('display', 'none');
        $('.btn_visit,#btn-toLogin').css('display', 'block');
    });
    $('#btn-toLogin').click(function() {
        $('.btn_none').css('display', 'block');
        $('.btn_visit,#btn-toLogin').css('display', 'none');
    });
    $("#bb").on("click", function() {
        console.log($("input:radio[name='radio']:checked").val());
    });
})