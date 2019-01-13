var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// 首页，登录注册
var index = require('./routes/index');

// 试题修改，试卷生成等功能模块
var addquestion = require('./routes/addquestion');

// 管理员用户信息管理功能模块
var sss = require('./routes/sss');

// 在线考试模块
var test = require('./routes/test');
var exam = require('./routes/exam');

// 用户中心
var resetPwd = require('./routes/resetPwd');
var userPage = require('./routes/userPage');
var userGrade = require('./routes/userGrade');
var hisGrade = require('./routes/hisGrade');



var app = express();

// view engine setup视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); //设置视图引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/addquestion', addquestion);
app.use('/sss', sss);
app.use('/exam', exam);
app.use('/test', test);
app.use('/resetPwd', resetPwd);
app.use('/userPage', userPage);
app.use('/userGrade', userGrade);
app.use('/hisGrade', hisGrade);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;