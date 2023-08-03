var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var axios = require("axios").default;

var app = express();
require("dotenv").config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

axios.interceptors.request.use(
  (request) => {
    request.headers.ContentType = "application/json";
    request.headers.Accept = "application/json";
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    return error.response.data;
  }
)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(req.get("origin"));
});

const PORT = process.env.ACCESS_PORT || 9000;
app.listen(PORT, function(){
  console.log(`Running on ${PORT}`);
});
