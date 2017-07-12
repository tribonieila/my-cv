var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var nodemailer = require('nodemailer')
var app = express();

var i18n = require('./i18n/western-europe.json')

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


// view engine setup
var hbs = exphbs.create({
  defaultLayout: 'layout',
  partialsDir: 'views/partials'
})

app.engine('handlebars', hbs.engine )
app.set('view engine', 'handlebars')
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

app.get('/coverletter', function(req, res) {
  res.render('coverletter', { title: 'HILARIO B. VILLAR | Cover Letter'})
})

app.get('/expertise', function(req, res) {
  res.render('expertise', { title: 'HILARIO B. VILLAR | Expertise'})
})

app.get('/projects', function(req, res) {
  res.render('projects', { title: 'HILARIO B. VILLAR | Projects'})
})

app.get('/contact', function(req, res) {
  res.render('contact', { title: 'HILARIO B. VILLAR | Contact'})
})

app.get('/thankyou', function(req, res) {
  res.render('thankyou', { title: 'HILARIO B. VILLAR | Contact'})
})

app.post('/contact', function(req, res) {

  res.render('thankyou', { title: 'HILARIO B. VILLAR | Contact'})
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

app.listen(server_port, server_ip_address, function() {
  console.log('Listening on ' + server_ip_address + ', port ' + server_port);
});

module.exports = app
