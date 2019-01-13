var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('userPage');
});

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

//更新密码
router.get('/update', function(req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数  
        var param = req.query || req.params;
        // 建立连接 增加一个用户信息 
        connection.query(userSQL.update, [param.passWord, param.userName], function(err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '更改成功'
                };
            }

            // 以json形式，把操作结果返回给前台页面     
            responseJSON(res, result);

            // 释放连接  
            connection.release();

        });
    });
});
//查询成绩
router.get('/queryGrade', function(req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function(err, connection) {
        var param = req.query || req.params;
        // console.log(param.userName);
        connection.query("select * from grade where userName = ?", [param.userName], function(err, result) {
            if (result) {
                result = JSON.parse(JSON.stringify(result));
            }
            console.log(result);
            // 以json形式，把操作结果返回给前台页面     
            responseJSON(res, result);

            // 释放连接  
            connection.release();

        });
    });
});
//成绩降序
router.get('/upGrade', function(req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.getGradeup, function(err, result) {
            if (result) {
                result = JSON.parse(JSON.stringify(result));
            }

            // 以json形式，把操作结果返回给前台页面     
            responseJSON(res, result);

            // 释放连接  
            connection.release();

        });
    });
});
//成绩升序
router.get('/downGrade', function(req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.getGradedown, function(err, result) {
            if (result) {
                result = JSON.parse(JSON.stringify(result));
            }

            // 以json形式，把操作结果返回给前台页面     
            responseJSON(res, result);

            // 释放连接  
            connection.release();

        });
    });
});
//时间降序
router.get('/upTime', function(req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.getTimeup, function(err, result) {
            if (result) {
                result = JSON.parse(JSON.stringify(result));
            }

            // 以json形式，把操作结果返回给前台页面     
            responseJSON(res, result);

            // 释放连接  
            connection.release();

        });
    });
});
//时间升序
router.get('/downTime', function(req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.getTimedown, function(err, result) {
            if (result) {
                result = JSON.parse(JSON.stringify(result));
            }

            // 以json形式，把操作结果返回给前台页面     
            responseJSON(res, result);

            // 释放连接  
            connection.release();

        });
    });
});

module.exports = router;