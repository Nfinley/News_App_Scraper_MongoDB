'use strict';

//dependencies
const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    cheerio = require("cheerio"),
    Promise = require("bluebird"),
    mongoose = require("mongoose"),
    indexRouter = require('./routes/indexRouter'),
    newsRouter = require('./routes/newsRouter'),
    session = require('express-session'),
    app = express();


// const request = require("request");

//===== SETUP Mongoose ======

// Mongoose Promise, overiding the native promise library
mongoose.Promise = Promise;

// Creating the mongoose connection
mongoose.connect("mongodb://localhost/scraperlocal");
// mongoose.connect("mongodb://heroku_fb0c0r33:ev7f7ms18p5bt4nvrilok3b9ap@ds111788.mlab.com:11788/heroku_fb0c0r33");
const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

//session variable set up to house the articles as a session variable
app.use(session({
    secret: '1234567',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//===== view engine setup ======

//old set up
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');


// ======view engine setup=======
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/news', newsRouter);
// app.use('/getNews', newsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Listen on port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log("App running on port 3000!");
});


module.exports = app;
