var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('addquestion');
});
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.send({
            code: '-200',
            msg: '操作失败'
                //res的render,send
        });
    } else {
        res.send(ret);
    }
};
router.post('/addUser', function(req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数  
        var param = req.body || req.params;
        // console.log(param);
        // 建立连接 增加一个用户信息 
        connection.query('INSERT INTO testbase(Question,Class,qOption,qLevel,Answer,Time) VALUES(?,?,?,?,?,?)', [param.Question, param.Class, param.qOption, param.qLevel, param.Answer, param.Time], function(err, result) {
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
        connection.query('SELECT * FROM testbase', function(err, result) {
            if (err) throw err;
            if (result) {
                result = JSON.parse(JSON.stringify(result));
                // 以json形式，把操作结果返回给前台页面     
                responseJSON(res, result);

            }
            // console.log(result);
            // 释放连接  
            connection.release();
        });

    });
})


// 修改和更新数据
router.post("/update", function(req, res, next) {
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数  
        var param = req.body || req.params;
        // console.log(param);
        connection.query('update testbase set Question=?, Class=?, qOption=?, qLevel=?, Answer=? WHERE id =?', [param.Question, param.Class, param.qOption, param.qLevel, param.Answer, param.id], function(err, result) {
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

// 生成,兼预览试卷
router.post("/paperMake", function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数  
            var param = req.body || req.params;
            var selectId;
            if (Array.isArray(param.id)) {
                selectId = param.id.split(",");
            } else {
                // 试卷展示完成之后,可选择查看试卷展示区域的每一张试卷信息
                selectId = param.id;
            }
            connection.query(`select * from testbase where id in (${selectId})`, function(err, result) {
                // connection.query(userSQL.selectPaper, [selectId[0], selectId[1], selectId[2], selectId[3], selectId[4], selectId[5], selectId[6], selectId[7], selectId[8], selectId[9], selectId[10], selectId[11], selectId[12], selectId[13], selectId[14], selectId[15], selectId[16], selectId[17], selectId[18], selectId[19]], function(err, result) {
                if (err) throw err;
                if (result) {
                    result = JSON.parse(JSON.stringify(result));
                }

                responseJSON(res, result);

                // 释放连接  
                connection.release();
            });

        });
    })
    //试卷插入
router.post("/paperInsert", function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数  
            var param = req.body || req.params;
            console.log(param);
            connection.query('insert into paper(tId,Time) values(?,?)', [param.tId, param.Time], function(err, result) {
                if (err) throw err;
                if (result) {
                    result = {
                        code: '-200',
                        msg: '插入试卷成功'
                    }
                }

                responseJSON(res, result);

                // 释放连接  
                connection.release();
            });

        });
    })
    // 试卷展示
router.post("/paperQuery", function(req, res, next) {
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数  
        connection.query('select * from paper', function(err, result) {
            if (err) throw err;
            if (result) {
                result = JSON.parse(JSON.stringify(result));
            }

            responseJSON(res, result);

            // 释放连接  
            connection.release();
        });

    });
})



module.exports = router;