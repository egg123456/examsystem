var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
var pool = mysql.createPool(dbConfig.mysql);


router.get('/', function(req, res, next) {
    res.render('index');
});

//用户登录验证
router.post('/log_sign', function(req, res, next) {
    // // 导入MySQL模块

    pool.getConnection(function(err, connection) {
        console.log(req.body);
        // getUserById: 'SELECT * FROM users WHERE userName = ? ',
        connection.query('SELECT * FROM users WHERE userName = ? ', [req.body.username], function(err, result) {
            if (result.length > 0) {
                if (result[0].passWord == req.body.password) {
                    console.log(result);
                    console.log('恭喜,用户登录成功！');
                    res.send({ result: result, success: 1 });
                } else {
                    res.send({ result: '密码错误！', success: 0 });
                }

            } else {
                // console.log(result);
                console.log("用户不存在！")
                console.log("请联系朱鑫亮查找原因！")
                res.send({ result: "用户不存在！", success: 0 });
            }
            connection.release();
        });
    });

});

//注册用户
router.post('/register', function(req, res, next) {
    // 导入MySQL模块
    var flag = 0; //查询用户标志位,默认0不存在;
    console.log('前台数据', req.body);
    pool.getConnection(function(err, connection) {
        //判断是否是已存在用户
        if ((function() {
                connection.query(userSQL.getUserById, [req.body.username], function(err, result) {
                    flag = result.length;
                    if (flag === 0) {
                        var time = new Date();
                        time = '' + time.getFullYear() + format((time.getMonth() + 1), 2) + format(time.getDate(), 2);
                        // [req.body.username, req.body.password, 3, '物联网工程', 'name', time, time, 1
                        connection.query('INSERT INTO users(userName,passWord,Lever,userClass,Name,regTime,updataTime,Status) VALUES(?,?,?,?,?,?,?,?)', [req.body.username, req.body.password, 3, req.body.class, req.body.name, time, time, 1], function(err, result) {
                            if (result) {
                                console.log('恭喜，用户注册成功！');
                                res.send({ result: result, success: 1 });

                            } else {
                                console.log("用户注册失败！")
                                console.log("失败原因：数据库")
                                res.send({ result: "失败原因：数据库", success: 0 });
                            }
                            connection.release();
                        });
                    } else {
                        console.log('注册失败，用户已存在！');
                        res.send({ result: '注册失败，用户已存在！', success: 0 })
                        connection.release();
                    }
                })
            })())
            console.log('flag=', flag);
    });


    //截取digit长度的字符串，data不够前面补0;
    function format(data, digit) {
        for (var i = 0; i < digit; i++) {
            data = '0' + data;
        }
        return data.substr(-digit, digit);
    }

});

//验证码生成
router.post('/code', function(req, res, next) {
    var code = '';
    var codeLength = 6;
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数   
    for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 36);
        code += random[index];
    }
    res.send({ 'code': code });
});
module.exports = router;