var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');
/* GET users listing. */
var pid;
router.get('/', function(req, res, next) {
    res.render('exam', { "id": pid });
});
router.get('/send', function(req, res, next) {
    pid = req.query.id;
});
// 增加用户
//TODO 同时支持get,post
router.get('/addUser', function(req, res, next) {
    userDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
    userDao.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
    userDao.queryById(req, res, next);
});

router.get('/deleteUser', function(req, res, next) {
    userDao.delete(req, res, next);
});

router.post('/updateUser', function(req, res, next) {
    userDao.update(req, res, next);
});
router.get('/paper', function(req, res, next) {
    console.log(111);
    userDao.queryPaper(req, res, next);
});
router.get('/test', function(req, res, next) {
    userDao.queryTest(req, res, next);
});
router.get('/updateGrade', function(req, res, next) {
    userDao.updateGrade(req, res, next);
})
module.exports = router;