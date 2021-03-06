var createError = require('http-errors');
var express = require('express');
// var expressWs = require('express-ws');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//var logger = require('morgan');
var mainRouter = require('./modules/router');


var app = express();

process.env.NODE_DEBUG = true;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../build')));

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(session({
    secret :  'secret',             //对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false,       //是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 3,     //设置 session 的有效时间，单位毫秒
    },
}));

app.use('/classshow/api', mainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
