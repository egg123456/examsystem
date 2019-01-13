var mysql = require('mysql');
var $conf = require('../conf/dbConfig');
var $sql = require('./userSql');
 
// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);
var sendid;
 
// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};
 
module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;

			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.insert, [param.UserName, param.UserPass], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};    
				}
 
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
 
				// 释放连接 
				connection.release();
			});
		});
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			var id = req.query.id;
			connection.query($sql.delete, id, function(err, result) {
				if(result.affectedRows > 0) {
					result = {
						code: 200,
						msg:'删除成功'
					};
				} else {
					result = void 0;
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	update: function (req, res, next) {
		// update by id
		// 为了简单，要求同时传name和age两个参数
		var param = req.body;
		// if(param.upid == null || param.UserName == null || param.UserPass == null) {
		// 	jsonWrite(res, undefined);
		// 	return;
		// }

		pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.UserName, param.UserPass, param.id], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'修改成功'
					};    
				}
				console.log(result);
				jsonWrite(res, result);
				connection.release();
			});
		});
 
	},
	queryById: function (req, res, next) {
		var id = req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
		console.log(id);
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, id, function(err, result) {
				//将RowDataPacket对象转化成json数组
				result = JSON.parse(JSON.stringify(result));
				console.log(result);
				jsonWrite(res, result);
				connection.release();
 
			});
		});
	},
	queryAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
                result = JSON.parse(JSON.stringify(result));
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	queryPaper: function(req, res, next){
		var tid = req.query.tid;
		tid = tid.split(',');
		console.log(tid[19]);
		pool.getConnection(function(err,connection){
			connection.query($sql.queryPaper,[tid[0],tid[1],tid[2],tid[3],tid[4],tid[5],tid[6],tid[7],tid[8],tid[9],tid[10],tid[11],tid[12],tid[13],tid[14],tid[15],tid[16],tid[17],tid[18],tid[19]], function(err, result) {
                result = JSON.parse(JSON.stringify(result));
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	queryTest: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryTest, function(err, result) {
                result = JSON.parse(JSON.stringify(result));
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	updateGrade: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;
			console.log(param);
			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.updateGrade, [param.userName, param.userClass, param.tId, param.Grade, param.Time, param.UserAnswer], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};    
				}
 
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
 
				// 释放连接 
				connection.release();
			});
		});
	},
	allPaper:function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.allPaper, function(err, result) {
                result = JSON.parse(JSON.stringify(result));
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	send:function(req,res,next){
		sendid = req.query.id;
		console.log(sendid);
	},
	pid:sendid
};