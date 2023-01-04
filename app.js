var express = require('express');

// get config vars
var createError = require('http-errors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cookieSession = require('cookie-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var db = require('./database/connection')

const helmet = require("helmet");

const app = express();

app.use(helmet());
db.DBconnection()

const dotenv = require('dotenv');

dotenv.config();

// access config var
process.env.TOKEN_SECRET;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

var cors = require('cors')

app.use(cors({
  origin : "*",
  optionsSuccessStatus: 200 

}))

// const allowCrossDomain = function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://vps-ed7a9675.vps.ovh.net:8080');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Acess-Control-Allow-Origin', "*")
//   res.setHeader('application/json',' text/plain, */*')
//   res.setHeader('Acess-Control-Allow-Headers', 'Accept, Content-Type')
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');


//   next();
// };



// ));


// app.use(cors(corsOptions))

// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

// catch 404 and forward to error handler

// error handler
app.use(function  (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
})

// app.get('/users/', cors(corsOptions), function (req, res, next) {

//   next()
//   res.json({msg: 'This is CORS-enabled for only example.com.'})
// })



var expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

app.use(cookieSession({
  name: 'session',
  keys: ["dsdd"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

module.exports = app;
