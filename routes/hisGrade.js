var express = require('express');
var router = express.Router();
var pid = 0;//跨页面传值

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

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('hisGrade',{"id":pid});
});
router.get('/send', function(req, res, next) {
    pid = req.query.id;
});
router.get('/getHistory', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        var param = req.query || req.params;
        connection.query(userSQL.queryGrade,[param.id],function(err, result) {
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
router.get('/getTest', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        var tid = req.query.tid;
		tid = tid.split(',');
        connection.query(userSQL.queryTest,[tid[0],tid[1],tid[2],tid[3],tid[4],tid[5],tid[6],tid[7],tid[8],tid[9],tid[10],tid[11],tid[12],tid[13],tid[14],tid[15],tid[16],tid[17],tid[18],tid[19]],function(err, result) {
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