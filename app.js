const express = require('express');
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express();

const i18n = require('./i18n/western-europe.json')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', function(req, res) {
  res.render('index', {title: 'HILARIO B. VILLAR'})
})


// catch 404 and forwared to error handler
app.use(function(req, res, next) {
  var err = new Error(i18n['English']['404'])
  err.status = 404
  next(err)
})

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next){
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})
app.listen(3000, function() {
  console.log('Listening on port 3000');
});

module.exports = app
