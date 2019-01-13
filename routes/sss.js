var express = require('express');
var router = express.Router();

var mysql = require('mysql'),
    dbconfig = require('../db/dbconfig'),
    usersql = require('../db/usersql'),
    pool = mysql.createPool(dbconfig.mysql);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('sss', { title: 'Express' });
});

router.post('/init', function(req, res, next) {
    var str = "SELECT column_name,column_comment,data_type FROM information_schema.columns WHERE table_name='users'";
    pool.getConnection(function(err, con) {
        con.query(str, function(err, result) {
            if (err) throw err;
            if (result) {
                result = JSON.parse(JSON.stringify(result));
                console.log(result);
                res.send(result);
            }
        })
    })
});

router.post('/queryAll', function(req, res, next) {
    var data = req.body;
    console.log(data);
    pool.getConnection(function(err, con) {
        con.query('SELECT * FROM Users', [], function(err, result) {
            if (err) throw err;
            if (result) {
                result = JSON.parse(JSON.stringify(result));
                console.log(result);
                res.send(result);
            }
        })
    })
});

router.post('/update', function(req, res, next) {
    var data = [],
        o = req.body;
    for (var key in o) {
        data.push(key);
        data.push(o[key]);
    }
    console.log(data);
    console.log(data[1]);
    console.log(data[2]);
    console.log(data[3]);
    var update = 'UPDATE users SET ' + data[2] + ' = "' + data[3] + '" WHERE id = ' + data[1];
    console.log(update);
    pool.getConnection(function(err, con) {
        con.query(update, function(err, result) {
            if (err) throw err;
            if (result) {
                result = JSON.parse(JSON.stringify(result));
                console.log(result);
                res.send(result);
            }
        })
    })
});

router.post('/query', function(req, res, next) {
    var str = 'SELECT * FROM users WHERE ' + req.body.condition;
    console.log(str);
    pool.getConnection(function(err, con) {
        con.query(str, function(err, result) {
            if (err) throw err;
            if (result) {
                result = JSON.parse(JSON.stringify(result));
                console.log(result);
                res.send(result);
            }
        })
    })
})

router.post('/delete', function(req, res, next) {
    var data = req.body,
        str = 'DELETE FROM users WHERE id=' + data.id;
    console.log(str);
    pool.getConnection(function(err, con) {
        con.query(str, function(err, result) {
            if (err) throw err;
            if (result) {
                result = JSON.parse(JSON.stringify(result));
                res.send(result);
            }
        })
    })
})

module.exports = router;