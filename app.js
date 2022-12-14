var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ocrsRouter = require('./routes/ocrs');
var statRouter = require('./routes/statistic');

/* connect mysql */
var mysqlDB = require('./config/mysql/db');
mysqlDB.connect();

var app = express();

// express-session setup
const session = require('express-session');	
// session-file-store
const fileStore = require('session-file-store')(session);

app.use(session({
  httpOnly: true,	
  secure: true,	
  secret: 'secret key',	
  resave: false,
  saveUninitialized: true,
  cookie: {	
    // maxAge: 1000*60*1,
    httpOnly: true,
    secure: true
  },
  store: new fileStore()
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ocrs', ocrsRouter);
app.use('/statistic',statRouter);
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
