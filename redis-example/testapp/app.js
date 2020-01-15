var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var redis = require('redis');
var client = redis.createClient();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req,res,next) {
	req.cache = client;
	next();
});

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

app.get('/test1', function(req,res,next) {
	var key = "aaa";
	var value = "bbb";
	
	req.cache.set(key, value, function (err, data) {
		if (err) throw err;
		
		req.cache.expire(key, 10);
		res.send(value);
	});
});

app.get('/test2', function(req,res,next) {
	req.cache.get("aaa", function(err, data) {
		if (err) throw err;
		res.send(data);
	});
})

module.exports = app;
