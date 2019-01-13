var express = require('express');
var router = express.Router();
 
var userDao = require('../dao/userDao');
 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('test');
});
 
// 增加用户
//TODO 同时支持get,post
router.get('/allPaper', function(req, res, next) {
	userDao.allPaper(req, res, next);
});
router.get('/send', function(req, res, next) {
	userDao.send(req, res, next);
});

module.exports = router;
