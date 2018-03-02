var express = require('express');
var path = require('path');
var cors = require('cors');
const passport = require('passport');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');


var cookieParser = require('cookie-parser');
var bodyParser = requmnire('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//const login = require('./#/login');
//Connect to MongoDb
mongoose.connect('mongodb://localhost:27017/meanauth');

//on connection
mongoose.connection.on('connected',()=>{
	console.log('connected to database MongoDb @ 27017');
});

mongoose.connection.on('error',(err)=>{
	if (err) {
		console.log('error in the database connection'+err);
	}
});

const port = 3000;

//adding middleware - cors
app.use(cors());

//body - parser
app.use(bodyparser.json());

app.use('/users', users);
//static file

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//require('../config/passport')(passport);

app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes');
//app.get('/', routes.index);
app.get('*', function(req, res){
    res.sendfile(__dirname + '');
});
//routes
//app.use('/', login);

//testing server
app.get('/',(req, res)=>{
	res.send('./public/login');
});

app.listen(port,()=>{
	console.log('Server Started at port:'+port);

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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
