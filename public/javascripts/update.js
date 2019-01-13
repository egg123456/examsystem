$(function() {
    $('#reset').on('click', function() {
        var pwd = $('#password').val();
        var cpwd = $('#checkpassword').val();
        var uname = $('#username').val();
        if (cpwd === pwd) {
            $.ajax({
                type: "get",
                url: "/resetPwd/update",
                data: { "userName": uname, "passWord": pwd },
                dataType: "json",
                success: function(response) {
                    alert(response.msg);
                },
                err: function(err) {
                    console.log(err);
                }
            });
        } else {
            alert('两次密码不同');
        }

    })
})