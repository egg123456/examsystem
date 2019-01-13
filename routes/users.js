var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.send({
            code: '-200',
            msg: '操作失败',
            ret: res
                //res的render,send
        });
    } else {
        res.send(ret);
    }
};
router.get("/", function(req, res, next) {
        res.render("adduser");
    })
    // 添加用户
router.post('/addUser', function(req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数  
        var param = req.body || req.params;
        console.log(param);
        // 建立连接 增加一个用户信息 
        connection.query(userSQL.insert, [param.userName], function(err, result) {
            if (err) throw err;
            if (result) {
                result = {
                    code: 200,
                    msg: '增加成功'
                };
            }
            responseJSON(res, result);

            // 释放连接  
            connection.release();

        });
    });
});
// 显示数据
router.post("/show", function(req, res, next) {
        pool.getConnection(function(err, connection) {

            // 建立连接 增加一个用户信息 
            connection.query(userSQL.queryAll, function(err, result) {
                if (err) throw err;
                if (result) {
                    result = JSON.parse(JSON.stringify(result));
                    // 以json形式，把操作结果返回给前台页面     
                    responseJSON(res, result);

                }
                console.log(result);
                // 释放连接  
                connection.release();
            });

        });
    })
    // 删除指定id的数据
router.post("/delId", function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数  
            var param = req.body || req.params;
            console.log(param);
            connection.query(userSQL.delById, [param.uid], function(err, result) {
                if (err) throw err;
                if (result) {
                    result = {
                        code: 200,
                        msg: '删除成功'
                    };
                }
                responseJSON(res, result);

                // 释放连接  
                connection.release();
            });

        });
    })
    // 修改指定id的数据
router.post("/update", function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数  
            var param = req.body || req.params;
            console.log(param);
            connection.query(userSQL.update, [param.userName, param.uid], function(err, result) {
                if (err) throw err;
                if (result) {
                    result = {
                        code: 200,
                        msg: '更新成功'
                    };
                }
                responseJSON(res, result);

                // 释放连接  
                connection.release();
            });

        });
    })
    // 生成指定数据
router.post("/paperMake", function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数  
            var param = req.body || req.params;
            param.uid = param.uid.split(",");
            console.log(param);
            connection.query(userSQL.random, [param.uid[0], param.uid[1], param.uid[2], param.uid[3], param.uid[4]], function(err, result) {
                if (err) throw err;
                if (result) {
                    result = {
                        code: 200,
                        msg: '操作成功',
                        res: result
                    };
                }
                responseJSON(res, result);

                // 释放连接  
                connection.release();
            });

        });
    })
router.post("/paperQuery", function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数  
            connection.query(userSQL.paperQuery, function(err, result) {
                if (err) throw err;
                if (result) {
                     result = JSON.parse(JSON.stringify(result));
                    // 以json形式，把操作结果返回给前台页面     
                    responseJSON(res, result);
                }

                // 释放连接  
                connection.release();
            });

        });
    })
    // 测试表单数据


router.get("/testInput", function(req, res, next) {
    res.render("testInput");
})
module.exports = router;