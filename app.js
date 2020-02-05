var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var channelsRouter = require('./routes/channels');
var cryptoRouter = require('./routes/crypto');
var logoRouter = require('./routes/logo');
var epgRouter = require('./routes/epg');
var streamRouter = require('./routes/stream');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/channels', channelsRouter);
app.use('/crypto', cryptoRouter);
app.use('/logo', logoRouter);
app.use('/epg', epgRouter);
app.use('/stream', streamRouter);


module.exports = app;
